
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import Home from './home.js';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' exact Component={Home}/>
      </Routes>
    </Router>

  );
}

export default App;
