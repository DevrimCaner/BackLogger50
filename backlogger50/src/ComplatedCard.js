function ComplatedCard(props) {
    return (
        <div className='col-lg-4'>
        <div className="w-100 card m-0 mb-3 p-0 bg-dark bg-gradient bg-opacity-50 text-light shadow rounded-0 border border-secondary">
            <div className='card-header p-0 border-bottom-0'>
                    <img src="https://images.igdb.com/igdb/image/upload/t_cover_big/co2ed3.png" className="img-fluid rounded-0 w-100 opacity-50"/>
            </div>
            <div className="card-body p-0 px-2 pt-1">
                <h4 className="card-title mb-0 opacity-75">Assassin's Creed Valhalla</h4>
                <h5 className="card-text text-secondary fst-italic m-0 fs-6 opacity-75">10 11 2020</h5>
                <div className='card-text mt-2 opacity-75'>
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
                        <button class="shadow btn btn-lg btn-secondary bg-gradient rounded-0 "><i class="bi bi-arrow-counterclockwise"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default ComplatedCard;