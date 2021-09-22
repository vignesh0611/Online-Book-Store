function carousel(){
    return(
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://d2g9wbak88g7ch.cloudfront.net/bannerimages/38_inr.png" className="d-block w-100" alt="image1"/>
            </div>
            <div className="carousel-item">
              <img src="https://d2g9wbak88g7ch.cloudfront.net/bannerimages/39_inr.png" className="d-block w-100" alt="image2"/>
            </div>
            <div className="carousel-item">
              <img src="https://d2g9wbak88g7ch.cloudfront.net/bannerimages/40_inr.png" className="d-block w-100" alt="image3"/>
            </div>
            <div className="carousel-item">
              <img src="https://d2g9wbak88g7ch.cloudfront.net/bannerimages/41_inr.png" className="d-block w-100" alt="image3"/>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
    )
}
export default carousel