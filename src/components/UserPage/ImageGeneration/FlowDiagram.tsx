import React from 'react';
import ReactFlow, { Edge, Handle, Node } from 'reactflow';
import DataSourceNode from '../../PipeLineComposer/Nodes/DataSourceNode';
import DataSinkNode from '../../PipeLineComposer/Nodes/DataSinkNode';
import CustomNode from '../../PipeLineComposer/Nodes/CustomNode';
import OrganizationImageNode from './OrganizationImageNode';

interface FlowDiagramProps {
    nodes: Node[];
    edges: Edge[];
}

export const nodeTypes = {
    dataSource: DataSourceNode,
    dataSink: DataSinkNode,
    operator: CustomNode,
    organization: OrganizationImageNode
  };

const FlowDiagram: React.FC<FlowDiagramProps> = ({ nodes, edges }) => (
    <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} fitView />
);

export default FlowDiagram;