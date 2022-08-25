import { Routes, Route } from "react-router-dom";
import List from './components/List';
import Heading from './components/Heading';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<h1>this is home</h1>}/>
        <Route path="/" element={<div><Heading/><List /></div>}/>
      </Routes>
    </div>
  );
}

export default App;
