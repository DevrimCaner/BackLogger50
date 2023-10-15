// Libs
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// Companents
import Card from './Card.js';
import Navbar from './Navbar.js';

function List(props) {
  let runTime = 0;
  const [list, setList] = useState([]);
  const [searching, setSearching] = useState(false);
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
    if(!loggedIn || !user || !passHash){
      navigate('/login');
    }
    GetList();
  },[]);

  const GetList = async ()=>{
    setSearching(true);
    await axios
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
          setList(response.data);
        }
      })
      .catch((error)=>{
        console.error(error);
      });
      setSearching(false)
};

const goAddPage = () =>{
  navigate('/add');
}

const DeleteFromList = (game, message)=>{
  message += ' Deleted !';
  const updatedList = list.filter(item => item.id !== game);
  setList(updatedList);
  props.addAlert(message, 'danger');
}
const ComplateFromList = (game, message)=>{
  message += '  Complated !';
  const updatedList = list.map(item => item.id === game ? { ...item, status: 1 } : item);
  setList(updatedList);
  props.addAlert(message, 'success');
}
const RelistFromList = (game, message)=>{
  message += ' Relisted !';
  const updatedList = list.map(item => item.id === game ? { ...item, status: 0 } : item);
  setList(updatedList);
  props.addAlert(message, 'warning');  
}


  return (
    <>
    <Navbar/>
    <section className='mt-5'>
      <div className="container">
        <div className='row'>
          {
            list.length <= 0 &&(
                searching ? (
                  <div className="spinner-border" role="status">
                        <span className="visually-hidden"></span>
                  </div>
                ):
                (
                  <p className='text-center text-dark fst-italic fs-6'>No items found on the List, you can use <button className='btn btn-link text-dark px-0' onClick={goAddPage}>Add</button> page for addinf games.</p>
                )
              )
          }
          
          {list.length > 0 && (
            <div className='row shadow border border-success bg-dark bg-gradient pt-3'>
              <h1 className='h2'>Listed</h1>
              {list.filter(game => !game.status).map((game, index) => (
                <Card key={index} game={game} type={0} delete={DeleteFromList} complate={ComplateFromList} relist={RelistFromList} />
                ))}
            </div>
          )}
          {list.length > 0 && (
            <div className='row shadow border border-dark bg-black bg-gradient pt-3 mt-2'>
              <h1 className='h2 text-secondary'>Complated</h1>
              {list.filter(game => game.status).map((game, index) => (
                <Card key={index} game={game} type={1} delete={DeleteFromList} complate={ComplateFromList} relist={RelistFromList} />
                ))}
            </div>
          )}

        </div>
      </div>
    </section>
    </>
  );
}
  
  export default List;