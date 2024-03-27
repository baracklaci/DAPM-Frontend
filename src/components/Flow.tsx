import React, { useCallback, useEffect, useRef, useState } from "react"
import ReactFlow, {
  Node,
  //addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Controls,
  useReactFlow,
  useOnSelectionChange
} from "reactflow";

import { onNodesChange, onEdgesChange, onConnect, setNodes, setEdges, addNode, addEdge, removeNode } from "../redux/slices/nodeSlice";

import CustomNode from "./Nodes/CustomNode";

import "reactflow/dist/style.css";
import styled from "styled-components";
import DataSourceNode from "./Nodes/DataSourceNode";
import DataSinkNode from "./Nodes/DataSinkNode";
import Sidebar from "./NodesSidebar";
import ConfigurationSidebar from "./ConfigurationSidebar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/states";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    data: { label: "Custom operator" },
    position: { x: 250, y: 5 }
  },
];

const initialEdges: Edge[] = [
];

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


const BasicFlow = () => {
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
        removeNode(selectedNode)
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

      const {type, data} = JSON.parse(event.dataTransfer.getData('application/reactflow'));

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
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${data}` },
      };

      addNode(newNode);
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
      style={{ flexGrow: 1}}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      onDrop={onDrop}
      onDragOver={onDragOver}
      fitView
    >
      <Background variant={BackgroundVariant.Dots} color="#d9d9d9"/>
      {selectedNode && <ConfigurationSidebar node={selectedNode} />}
    </ReactFlowStyled>
  );
};

export default BasicFlow;
