import React from 'react'

const Contact = () => {
  return (
    <>
    <section id="contact" className="section-padding">      
      <div className="contact-form">
        <div className="container">
          <div className="row contact-form-area wow fadeInUp" data-wow-delay="0.4s">          
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div className="contact-block">
                <h2>Contact Form</h2><br />
                <div className="text-center">
                  <h2>You are using Free Version</h2>
                  <h4>Please, purchase full version to get all features and pages</h4><br />
                  <b>Including:</b>
                  <p>- 2 Homepage Variations</p>
                  <p>- All Elements and Features</p>
                  <p>- Amazing Slider</p>
                  <p>- Documentation File</p>
                  <p>- Quick Support</p>
                  <p>- Permission to Use in Commercial Projects</p>
                  <p>- Footer Credit Removal</p>
                  <p>- SASS Files</p>
                  <br />
                  <a href="http://rebrand.ly/meet-me-ud-purchase" target="_blank" className="btn btn-common btn-lg">Purchase Now</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12">
              <div className="footer-right-area wow fadeIn">
                <h2>Contact Address</h2>
                <div className="footer-right-contact">
                  <div className="single-contact">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker"></i>
                    </div>
                    <p>San Francisco, CA</p>
                  </div>
                  <div className="single-contact">
                    <div className="contact-icon">
                      <i className="fa fa-envelope"></i>
                    </div>
                    <p><a href="mailto:hello@tom.com">hello@tom.com</a></p>
                    <p><a href="mailto:tomsaulnier@gmail.com">tomsaulnier@gmail.com</a></p>
                  </div>
                  <div className="single-contact">
                    <div className="contact-icon">
                      <i className="fa fa-phone"></i>
                    </div>
                    <p><a href="#">+ (00) 123 456 789</a></p>
                    <p><a href="#">+ (00) 123 344 789</a></p>
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

export default Contact