export default [
  {
    id: '1',
    type: 'input',
    data: { label: 'Upload Pipeline' },
    position: { x: 250, y: 5 },
    type: 'step'
  },
  {
    id: '2',
    data: { label: 'Build Docker Image' },
    position: { x: 100, y: 100 },
    type: 'step'
  },
  {
    id: '3',
    data: { label: 'Linting' },
    position: { x: 400, y: 100 },
    type: 'step'
  },
  {
    id: '4',
    data: { label: 'Deploy to Production' },
    position: { x: 400, y: 200 },
    height: 300,
    width: 300,
    type: 'section'
  },
];
