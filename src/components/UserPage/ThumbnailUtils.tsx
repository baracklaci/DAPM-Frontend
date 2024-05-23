// // captureDiagram.tsx
// import React from 'react';
// import ReactDOM from 'react-dom';
// import html2canvas from 'html2canvas';
// import FlowDiagram from './FlowDiagram';
// import { Edge, Node, getRectOfNodes, getTransformForBounds } from 'reactflow';
// import { PipelineData } from '../../redux/states/pipelineState';
// import { useDispatch } from 'react-redux';
// import { setImageData } from '../../redux/slices/pipelineSlice';
// import { toPng } from 'html-to-image';

// export interface Diagram {
//   nodes: Node[];
//   edges: Edge[];
// }

// export interface Thumbnail {
//   index: string;
//   imgData: string;
// }


// const captureDiagram = (nodes: Node[], edges: Edge[], pipelineId: string): void => {
//   const container = document.createElement('div');
//   container.style.position = 'absolute';
//   container.style.top = '-10000px';
//   document.body.appendChild(container);

//   const dispatch = useDispatch();

//   var generatedImgData = ''

//   ReactDOM.render(
//     <FlowDiagram nodes={nodes} edges={edges} />,
//     container,
//     async () => {
//       console.log('rendered', container.firstChild as HTMLElement);
//       html2canvas(container.firstChild as HTMLElement).then((canvas) => {
//         console.log('canvas', canvas);
//         const imgData = canvas.toDataURL('image/jpeg');
//         console.log('imagedata', imgData);
//         generatedImgData = imgData;
//         document.body.removeChild(container);
//       });

//       const nodesBounds = getRectOfNodes(nodes);
//       const transform = getTransformForBounds(nodesBounds, 1024, 768, 0.5, 2);

//       toPng(container.firstChild as HTMLElement, {
//         backgroundColor: '#1a365d',
//         width: 1024,
//         height: 768,
//         style: {
//           width: '1024',
//           height: '768',
//           transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
//         },
//       }).then((dataUrl) => {
//         dispatch(setImageData({ id: pipelineId, imgData: dataUrl }));
//       });
//     }
//   );
// };

// const generateThumbnails = (pipelines: PipelineData[]): null => {
//   console.log('Generating thumbnails for', pipelines);
//   pipelines.map(({ flowData, id }) => {
//     captureDiagram(flowData.nodes, flowData.edges, id);
//   });

//   return null;
// };

// export { captureDiagram, generateThumbnails };
export {}