import React from 'react';
import Home from "./articles/Home";
import 'antd/dist/antd.css';
import Navbar from "./Navbar/navbar";
const App = () => {
  return (
    <div className="app">
        <Navbar/>
        <Home/>
    </div>
  );
}

export default App;
