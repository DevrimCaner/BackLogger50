import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js';

function Main(props) {
  const navigate = useNavigate();
    return (
      <>
      <Navbar/>
      <section>
        <header className='w-100 bg-dark' style={{height: '700px', backgroundImage: "url('https://backlogger50.devrimcaner.com/static/media/landing.png')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
          <div className='w-100 h-100 bg-black bg-opacity-50'>
            <div className="container pt-5 ps-3 z-3">
              <h1 className='mt-5 text-light' style={{fontSize: '52px'}}>Welcome To BackLogger50</h1>
              <p className="mt-3 text-light opacity-75 fs-4">
                This is a Final Project App for CS50X by <i>DevrimCaner</i> <br/>
                In this app you can <b>backlog</b> video games that you want to play. <br/>
                After listed the games you want to play, you can mark them as complated on the list.
                </p>
              <div className='mt-5 mb-5'>
                <a className='btn btn-light btn-lg rounded-0 me-3' href='/register'><i className="bi bi-box-arrow-in-left"></i> Register Now</a>
                <a className='btn btn-outline-light btn-lg rounded-0' href='https://github.com/DevrimCaner/BackLogger50' target='blank'><i className="bi bi-github"></i> GitHub Page</a>
              </div>
            </div>
          </div>
        </header>

      </section>
      <section className='pt-5 pb-5'>
        <div className='container'>
          <h2 className='h1 text-center'>"To Do List" Like App</h2>
          <p className="mt-3 text-light opacity-75 fs-5 text-center">
            <i>
              Typical To Do List App with Login and Register features but todo's are <b>games</b>.
            </i>
          </p>
        </div>
      </section>

      <section className='bg-dark pt-5 pb-5'> 
        <div className='container'>
          <div className='row'>
            <div className='col-md-7'>
              <h3 className='h1'>Add Games To Your List</h3>
              <p className="mt-3 text-light opacity-75 fs-4">
                With IGDB Api integration you can search for games you want to add list. When you find the game you searching for you can add to list with "+" button.
              </p>
            </div>
            <div className='col-md-5'>
              <img className='w-100 border' src='https://backlogger50.devrimcaner.com/static/media/add.gif'></img>
            </div>
          </div>
        </div>
      </section>

      <section className='pt-5 pb-5'> 
        <div className='container'>
          <div className='row'>
            <div className='col-md-7'>
              <h3 className='h1'>Manage the Listed and Complated Games</h3>
              <p className="mt-3 text-light opacity-75 fs-4">
                In this app you can backlog video games that you want to play. After listed the games you want to play, you can mark them as complated on the list.
              </p>
            </div>
            <div className='col-md-5'>
              <img className='w-100 border' src='https://backlogger50.devrimcaner.com/static/media/list.gif'></img>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-dark pt-5 pb-5'> 
          <h2 className='text-center h1'>Made With</h2>
        <div className='container pt-5'>
          <div className='row'>
            <div className='col-md-4 mt-3'>
              <h3><i className="bi bi-database rounded-0 bg-gradient p-2" style={{backgroundColor: '#7158e2'}}></i> API</h3>
              <p className="mt-3 text-light opacity-75 fs-4">
                BackLogger50 uses the <b>IGDB</b> API to access a wealth of game data and information.
              </p>
            </div>
            <div className='col-md-4 mt-3'>
              <h3><i className="bi bi-braces bg-info rounded-0 bg-gradient p-2" ></i> Front-End</h3>
              <p className="mt-3 text-light opacity-75 fs-4">
                In order to create an intuitive UI, BackLogger50 leverages the power of <b>ReactJS</b> and enhances the visual design with <b>Bootstrap</b>.
              </p>
            </div>
            <div className='col-md-4 mt-3'>
              <h3><i className="bi bi-code-slash bg-primary rounded-0 bg-gradient p-2"></i> Back-End</h3>
              <p className="mt-3 text-light opacity-75 fs-4">
                For the Back-End, BackLogger50 uses <b>PHP</b> to handle the server-side operations. This includes tasks like user authentication and game list information.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      
      </>
    );
  }
  
  export default Main;