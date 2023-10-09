import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Navbar from './Navbar.js';

function Add() {
    let runTime = 0;
    const searchTimeout = 2000;
    const [searchText, setSearchText] = useState();
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
        // This code is only for development stage
        if(runTime !== 0){
            return;
        }
        runTime++;
    }, []);

    const HandleSearch = (text)=>{
        setSearchText(text.trim());
        console.log('Search:', searchText);
        if(!searchText || searchText.trim() == ''){
            setResults([]);
            return;
        }
        clearTimeout(window.timer);
        window.timer = setTimeout(() => {
            Search();
        }, searchTimeout);
    }
    
    const Search = ()=>{
        if(!searchText ){
            return;
        }
        setResults(sampleData);
        return;
        axios
        .post(`${process.env.REACT_APP_ENDPOINT}`,{
            action: 'test',
            token: localStorage.getItem("accessToken")
        })
        .then((response)=>{
            //console.log(response.data)
            if(response.data.error){
                console.error(response.data.error);
                return;
            }
            let elements = JSON.parse(response.data);
            elements.forEach(element => {
                console.log(element);
            });
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
                <div className='col-12'>
                    <h1 className='text-center mb-4'>Add Game</h1>
                    <div className='row'>
                        <div className="input-group mb-3">
                            <input className="form-control text-light bg-secondary bg-gradient shadow rounded-0" type="search" placeholder="Search" aria-label="Search" onChange={(e) => HandleSearch(e.target.value)}/>
                        </div>
                    </div>

                    {results.length > 0 ? (
                    <div className='row'>
                      {results.map((game, index) => (
                        <Card key={index} game={game} type={2} />
                        ))}
                    </div>
                    ):(
                    <div className='row px-3'>
                        {
                            searchText ? (
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden"></span>
                                </div>
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