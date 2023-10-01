function Navbar(props) {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient">
        <div className="container-fluid">
            <a class="navbar-brand h1 text-light mb-0" href="/">Back<span className="text-success">Logger</span><span className="text-primary">50</span></a>
            <button className="navbar-toggler rounded-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/add">Add</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/List">List</a>
                    </li>
                </ul>
                <div className="d-flex" role="search">
                    <a className="btn btn-outline-success text-light rounded-0 border-0" href='/login'>Login</a>
                    <a className="btn btn-outline-info text-light rounded-0 border-0" href='/register'>Register</a>
                    <button className="btn btn-outline-danger text-light rounded-0 border-0"><i className="bi bi-box-arrow-right"></i></button>
                </div>
            </div>
        </div>
    </nav>
    </>
  );
}

export default Navbar;