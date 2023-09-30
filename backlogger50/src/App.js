
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './home.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './App.css';

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
