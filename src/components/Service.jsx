import React from 'react'

const Service = () => {
  return (
    <>
      <section id="services" className="services section-padding">
        <h2 className="section-title wow flipInX" data-wow-delay="0.4s">What I do</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3 col-xs-12">
              <div className="services-item wow fadeInDown" data-wow-delay="0.3s">
                <div className="icon">
                  <i className="icon-grid"></i>
                </div>
                <div className="services-content">
                  <h3><a href="#">Front-end Development</a></h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condi.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 col-xs-12">
              <div className="services-item wow fadeInDown" data-wow-delay="0.6s">
                <div className="icon">
                  <i className="icon-layers"></i>
                </div>
                <div className="services-content">
                  <h3><a href="#">Graphic Design</a></h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condi.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 col-xs-12">
              <div className="services-item wow fadeInDown" data-wow-delay="0.9s">
                <div className="icon">
                  <i className="icon-briefcase"></i>
                </div>
                <div className="services-content">
                  <h3><a href="#">Business Branding</a></h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condi.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 col-xs-12">
              <div className="services-item wow fadeInDown" data-wow-delay="1.2s">
                <div className="icon">
                  <i className="icon-bubbles"></i>
                </div>
                <div className="services-content">
                  <h3><a href="#">Consultancy</a></h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Service
