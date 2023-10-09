// Libs
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// Companents
import ListedCard from './ListedCard';
import ComplatedCard from './ComplatedCard';
import Card from './Card.js';
import Navbar from './Navbar.js';

function List() {
  let runTime = 0;
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const loggedIn = sessionStorage.getItem("loggedIn");
  const user = sessionStorage.getItem("user");
  const passHash = sessionStorage.getItem("passHash");
  
  useEffect(() =>{
    // This code is only for development stage
    if(runTime !== 0){
      return;
    }
    runTime++;
    Test()
    if(!loggedIn || !user || !passHash){
      navigate('/login');
    }
    GetList();
  },[]);
  const Test = ()=>{
    axios
    .post(`${process.env.REACT_APP_ENDPOINT}`,{
        action: 'test',
        token: localStorage.getItem("accessToken")
    })
    .then((response)=>{
        console.log(response.data)
    })
    .catch((error)=>{
        console.error(error);
    });
};
  const GetList = ()=>{
    axios
    .post(`${process.env.REACT_APP_ENDPOINT}`,{
        action: 'get-list',
        user: user,
        password: passHash,
        token: localStorage.getItem("accessToken")
    })
    .then((response)=>{
        if(response.data.error){
          console.log(response.data.error);
        }
        else if(response.data.message){
          console.log(response.data.message);
        }
        else{
          console.log("Data: ",response.data);
          setList(response.data);
        }
    })
    .catch((error)=>{
        console.error(error);
    });
};

  return (
    <>
    <Navbar/>
    <section className='mt-5'>
      <div className="container">
        <div className='row'>
            <div className='col-md-6'>
                  <h1 className='text-center mb-3 '>Listed</h1>
                  {list.length > 0 ? (
                    <div className='row shadow border border-success bg-dark bg-gradient me-1 pt-3'>
                      {list.map((game, index) => (
                        <Card key={index} game={game} type={0} />
                        ))}
                    </div>
                  ):(
                    <div className="spinner-border text-dark" role="status">
                          <span className="visually-hidden"></span>
                      </div>
                  )}
                  
            </div>
            <div className='col-md-6'>
                  <h1 className='text-center mb-3'>Complated</h1>
                  
                  <div className='row shadow border border-dark bg-black bg-gradient ms-1 pt-3'>
                      <ComplatedCard/>
                  </div>    
            </div>
        </div>
      </div>
    </section>
    </>
  );
}
  
  export default List;