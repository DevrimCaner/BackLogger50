import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Sha256 } from './Functions';
import axios from 'axios';
import Navbar from './Navbar.js';

function Login(props) {
  const navigate = useNavigate();
  const [warningMessage, setWarningMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();


  const Login = async () => {
    setErrorMessage('');
    setWarningMessage('');
    setSuccessMessage('');
    if(!user){
      setWarningMessage('Please Fill the Username field.');
      return;
    }
    if(!password){
      setWarningMessage('Please Fill the Password field.');
      return;
    }
    setWarningMessage('')
    // Setup the Password Hash
    const hash = await Sha256(password);
    // Post
    axios
    .post(`${process.env.REACT_APP_ENDPOINT}`,{
        action: 'login',
        user: user,
        password: hash,
    })
    .then((response)=>{
        if(response.data.error){
          setErrorMessage(response.data.error);
        }
        else if(response.data.success){
          setSuccessMessage(response.data.success);
          // Setup Session Data
          sessionStorage.setItem('loggedIn', true);
          sessionStorage.setItem('user', user);
          sessionStorage.setItem('passHash', hash);
          // Foward
          setTimeout(() => {
            navigate('/list');
        }, 1000);
        }
        else{
          console.log(response.data)
          setErrorMessage('Unknown Error!');
        }
    })
    .catch((error)=>{
        console.error(error);
    });
  };
    return (
      <>
      <Navbar/>
      <section>
        <div className="container mt-5">
          <div className="row">
            <div className="col col-md-6 mx-auto">
              <div className="container w-100 mt-5 border shadow bg-dark bg-gradient bg-opacity-75">
                <h1 className="h2 my-5 text-center">Login to <span className='opacity-50'>BackLogger50</span></h1>
                  <input className="form-control mb-4 text-light bg-secondary bg-gradient bg-opacity-50 shadow rounded-0" type="text" placeholder="Username" value={user || ''} onChange={(e) => setUser(e.target.value)}/>
                  <input className="form-control mb-4 text-light bg-secondary bg-gradient bg-opacity-50 shadow rounded-0" type="Password" placeholder="Password" value={password || ''} onChange={(e) => setPassword(e.target.value)}/>
                  <button className="shadow mb-5 px-4 btn btn-primary bg-gradient rounded-0" onClick={Login}>Login</button>
                  {
                  warningMessage && (
                    <div className="alert alert-warning rounded-0 bg-dark text-warning border border-warning" role="alert">
                      {warningMessage}
                    </div>
                  )
                  }
                  {
                  errorMessage && (
                    <div className="alert alert-danger rounded-0 bg-dark text-danger border border-danger" role="alert">
                      {errorMessage}
                    </div>
                  )
                  }
                  {
                  successMessage && (
                    <div className="alert alert-success rounded-0 bg-dark text-success border border-success" role="alert">
                      {successMessage}
                    </div>
                  )
                  }
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    );
  }
  
  export default Login;