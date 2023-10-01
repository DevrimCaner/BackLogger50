
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Main from './Main.js';
import Add from './Add.js';
import List from './List.js';
import Login from './Login.js';
import Register from './Register.js';
import Navbar from './Navbar.js';

import './App.css';

function App() {

  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path='/' exact Component={Main}/>
        <Route path='/add' Component={Add}/>
        <Route path='/list' Component={List}/>
        <Route path='/login' Component={Login}/>
        <Route path='/register' Component={Register}/>
      </Routes>
    </Router>
    </>

  );
}

export default App;
