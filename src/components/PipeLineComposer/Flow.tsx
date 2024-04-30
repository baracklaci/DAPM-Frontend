import React, { useCallback, useEffect, useState, MouseEvent } from "react"
import ReactFlow, {
  Node,
  Background,
  BackgroundVariant,
  useReactFlow,
  useOnSelectionChange,
  Edge
} from "reactflow";

import { onNodesChange, onEdgesChange, onConnect, addNode, removeNode, setNodes, removeEdge, setEdges, addEdge } from "../../redux/slices/nodeSlice";

import CustomNode from "./Nodes/CustomNode";

import "reactflow/dist/style.css";
import styled from "styled-components";
import DataSourceNode from "./Nodes/DataSourceNode";
import DataSinkNode from "./Nodes/DataSinkNode";
import ConfigurationSidebar from "./ConfigurationSidebar";
import { useDispatch, useSelector } from "react-redux";
import { NodeData, RootState } from "../../redux/states";
import OrganizationNode from "./Nodes/OrganizationNode";

import 'reactflow/dist/style.css';
import '@reactflow/node-resizer/dist/style.css';

import { getNodePositionInsideParent, sortNodes } from "./utils";

const nodeTypes = {
  custom: CustomNode,
  dataSource: DataSourceNode,
  dataSink: DataSinkNode,
  organization: OrganizationNode
};

const ReactFlowStyled = styled(ReactFlow)`
  background-color: #333;
`;

const getId = () => `node-${crypto.randomUUID()}`;

const getHandleId = () => `handle-${crypto.randomUUID()}`;

const BasicFlow = () => {
  const dispatch = useDispatch()

  const { getIntersectingNodes } = useReactFlow();

  const nodes = useSelector((state: RootState) => state.nodeState.nodes);
  const edges = useSelector((state: RootState) => state.nodeState.edges);
  const reactFlow = useReactFlow();

  const [selectedNode, setSelectedNode] = useState<Node | undefined>();
  const [selectedDeletables, setSelectedDeletables] = useState<Array<Node<NodeData> | Edge | undefined>>([]);

  const connectionLineStyle = { stroke: 'white', strokeOpacity: 1, strokeWidth: "1px" }

  useOnSelectionChange({
    onChange: ({ nodes: selectedNodes, edges: selectedEdges }) => {
      setSelectedNode(selectedNodes.at(0));
      setSelectedDeletables([...selectedNodes, ...selectedEdges]);

      var newEdges: Edge[] = edges.map(edge => {
        if (!selectedEdges.find(x => x.id === edge.id)) {
          return {...edge, style: {...edge.style, stroke: 'white', strokeOpacity: 1, strokeWidth: "1px"}}
        }
        return {...edge, style: {...edge.style, stroke: '#007bff', strokeOpacity: 1, strokeWidth: "2px"}}
      });

      dispatch(setEdges(newEdges));
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === 'Delete') {
        selectedDeletables.filter((x): x is Node<NodeData> => true).forEach(node => dispatch(removeNode(node)));
        selectedDeletables.filter((x): x is Edge => true).forEach(edge => dispatch(removeEdge(edge)));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedDeletables]);

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

      const intersections = getIntersectingNodes({
        x: position.x,
        y: position.y,
        width: 40,
        height: 40,
      }).filter((n) => n.type === 'organization');
      const orgNode = intersections[0];

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
      handleSetup.set('organization', { sourceHandles: 0, targetHandles: 0 });

      const nodeStyle = type === 'organization' ? { width: 400, height: 200, zIndex: -1000 } : undefined;

      const newNode: Node<NodeData> = {
        id: getId(),
        type,
        position,
        style: nodeStyle,
        data: {
          label: `${data}`,
          sourceHandles: Array.from({ length: handleSetup.get(algorithmType)!.sourceHandles }, () => ({ id: getHandleId(), type: 'source' })),
          targetHandles: Array.from({ length: handleSetup.get(algorithmType)!.targetHandles }, () => ({ id: getHandleId(), type: 'target' }))
        },
      };

      if (orgNode) {
        // if we drop a node on a group node, we want to position the node inside the group
        newNode.position = getNodePositionInsideParent(
          {
            position,
            width: 40,
            height: 40,
          },
          orgNode
        ) ?? { x: 0, y: 0 };
        newNode.parentNode = orgNode?.id;
        newNode.extent = "parent";
      }

      dispatch(addNode(newNode));
    },
    [reactFlow],
  );

  const onNodeDragStop = useCallback(
    (_: MouseEvent, node: Node) => {
      if (node.type === 'organization' || node.parentNode) {
        return;
      }


      const intersections = getIntersectingNodes(node).filter(
        (n) => n.type === 'organization'
      );
      const organizationNode = intersections[0];

      // when there is an intersection on drag stop, we want to attach the node to its new parent
      if (intersections.length && node.parentNode !== organizationNode?.id) {

        const nextNodes: Node[] = nodes.map((n) => {
          if (n.id === organizationNode.id) {
            return {
              ...n,
              className: '',
            };
          } else if (n.id === node.id) {
            const position = getNodePositionInsideParent(n, organizationNode) ?? {
              x: 0,
              y: 0,
            };

            return {
              ...n,
              position,
              parentNode: organizationNode.id,
              extent: 'parent',
            } as Node;
          }

          return n;
        })
          .sort(sortNodes);

        dispatch(setNodes(nextNodes));
      }
    },
    [nodes]
  );

  const onNodeDrag = useCallback(
    (_: MouseEvent, node: Node) => {
      if (!node){
        return;
      }
      if (node.type !== 'node' && !node.parentNode) {
        return;
      }

      const intersections = getIntersectingNodes(node).filter(
        (n) => n.type === 'group'
      );
      const groupClassName =
        intersections.length && node.parentNode !== intersections[0]?.id
          ? 'active'
          : '';

      const newNodes: Node[] = nodes.map((n) => {
        if (n.type === 'organization') {
          return {
            ...n,
            className: groupClassName,
          };
        } else if (n.id === node.id) {
          return {
            ...n,
            position: node.position,
          };
        }

        return { ...n };
      });

      dispatch(setNodes(newNodes));
    },
  [nodes]
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
    onNodeDrag={onNodeDrag}
    onNodeDragStop={onNodeDragStop}
    onDrop={onDrop}
    onDragOver={onDragOver}
    fitView
    selectNodesOnDrag={false}
    connectionLineStyle={connectionLineStyle}
  >
    <Background variant={BackgroundVariant.Dots} color="#d9d9d9" />
    {selectedNode && <ConfigurationSidebar nodeprop={selectedNode} />}
  </ReactFlowStyled>
);
};

export default BasicFlow;
