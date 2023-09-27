import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    let runTime = 0;
    const IGDBClientID = "qhq8oh9pel5ocqp5jxqlkpyo5guqe8";
    const [searchText, setSearchText] = useState();

    useEffect(() => {
        // This code is only for development stage
        if(runTime !== 0){
            return;
        }
        runTime++;
        //localStorage.setItem("expiryTime", Date.now() + 60)
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
            action: 'igdb-tokken'
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
        //alert(searchText);
        const headers = {
            'Client-ID': IGDBClientID, // Replace with your actual client ID
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            };
        axios
        .post('https://api.igdb.com/v4/games/',{
            //headers: headers
        })
        .then((response)=>{
            console.log('Response:', response.data)
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