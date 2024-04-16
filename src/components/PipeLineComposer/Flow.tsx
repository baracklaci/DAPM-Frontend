import React, { useCallback, useEffect, useState } from "react"
import ReactFlow, {
  Node,
  //addEdge,
  Background,
  Edge,
  BackgroundVariant,
  useReactFlow,
  useOnSelectionChange
} from "reactflow";

import { onNodesChange, onEdgesChange, onConnect, addNode, removeNode } from "../../redux/slices/nodeSlice";

import CustomNode from "./Nodes/CustomNode";

import "reactflow/dist/style.css";
import styled from "styled-components";
import DataSourceNode from "./Nodes/DataSourceNode";
import DataSinkNode from "./Nodes/DataSinkNode";
import ConfigurationSidebar from "./ConfigurationSidebar";
import { useDispatch, useSelector } from "react-redux";
import { NodeData, RootState } from "../../redux/states";

const nodeTypes = {
  custom: CustomNode,
  dataSource: DataSourceNode,
  dataSink: DataSinkNode,
};

const ReactFlowStyled = styled(ReactFlow)`
  background-color: #333;
`;

let id = 0;
const getId = () => `dndnode_${id++}`;

let handleId = 0;
const getHandleId = () => `handleid_${handleId++}`;


const BasicFlow = () => {
  const dispatch = useDispatch()

  const nodes = useSelector((state: RootState) => state.nodeState.nodes);
  const edges = useSelector((state: RootState) => state.nodeState.edges);
  const reactFlow = useReactFlow();

  const [selectedNode, setSelectedNode] = useState<Node | undefined>();

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      setSelectedNode(nodes.at(-1));
      console.log(selectedNode);
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
      if (selectedNode && event.key === 'Delete') {
        dispatch(removeNode(selectedNode))
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nodes, selectedNode]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const { type, data, algorithmType } = JSON.parse(event.dataTransfer.getData('application/reactflow'));

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlow.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      type NodeSetup = {
        sourceHandles: number;
        targetHandles: number;
      }

      const handleSetup = new Map<string, NodeSetup>();
      handleSetup.set('dataSource', { sourceHandles: 0, targetHandles: 1 });
      handleSetup.set('dataSink', { sourceHandles: 1, targetHandles: 0 });
      handleSetup.set('conformance', { sourceHandles: 2, targetHandles: 1 });
      handleSetup.set('miner', { sourceHandles: 1, targetHandles: 1 });
      handleSetup.set('custom', { sourceHandles: 1, targetHandles: 1 });

      const newNode: Node<NodeData> = {
        id: getId(),
        type,
        position,
        data: {
          label: `${data}`,
          sourceHandles: Array.from({ length: handleSetup.get(algorithmType)!.sourceHandles }, () => ({ id: getHandleId(), type: 'source' })),
          targetHandles: Array.from({ length: handleSetup.get(algorithmType)!.targetHandles }, () => ({ id: getHandleId(), type: 'target' }))
        },
      };

      dispatch(addNode(newNode));
    },
    [reactFlow],
  );

  // to hide the attribution
  const proOptions = {
    account: 'paid-enterprise',
    hideAttribution: true,
  };

  return (
    <ReactFlowStyled
      proOptions={proOptions}
      style={{ flexGrow: 1 }}
      nodes={nodes}
      edges={edges}
      onNodesChange={x => dispatch(onNodesChange(x))}
      onEdgesChange={x => dispatch(onEdgesChange(x))}
      onConnect={x => { dispatch(onConnect(x)) }}
      nodeTypes={nodeTypes}
      onDrop={onDrop}
      onDragOver={onDragOver}
      fitView
    >
      <Background variant={BackgroundVariant.Dots} color="#d9d9d9" />
      {selectedNode && <ConfigurationSidebar nodeprop={selectedNode} />}
    </ReactFlowStyled>
  );
};

export default BasicFlow;
