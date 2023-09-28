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
            console.log(response.data)
        })
        .catch((error)=>{
            console.error(error);
        });
    }
  return (
    <>
    <input type='text' value={searchText || ''} onChange={(e) => setSearchText(e.target.value)} ></input>
    <button onClick={Search}>Search</button>
    </>
  );
}

export default Home;