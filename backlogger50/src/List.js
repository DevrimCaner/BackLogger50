import { useNavigate } from 'react-router-dom';
import ListedCard from './ListedCard';
import ComplatedCard from './ComplatedCard';
import { useEffect } from 'react';
import Navbar from './Navbar.js';

function List(props) {
  const navigate = useNavigate();
  const loggedIn = sessionStorage.getItem("loggedIn");
  const user = sessionStorage.getItem("user");
  const passHash = sessionStorage.getItem("passHash");
  
  useEffect(() =>{
    if(!loggedIn || !user || !passHash){
      navigate('/login');
    }
  });

    return (
      <>
      <Navbar/>
      <section className='mt-5'>
        <div className="container">
          <div className='row'>
              <div className='col-md-6'>
                    <h1 className='text-center mb-3 '>Listed</h1>
                    
                    <div className='row shadow border border-success bg-dark bg-gradient me-1 pt-3'>
                        <ListedCard/>
                    </div>
                    
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