function AddCard(props) {
    return (
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
                    </div>
                    <div className='col-6 m-0 p-0 d-flex d-flex justify-content-end'>
                        <button class="shadow btn btn-lg btn-primary bg-gradient rounded-0 "><i class="bi bi-plus-lg"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default AddCard;