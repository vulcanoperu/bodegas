
import { render } from 'preact';
import App from './App.jsx';
import './index.css';

console.log('Rendering Preact App');
console.log('CSS should be loaded from index.css');
render(<App />, document.getElementById('root'));