function Navbar(props) {
    const loggedIn = sessionStorage.getItem("loggedIn");
    const user = sessionStorage.getItem("user");
    const passHash = sessionStorage.getItem("passHash");
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient shadow">
            <div className="container-fluid">
                <a className="navbar-brand h1 text-light mb-0" href="/"><span className="text-success">Back</span><span className="text-primary">Logger</span><span className="text-secondary">50</span></a>
                <button className="navbar-toggler rounded-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        loggedIn ? (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/add">Add</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/list">List</a>
                                </li>
                            </ul>
                        ):(
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            </ul>
                        )
                    }
                    <div className="d-flex" role="search">
                        {
                            loggedIn ? (
                                <>
                                <a className="btn btn-outline-primary text-light rounded-0 border-0 disabled" href=''>Admin</a>
                                <button className="btn btn-outline-danger text-light rounded-0 border-0"><i className="bi bi-box-arrow-right"></i></button>
                                </>
                            ):(
                                <>
                                <a className="btn btn-outline-success text-light rounded-0 border-0 mx-1" href='/login'>Login</a>
                                <a className="btn btn-outline-info text-light rounded-0 border-0" href='/register'>Register</a>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
        </>
    );
}

export default Navbar;