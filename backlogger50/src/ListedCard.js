function ListedCard(props) {
    return (
        <div className='col-lg-4'>
        <div className="w-100 card m-0 mb-3 p-0 bg-dark bg-gradient text-light shadow rounded-0 border border-success">
            <div className='card-header p-0 border-bottom-0'>
                    <img src={`https:${props.image}`} className="img-fluid rounded-0 w-100"/>
            </div>
            <div className="card-body p-0 px-2 pt-1">
                <h4 className="card-title mb-0">{props.name}</h4>
                <h5 className="card-text text-secondary fst-italic m-0 fs-6">10 11 2020</h5>
                <div className='card-text mt-2'>
                    <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                        <i className="bi bi-windows "></i>
                    </span>
                    <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                        <i className="bi bi-steam"></i>
                    </span>
                    <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                        <i className="bi bi-apple"></i>
                    </span>
                    <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                        <i className="bi bi-nvidia"></i>
                    </span>
                    <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                        <i className="bi bi-playstation"></i>
                    </span>
                    <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                        <i className="bi bi-xbox"></i>
                    </span>
                    <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                        <i className="bi bi-nintendo-switch"></i>
                    </span>
                    <span className="badge bg-secondary bg-gradient p-1 border rounded-0 border-dark m-1">
                        <i className="bi bi-android2"></i>
                    </span>
                </div>
            </div>
            <div className="card-footer border-top-0 mt-2">
                <div className='row'>
                    <div className='col-6 m-0 p-0'>
                        <button className="btn btn-lg btn-outline-danger border-0 text-light bg-gradient rounded-0 d-flex justify-content-end"><i className="bi bi-trash"></i></button>
                    </div>
                    <div className='col-6 m-0 p-0 d-flex d-flex justify-content-end'>
                        <button className="shadow btn btn-lg btn-success bg-gradient rounded-0 "><i className="bi bi-check-lg"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default ListedCard;