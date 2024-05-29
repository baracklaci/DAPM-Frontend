import {
    BaseEdge,
  type EdgeProps,
  BezierEdge,
  MarkerType
} from 'reactflow';

import { EdgeData } from '../../../redux/states/pipelineState';
import { useSelector } from 'react-redux';
import { getNodes } from '../../../redux/selectors';


export function DefaultEdge({id, data, style, selected, target, ...delegated}: EdgeProps<EdgeData>) {

  const nodes = useSelector(getNodes);
  const targetNode = nodes?.find(node => node.id === target);

  const strokeColor = (targetNode?.type === 'dataSink' && (!data?.filename || data.filename == '')) ? 'red' : 'white';

  return (
    <>
      <BezierEdge
        id={id}
        target={target}
        {...delegated}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: selected ? '#007bff' : strokeColor,
        }}
      />
    </>
  );
}

