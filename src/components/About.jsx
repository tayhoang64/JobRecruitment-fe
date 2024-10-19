import React from 'react'
import about1 from '../assets/img/about/about-1.jpg';

const About = () => {
  return (
    <>
    <section id="about" className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div className="img-thumb wow fadeInLeft" data-wow-delay="0.3s">
              <img className="img-fluid" src={about1} />
            </div>
          </div> 
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div className="profile-wrapper wow fadeInRight" data-wow-delay="0.3s">
              <h3>Hi Guys!</h3>
              <p>Est diam venenatis arcu lacus ad. Duis quis eros. Cursus et rutrum eleifend sollicitudin lacinia justo id turpis. Nec convallis integer. Odio eget duis. Nulla aenean et. Blandit varius sollicitudin. Pellentesque leo primis neque urna magnis. Elit ut sollicitudin. Et est a nam dolores eget itaque sagittis et parturient duis est eleifend sociis rutrum odio viverra integer.</p>
              <div className="about-profile">
                <ul className="admin-profile">
                  <li><span className="pro-title"> Name </span> <span className="pro-detail">Tom Saulnier</span></li>
                  <li><span className="pro-title"> Age </span> <span className="pro-detail">25 Years</span></li>
                  <li><span className="pro-title"> Experience </span> <span className="pro-detail">4 Years</span></li>
                  <li><span className="pro-title"> Country </span> <span className="pro-detail">USA</span></li>
                  <li><span className="pro-title"> Location </span> <span className="pro-detail">San Francisco, CA</span></li>
                  <li><span className="pro-title"> e-mail </span> <span className="pro-detail">email@example.com</span></li>
                  <li><span className="pro-title"> Phone </span> <span className="pro-detail">+ (00) 123 456 789</span></li>
                  <li><span className="pro-title"> Freelance </span> <span className="pro-detail">Available</span></li>
                </ul>
              </div>
              <a href="#" className="btn btn-common"><i className="icon-paper-clip"></i> Download Resume</a>
              <a href="#" className="btn btn-danger"><i className="icon-speech"></i> Contact Me</a>
            </div>
          </div>   
        </div>
      </div>
    </section>
    </>
  )
}

export default About