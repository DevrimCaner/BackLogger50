function Alertbox(props) {
    return (
        <div className='row flex-row-reverse'>        
            <div className='col-sm-8 col-md-6 col-lg-4 col-xxl-3 '>
                <div data-bs-theme="dark" className={`w-100 mt-3 alert alert-${props.type} alert-dismissible bg-dark bg-opacity-75 text-${props.type} border border-${props.type} rounded-0`} role="alert">
                {props.message}
                <button type="button" className="btn-close rounded-0" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
          </div>
    );
  }
  
  export default Alertbox;