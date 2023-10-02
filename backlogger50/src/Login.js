import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Sha256 } from './Functions';
import axios from 'axios';

function Login(props) {
  const navigate = useNavigate();
  const [warningMessage, setWarningMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();


  const Login = async () => {
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
        console.log(response.data)
        if(response.data.error){
          setErrorMessage(response.data.error);
        }
        else{
          navigate('/list');
        }
    })
    .catch((error)=>{
        console.error(error);
    });
  };
    return (
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
                  warningMessage ? (
                    <div className="alert alert-warning rounded-0 bg-dark text-warning border border-warning" role="alert">
                      {warningMessage}
                    </div>
                  ):(<></>)
                  }
                  {
                  errorMessage ? (
                    <div className="alert alert-danger rounded-0 bg-dark text-danger border border-danger" role="alert">
                      {errorMessage}
                    </div>
                  ):(<></>)
                  }
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Login;