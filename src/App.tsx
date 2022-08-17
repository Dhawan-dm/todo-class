import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List/List';
import Heading from './components/Heading/Heading';

function App() {
  return (
    <div className="App">
      <Heading></Heading>
      <List></List>
    </div>
  );
}

export default App;
