import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Navbar from './Navbar.js';

function Add(props) {
    const searchTimeout = 2000;
    const [searchText, setSearchText] = useState();
    const [notFound, setNotFound] = useState();
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const loggedIn = sessionStorage.getItem("loggedIn");
    const user = sessionStorage.getItem("user");
    const passHash = sessionStorage.getItem("passHash");

    const sampleData = [{cover: "co2n19", id: 621, name: "Call of Duty"}, {cover: "co1n24", id: 55056, name: "Age of Empires II: Definitive Edition"}];

    useEffect(() => {
        if(!loggedIn || !user || !passHash){
            navigate('/login');
        }
        // Search Actions
        clearTimeout(window.timer);
        window.timer = setTimeout(() => {
            Search();
        }, searchTimeout);
    }, [searchText]);

    const Search = ()=>{
        setNotFound(false);
        setResults([]);
        if(!searchText || searchText.trim() == ''){
            return;
        }
        axios
        .post(`${process.env.REACT_APP_ENDPOINT}`,{
            action: 'game-search',
            user: user,
            password: passHash,
            token: localStorage.getItem("accessToken"),
            searchText: searchText
        })
        .then((response)=>{
            if(response.data.error){
                console.error(response.data.error);
                return;
            }
            if(response.data.length > 0){
                setResults(response.data);
            }
            else{// Not Found
                setNotFound(true);
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    };

    const AddGame = (game, message)=>{
        const updatedList = results.filter(item => item.id !== game);
        setResults(updatedList);
        props.addAlert(message, 'success');
      }

  return (
    <>
    <Navbar/>
    <section className='mt-5'>
        <div className="container">
            <div className='row'>
                <div className='col-12'>
                    <h1 className='text-center mb-4'>Add Game</h1>
                    <div className='row'>
                        <div className="input-group mb-3">
                            <input className="form-control text-light bg-secondary bg-gradient shadow rounded-0" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchText(e.target.value)}/>
                        </div>
                    </div>

                    {results.length > 0 ? (
                    <div className='row'>
                      {results.map((game, index) => (
                        <Card key={index} game={game} type={2} add={AddGame}/>
                        ))}
                    </div>
                    ):(
                    <div className='row px-3'>
                        {
                            searchText ? (
                                    notFound ? (
                                        <p className='text-center text-dark fst-italic fs-6'>Games Not Found.</p>
                                    ):
                                    (
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden"></span>
                                        </div>
                                    )
                                
                            ):
                            (
                                <p className='text-center text-dark fst-italic fs-6'>To add games on list, make search on search box.</p>
                            )
                        }
                    </div>
                    )}                    
                </div>
            </div>

        </div>
    </section>
    </>
  );
}

export default Add;