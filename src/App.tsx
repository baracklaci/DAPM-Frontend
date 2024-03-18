import React, { useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactFlow, { Background, BackgroundVariant, Connection, Controls, Edge, Handle, Position, addEdge, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';


const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];

const CustomInput = () => (
  <>
    <div>Only connectable with B</div>
    <Handle type="source" position={Position.Right} />
  </>
);

const CustomNode = ({ id }:{id:any}) => (
  <>
    <Handle type="target" position={Position.Left} />
    <div>{id}</div>
    <Handle type="source" position={Position.Right} />
  </>
);

const nodeTypes = {
  custominput: CustomInput,
  customnode: CustomNode,
};

const ValidationFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((els) => addEdge(params, els)), []);

const ReactFlowStyled = styled(ReactFlow)`
  background-color: #3b3b3b;
`;

  return (
    <div style={{ height: '100%' }}>
      <ReactFlowStyled 
      nodes={nodes}
      edges={edges}
      //onNodesChange={onNodesChange}
      //onEdgesChange={onEdgesChange}
      //onConnect={onConnect}
      //selectNodesOnDrag={false}
      //className="validationflow"
      //nodeTypes={nodeTypes}
      >
      <Background
        color="#d9d9d9"
        variant={BackgroundVariant.Dots}
      />
        <Controls />
      </ReactFlowStyled>
    </div>
  );
}

export default ValidationFlow;
