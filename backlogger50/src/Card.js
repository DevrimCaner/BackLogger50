import { useEffect, useState } from 'react';
import axios from 'axios';

function Card(props) {
    // Properties
    const [platformPC, setPlatformPC] = useState();
    const [platformMAC, setPlatformMAC] = useState();
    const [platformLinux, setPlatformLinux] = useState();
    const [platformPS, setPlatformPS] = useState();
    const [platformXBOX, setPlatformXBOX] = useState();
    const [platformSwitch, setPlatformSwitch] = useState();
    const [platformIOS, setPlatformIOS] = useState();
    const [platformAndroid, setPlatformAndroid] = useState();
    const [dateString, setDateString] = useState();

    //const loggedIn = sessionStorage.getItem("loggedIn");
    const user = sessionStorage.getItem("user");
    const passHash = sessionStorage.getItem("passHash");



    useEffect(() =>{
        // Setup Release Date
        setDateString('');
        if(props.game.first_release_date){
            const date = new Date(props.game.first_release_date * 1000);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString(undefined, options);
            setDateString(formattedDate);
        }
        // Setup Platforms
        setPlatformPC(false);
        setPlatformMAC(false);
        setPlatformLinux(false);
        setPlatformPS(false);
        setPlatformXBOX(false);
        setPlatformSwitch(false);
        setPlatformIOS(false);
        setPlatformAndroid(false)
        if(props.game.platforms){
            setPlatformPC(props.game.platforms.includes(6));
            setPlatformMAC(props.game.platforms.includes(14));
            setPlatformLinux(props.game.platforms.includes(3));

            if(props.game.platforms.includes(7) || props.game.platforms.includes(8) || props.game.platforms.includes(9) || props.game.platforms.includes(48) || props.game.platforms.includes(167) || props.game.platforms.includes(38) || props.game.platforms.includes(46)){// 1, 2, 3, 4, 5 , psp, vita
                setPlatformPS(true);
            }
            if(props.game.platforms.includes(11) || props.game.platforms.includes(12) || props.game.platforms.includes(49) || props.game.platforms.includes(169)){// xbox, 360, one, x|s
                setPlatformXBOX(true);
            }
            setPlatformSwitch(props.game.platforms.includes(130));
            setPlatformIOS(props.game.platforms.includes(39));
            setPlatformAndroid(props.game.platforms.includes(34));
        }
    },[]);

    // CRUD actions
    const Add = ()=>{
        if(!props.game.id){
            console.error('No Id');
            return;
        }
        axios
        .post(`${process.env.REACT_APP_ENDPOINT}`,{
            action: 'add-game',
            user: user,
            password: passHash,
            game: props.game.id,
            gameName: props.game.name
        })
        .then((response)=>{
            if(response.data.error){
                console.error(response.data.error);
            }
            else if(response.data.message){
                console.warn(response.data.message);
            }
            else if(response.data.success){// Success
                console.log(response.data);
                props.add(props.game.id, props.game.name);
            }
            else{
                console.log(response.data);
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    };
    const Delete = ()=>{
        if(!props.game.id){
            console.error('No Id');
            return;
        }
        axios
        .post(`${process.env.REACT_APP_ENDPOINT}`,{
            action: 'delete-game',
            user: user,
            password: passHash,
            game: props.game.id,
            gameName: props.game.name
        })
        .then((response)=>{
            if(response.data.error){
                console.error(response.data.error);
            }
            else if(response.data.message){
                console.warn(response.data.message);
            }
            else if(response.data.success){// Success
                props.delete(props.game.id, props.game.name);
            }
            else{
                console.log(response.data);
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    };
    const Complate = ()=>{
        if(!props.game.id){
            console.error('No Id');
            return;
        }
        axios
        .post(`${process.env.REACT_APP_ENDPOINT}`,{
            action: 'complate-game',
            user: user,
            password: passHash,
            game: props.game.id,
            gameName: props.game.name
        })
        .then((response)=>{
            if(response.data.error){
                console.error(response.data.error);
            }
            else if(response.data.message){
                console.warn(response.data.message);
            }
            else if(response.data.success){// Success
                props.complate(props.game.id, props.game.name);
            }
            else{
                console.log(response.data);
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    };
    const ReList = ()=>{
        if(!props.game.id){
            console.error('No Id');
            return;
        }
        axios
        .post(`${process.env.REACT_APP_ENDPOINT}`,{
            action: 'relist-game',
            user: user,
            password: passHash,
            game: props.game.id,
            gameName: props.game.name
        })
        .then((response)=>{
            if(response.data.error){
                console.error(response.data.error);
            }
            else if(response.data.message){
                console.warn(response.data.message);
            }
            else if(response.data.success){// Success
                props.relist(props.game.id, props.game.name);
            }
            else{
                console.log(response.data);
            }
        })
        .catch((error)=>{
            console.error(error);
        });
    };
    return (
    <div className='col-sm-6 col-md-4 col-lg-3' >
        <div className={`w-100 card m-0 mb-3 p-0 bg-dark bg-gradient text-light shadow rounded-0 border ${props.type === 0 && ('border-success')} ${props.type === 1 && ('border-secondary bg-opacity-50')} ${props.type === 2 && ( props.game.listed ? ('border-info opacity-50'):('border-primary'))}`} >
            <div className='card-header p-0 border-bottom-0'>
                    <img src={`${props.game.cover ? (`https://images.igdb.com/igdb/image/upload/t_cover_big/${props.game.cover}.png`):('https://backlogger50.devrimcaner.com/static/media/empty-game-cover.png') }`} alt='...' className={`img-fluid rounded-0 w-100 ${props.type === 1 && ('opacity-50')}`}/>
            </div>
            <div className="card-body p-0 px-2 pt-1">
                <h4 className={`card-title mb-0 ${props.type === 1 && ('opacity-75')}`}>{props.game.name}</h4>
                <h5 className={`card-text text-secondary fst-italic m-0 fs-6 ${props.type === 1 && ('opacity-75')}`}>{dateString}</h5>
                <div className={`card-text mt-2 ${props.type === 1 && ('opacity-75')}`}>
                    { platformPC && (
                        <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                            <i className="bi bi-windows "></i>
                        </span>
                    )}
                    {platformMAC && (
                        <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                            <i className="bi bi-apple"></i>
                        </span>
                    )}
                    {platformLinux && (
                        <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                            <i className="bi bi-ubuntu"></i>
                        </span>
                    )}
                    {platformPS && (
                        <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                            <i className="bi bi-playstation"></i>
                        </span>
                    )}
                    {platformXBOX && (
                        <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                            <i className="bi bi-xbox"></i>
                        </span>
                    )}
                    {platformSwitch && (
                        <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                            <i className="bi bi-nintendo-switch"></i>
                        </span>
                    )}
                    {platformIOS && (
                        <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                            <i className="bi bi-phone"></i>
                        </span>
                    )}
                    {platformAndroid && (
                        <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                            <i className="bi bi-android2"></i>
                        </span>
                    )}
                </div>
            </div>
            <div className="card-footer border-top-0 mt-2">
                <div className='row'>
                    <div className='col-6 m-0 p-0'>
                        {props.type !== 2 && (
                            <button className="btn btn-lg btn-outline-danger border-0 text-light bg-gradient rounded-0 d-flex justify-content-end" onClick={Delete}><i className="bi bi-trash"></i></button>
                        )}
                    </div>
                    <div className='col-6 m-0 p-0 d-flex d-flex justify-content-end'>
                        {props.type === 0 && (
                            <button className="shadow btn btn-lg btn-success bg-gradient rounded-0 " onClick={Complate}><i className="bi bi-check-lg"></i></button>
                        )}
                        {props.type === 1 && (
                            <button className="shadow btn btn-lg btn-secondary bg-gradient rounded-0 " onClick={ReList}><i className="bi bi-arrow-counterclockwise"></i></button>
                        )}
                        {props.type === 2 && (
                            props.game.listed ? (
                                <button className="shadow btn btn-lg btn-info bg-gradient rounded-0 disabled text-light"><i className="bi bi-plus-lg"></i></button>
                                ):(
                                <button className="shadow btn btn-lg btn-primary bg-gradient rounded-0 " onClick={Add}><i className="bi bi-plus-lg"></i></button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default Card;