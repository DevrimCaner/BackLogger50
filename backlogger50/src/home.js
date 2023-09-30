import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    let runTime = 0;
    const [searchText, setSearchText] = useState();

    useEffect(() => {
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
    }
  return (
    <>
    <nav className="navbar bg-dark border border-primary border-top-0 border-start-0 border-end-0">
        <div className="container-fluid">
            <span className="navbar-brand mb-0 h1 text-light">BackLogger50</span>
            <div className="d-flex">
                <button class="btn btn-outline-danger text-light rounded-0 border-0"><i class="bi bi-box-arrow-right"></i></button>
            </div>
        </div>
    </nav>
    <section className='mt-5'>
        <div className="container">
            <div className='row'>
                <div className='col-12'>
                    <h1 className='text-center mb-4'>Add Game</h1>
                    <div className='row'>
                        <div className="input-group mb-3">
                            <input class="form-control me-2 text-light bg-secondary bg-gradient shadow rounded-0" type="search" placeholder="Search" aria-label="Search"/>
                        </div>
                    </div>
                    <div className='row'>
                        <p className='text-center text-dark fst-italic fs-6'>To add games on list, make search on search box.</p>


                        <div className='col-sm-6 col-md-4 col-lg-3'>
                            <div className="w-100 card m-0 mb-3 p-0 bg-dark bg-gradient text-light shadow rounded-0 border border-primary">
                                <div className='card-header p-0 border-bottom-0'>
                                        <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co2ed3.png" className="img-fluid rounded-0 w-100"/>
                                </div>
                                <div className="card-body p-0 px-2 pt-1">
                                    <h4 className="card-title mb-0">Assassin's Creed Valhalla</h4>
                                    <h5 className="card-text text-secondary fst-italic m-0 fs-6">10 11 2020</h5>
                                    <div className='card-text mt-2'>
                                        <span class="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                                            <i class="bi bi-windows "></i>
                                        </span>
                                        <span class="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                                            <i class="bi bi-steam"></i>
                                        </span>
                                        <span class="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                                            <i class="bi bi-apple"></i>
                                        </span>
                                        <span class="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                                            <i class="bi bi-nvidia"></i>
                                        </span>
                                        <span class="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                                            <i class="bi bi-playstation"></i>
                                        </span>
                                        <span class="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                                            <i class="bi bi-xbox"></i>
                                        </span>
                                        <span class="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                                            <i class="bi bi-nintendo-switch"></i>
                                        </span>
                                        <span class="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                                            <i class="bi bi-android2"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="card-footer border-top-0 mt-2">
                                    <div className='row'>
                                        <div className='col-6 m-0 p-0'>
                                            <button class="btn btn-lg btn-outline-danger border-0 text-light bg-gradient rounded-0 d-flex justify-content-end"><i class="bi bi-trash"></i></button>
                                        </div>
                                        <div className='col-6 m-0 p-0 d-flex d-flex justify-content-end'>
                                            <button class="shadow btn btn-lg btn-primary bg-gradient rounded-0 "><i class="bi bi-plus-lg"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className='row px-3'>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <h2>Listed</h2>
                </div>
                <div className='col-md-6'>
                    <h2>Completed</h2>
                </div>
            </div>

        </div>
    </section>
    </>
  );
}

export default Home;