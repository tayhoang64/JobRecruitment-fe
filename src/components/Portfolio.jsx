import React from 'react'

const Portfolio = () => {
  return (
    <>
      <section id="portfolios" className="section-padding">
        <div className="container">        
          <h2 className="section-title wow flipInX" data-wow-delay="0.4s">My Remarkable Works</h2>
          <div className="row">          
            <div className="col-md-12">
              <div className="controls text-center">
                <a className="filter active btn btn-common" data-filter="all">
                  All 
                </a>
                <a className="filter btn btn-common" data-filter=".design">
                  Design 
                </a>
                <a className="filter btn btn-common" data-filter=".development">
                  Development
                </a>
                <a className="filter btn btn-common" data-filter=".print">
                  Print 
                </a>
              </div>
            </div>

            <div id="portfolio" className="row wow fadeInDown" data-wow-delay="0.4s">
              <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4 mix development print">
                <div className="portfolio-item">
                  <div className="shot-item">
                    <img src="assets/img/gallery/img-1.jpg" alt="" />  
                    <div className="overlay">
                      <div className="icons">
                        <a className="lightbox preview" href="assets/img/gallery/img-1.jpg">
                          <i className="icon-eye"></i>
                        </a>
                        <a className="link" href="#">
                          <i className="icon-link"></i>
                        </a>
                      </div>
                    </div>
                  </div>               
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4 mix design print">
                <div className="portfolio-item">
                  <div className="shot-item">
                    <img src="assets/img/gallery/img-2.jpg" alt=""/> 
                    <div className="overlay">
                      <div className="icons">
                        <a className="lightbox preview" href="assets/img/gallery/img-2.jpg">
                          <i className="icon-eye"></i>
                        </a>
                        <a className="link" href="#">
                          <i className="icon-link"></i>
                        </a>
                      </div>
                    </div>
                  </div>               
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4 mix development">
                <div className="portfolio-item">
                  <div className="shot-item">
                    <img src="assets/img/gallery/img-3.jpg" alt=""/> 
                    <div className="overlay">
                      <div className="icons">
                        <a className="lightbox preview" href="assets/img/gallery/img-3.jpg">
                          <i className="icon-eye"></i>
                        </a>
                        <a className="link" href="#">
                          <i className="icon-link"></i>
                        </a>
                      </div>
                    </div>
                  </div>               
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4 mix development design">
                <div className="portfolio-item">
                  <div className="shot-item">
                    <img src="assets/img/gallery/img-4.jpg" alt="" /> 
                    <div className="overlay">
                      <div className="icons">
                        <a className="lightbox preview" href="assets/img/gallery/img-4.jpg">
                          <i className="icon-eye"></i>
                        </a>
                        <a className="link" href="#">
                          <i className="icon-link"></i>
                        </a>
                      </div>
                    </div>
                  </div>               
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4 mix development">
                <div className="portfolio-item">
                  <div className="shot-item">
                    <img src="assets/img/gallery/img-5.jpg" alt="" /> 
                    <div className="overlay">
                      <div className="icons">
                        <a className="lightbox preview" href="assets/img/gallery/img-5.jpg">
                          <i className="icon-eye"></i>
                        </a>
                        <a className="link" href="#">
                          <i className="icon-link"></i>
                        </a>
                      </div>
                    </div>
                  </div>               
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4 mix print design">
                <div className="portfolio-item">
                  <div className="shot-item">
                    <img src="assets/img/gallery/img-6.jpg" alt=""/>
                    <div className="overlay">
                      <div className="icons">
                        <a className="lightbox preview" href="assets/img/gallery/img-6.jpg">
                          <i className="icon-eye"></i>
                        </a>
                        <a className="link" href="#">
                          <i className="icon-link"></i>
                        </a>
                      </div>
                    </div>
                  </div>               
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Portfolio
