import { Edge, Node } from 'reactflow';

export interface NodeState {
  nodes: Node<NodeData>[],
  edges: Edge<EdgeData>[],
}

export interface EdgeData {
  filename?: string;
}

export interface NodeData {
  label: string;
  templateData: BaseTemplateData;
  instantiationData: BaseInstantiationData;
}

export interface DataSourceNodeData extends NodeData {
  templateData: DataSourceTemplateData;
  instantiationData: DataSourceInstantiationData;
}

export interface DataSinkNodeData extends NodeData {
  instantiationData: DataSinkInstantiationData;
}

export interface OperatorNodeData extends NodeData {
  templateData: OperatorTemplateData;
  instantiationData: OperatorInstantiationData;
}


export interface BaseTemplateData {
  sourceHandles: HandleData[];
  targetHandles: HandleData[];
}

export interface DataSourceTemplateData extends BaseTemplateData {
  resourceType: string;
}

export interface DataSinkTemplateData extends BaseTemplateData {}

export interface OperatorTemplateData extends BaseTemplateData {
  hint: string;
}

export interface BaseInstantiationData {}

export interface DataSourceInstantiationData extends BaseInstantiationData {
  resource?: Resource;
}

export interface DataSinkInstantiationData extends BaseInstantiationData {
  repository?: Repository;
}

export interface OperatorInstantiationData extends BaseInstantiationData {
  algorithm?: Algorithm;
}

export interface InstantiationData {
  resource?: Resource;
  algorithm?: Algorithm;
}

export interface Repository {
  organizationId?: number;
  repositoryId?: number;
  name: string;
}

export interface Resource {
  organizationId?: number;
  repositoryId?: number;
  resourceId?: number;
  resourceType?: string;
  fileExtension?: string;
  name: string;
}

export interface Algorithm {
  organizationId?: number;
  repositoryId?: number;
  algorithmId?: number;
  name: string;
}

export interface HandleData {
  type?: string,
  id: string,
}
