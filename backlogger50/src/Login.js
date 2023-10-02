function Login(props) {
    return (
      <section>
        <div className="container mt-5">
          <div className="row">
            <div className="col col-md-6 mx-auto">
              <div className="container w-100 mt-5 border shadow bg-dark bg-gradient bg-opacity-75">
                <h1 className="h2 my-5 text-center">Login to <span className='opacity-50'>BackLogger50</span></h1>
                  <input className="form-control mb-4 text-light bg-secondary bg-gradient bg-opacity-50 shadow rounded-0" type="text" placeholder="Username"/>
                  <input className="form-control mb-4 text-light bg-secondary bg-gradient bg-opacity-50 shadow rounded-0" type="Password" placeholder="Password"/>
                  <button className="shadow mb-5 px-4 btn btn-primary bg-gradient rounded-0 ">Login</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Login;