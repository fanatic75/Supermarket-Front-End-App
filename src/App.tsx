import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import CssBaseline from '@material-ui/core/CssBaseline';


const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
        <div className="App">
          <Routes />
        </div>
    </Router>
  );
}

export default App;
