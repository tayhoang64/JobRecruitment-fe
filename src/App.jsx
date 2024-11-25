import Header from './components/Header'
import "./assets/css/bootstrap.min.css";
import "./assets/fonts/font-awesome.min.css";
import "./assets/fonts/simple-line-icons.css";
import "./assets/css/slicknav.css";
import "./assets/css/nivo-lightbox.css";
import "./assets/css/animate.css";
import "./assets/css/main.css";
import "./assets/css/responsive.css";
import Footer from './components/Footer';
import About from './components/About';
import Service from './components/Service';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Counter from './components/Counter';
import Contact from './components/Contact';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import JobList from './components/JobList';
import JobViewDetail from './components/JobViewDetail';


function App() {

  return (
    <>
      <Router>
        <Routes>

          <Route path='/auth' element={<Auth />} />
          <Route path='/profile' element={
            <>
              <Header offSlide={false} />
              <Profile />
              <Footer />
            </>}
          />
          <Route path='/profile/update' element={
            <>
              <Header offSlide={false} />
              <UpdateProfile />
              <Footer />
            </>}
          />
          <Route path='/jobs' element={
            <>
              <Header offSlide={false} />
              <JobList />
              <Footer />
            </>}
          />
          <Route path='/jobs/:id' element={
            <>
              <Header offSlide={false} />
              <JobViewDetail />
              <Footer />
            </>
          } />

          <Route path='/' element={
            <>
              <Header offSlide={true} />
              <About />
              <Service />
              <Resume />
              <Portfolio />
              <Counter />
              <Contact />
              <Footer />
            </>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
