// FlowDiagram.tsx
import React from 'react';
import ReactFlow, { Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';

interface FlowDiagramProps {
    nodes: Node[];
    edges: Edge[];
}

const FlowDiagram: React.FC<FlowDiagramProps> = ({ nodes, edges }) => (
    <ReactFlow nodes={nodes} edges={edges} fitView />
);

export default FlowDiagram;