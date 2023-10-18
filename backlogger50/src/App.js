
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Main from './Main.js';
import Add from './Add.js';
import List from './List.js';
import Login from './Login.js';
import Register from './Register.js';
import Alertbox from './Alertbox.js';
import './App.css';

function App() {
  const loggedIn = sessionStorage.getItem("loggedIn");
  const user = sessionStorage.getItem("user");  
  const passHash = sessionStorage.getItem("passHash");
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // This code is only for development stage
    if(loggedIn && user && passHash){
        if(localStorage.getItem("accessToken") === null || localStorage.getItem("expiryTime") < Date.now()){
            SetupToken();
        }
    }
   
    // Check expiry time and token exist
  }, []);

  const SetupToken = async () => {
    //Get Tokken Data
    axios
    .post(`${process.env.REACT_APP_ENDPOINT}`,{
        action: 'igdb-token'
    })
    .then((response)=>{
        console.log(response.data)
        // If tokken not geted
        if(response.data.status){
            console.error(response.data.status);
            console.error(response.data.message);
        }
        else{
            let newExpiryTime = response.data.expires_in + Date.now();
            localStorage.setItem("expiryTime", newExpiryTime);
            localStorage.setItem("accessToken", response.data.access_token);
        }
    })
    .catch((error)=>{
        console.error(error);
    });
  };

  const AddAlert = (message, type) =>{
    const newAlert = {message: message, type:type};
    const updatedAlerts = [newAlert, ...alerts];
    setAlerts(updatedAlerts);
  }

  return (
    <>
    <div className='fixed-top mt-5 px-5'>
      {
        alerts.length > 0 &&(
            alerts.map((item, index)=>(
              <Alertbox key={index} message={item.message} type={item.type}/>
              )
            )
          )
      }
    </div>
    <Router>
      <Routes>
        <Route path='/' exact Component={Main}/>
        <Route path='/add' element={<Add addAlert={AddAlert} />} />
        <Route path='/list' element={<List addAlert={AddAlert} />} />
        <Route path='/login' Component={Login}/>
        <Route path='/register' Component={Register}/>
      </Routes>
    </Router>
    </>

  );
}

export default App;
