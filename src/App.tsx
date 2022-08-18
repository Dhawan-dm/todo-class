import { Routes, Route, Link } from "react-router-dom";
import List from './components/List/List';
import Heading from './components/Heading/Heading';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<h1>this is home</h1>}/>
        <Route path="/" element={<div><Heading></Heading><List></List></div>}/>
      </Routes>
    </div>
  );
}

export default App;
