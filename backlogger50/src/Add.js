import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddCard from './AddCard';
import Navbar from './Navbar.js';

function Add() {
    let runTime = 0;
    const [searchText, setSearchText] = useState();
    const navigate = useNavigate();
    const loggedIn = sessionStorage.getItem("loggedIn");
    const user = sessionStorage.getItem("user");
    const passHash = sessionStorage.getItem("passHash");

    useEffect(() => {
        if(!loggedIn || !user || !passHash){
            navigate('/login');
        }
        // This code is only for development stage
        if(runTime !== 0){
            return;
        }
        runTime++;
        //DEBUG
        console.log("Date.now():", Date.now());
        console.log("expiryTime:", localStorage.getItem("expiryTime"));
        console.log("accessToken:", localStorage.getItem("accessToken"));
        // Check expiry time and token exist
        if(localStorage.getItem("accessToken") === null || localStorage.getItem("expiryTime") < Date.now()){
            SetupToken();
        }
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

    const Search = ()=>{
        console.log('Search:', searchText);
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
                            <input className="form-control text-light bg-secondary bg-gradient shadow rounded-0" type="search" placeholder="Search" aria-label="Search"/>
                        </div>
                    </div>

                    <div className='row'>
                        <AddCard/>
                    </div>
                    
                    <div className='row px-3'>
                        <p className='text-center text-dark fst-italic fs-6'>To add games on list, make search on search box.</p>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
    </>
  );
}

export default Add;