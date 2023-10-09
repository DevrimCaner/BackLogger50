/*
0 = Listed
1 = Complated
2 = Search / Add
*/
function Card(props) {
    return (
    <div className={props.type == 2 ? ('col-sm-6 col-md-4 col-lg-3'):('col-lg-6')} >
        <div className={`w-100 card m-0 mb-3 p-0 bg-dark bg-gradient text-light shadow rounded-0 border ${props.type == 0 && ('border-success')} ${props.type == 1 && ('border-secondary bg-opacity-50')} ${props.type == 2 && ('border-primary')}`} >
            <div className='card-header p-0 border-bottom-0'>
                    <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${props.game.cover}.png`} className={`img-fluid rounded-0 w-100 ${props.type == 1 && ('opacity-50')}`}/>
            </div>
            <div className="card-body p-0 px-2 pt-1">
                <h4 className={`card-title mb-0 ${props.type == 1 && ('opacity-75')}`}>{props.game.name}</h4>
                <h5 className={`card-text text-secondary fst-italic m-0 fs-6 ${props.type == 1 && ('opacity-75')}`}>10 11 2020</h5>
                <div className={`card-text mt-2 ${props.type == 1 && ('opacity-75')}`}>
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
                        {props.type != 2 && (
                            <button className="btn btn-lg btn-outline-danger border-0 text-light bg-gradient rounded-0 d-flex justify-content-end"><i className="bi bi-trash"></i></button>
                        )}
                    </div>
                    <div className='col-6 m-0 p-0 d-flex d-flex justify-content-end'>
                        {props.type == 0 && (
                            <button className="shadow btn btn-lg btn-success bg-gradient rounded-0 "><i className="bi bi-check-lg"></i></button>
                        )}
                        {props.type == 1 && (
                            <button className="shadow btn btn-lg btn-secondary bg-gradient rounded-0 "><i className="bi bi-arrow-counterclockwise"></i></button>
                        )}
                        {props.type == 2 && (
                            <button className="shadow btn btn-lg btn-primary bg-gradient rounded-0 "><i className="bi bi-plus-lg"></i></button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default Card;