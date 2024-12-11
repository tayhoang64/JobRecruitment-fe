import Header from "./components/Header";
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
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Profile from './components/Profile';
import TemplateList from './components/TemplateList';
import UpdateProfile from './components/UpdateProfile';
import JobList from './components/JobList';
import JobViewDetail from './components/JobViewDetail';
import Dashboard from './components/Dashboard';
import JobDetailsForm from './components/CompanyAdd';
import CompanyAdd from './components/CompanyAdd';
import TemplateDB from './components/TemplateDB';
import ProtectedRoute from './components/ProtectedRoute';
import isAdmin from './utils/isAdmin';
import isCVDecorator from './utils/isCVDecorator';
import AddJobForm from './components/JobAdd';
import isContentCreator from './utils/isContentCreator';
import UpdateJobForm from './components/JobUpdate';
import CompanyViewDetail from './components/CompanyDetail';
import isCompanyOwner from './utils/isCompanyOwner';
import OwnCompanies from './components/OwnCompanies';
import CompanyUpdate from './components/CompanyUpdate';
import EditCV from "./components/EditCV";
import TemplateBDAdd from "./components/TemplateDBAdd";
import TemplateBDUpdate from "./components/TemplateDBUpdate";
import Certificates from "./components/Certificates";
import CertificateAddForm from "./components/AddCertificates";
import CertificateEditForm from "./components/EditCertificate";
import SavedCV from "./components/SavedCV";
import isLogin from "./utils/isLogin";
import OurCompaniesCC from "./components/OurCompaniesCC";
import isContentCreatorWithoutCompanyId from "./utils/isContentCreatorWithoutCompanyId";
import JobListCC from "./components/JobListCC";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/company/own' element={
            <ProtectedRoute checkPermission={isCompanyOwner} redirectPath="/">
            <Header offSlide={false} />
            <OwnCompanies />
            <Footer />
          </ProtectedRoute>
          } />

          <Route path='/auth' element={<Auth />} />
          <Route path='/profile' element={
            <>
              <Header offSlide={false} />
              <Profile />
              <Footer />
            </>}
          />
          <Route path='/templates' element={
            <>
              <Header offSlide={false} />
              <TemplateList />
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
          <Route path='/company/:id' element={
            <>
              <Header offSlide={false} />
              <CompanyViewDetail />
              <Footer />
            </>
          } />

          <Route path='/company/update/:id' element={
            <>
              <Header offSlide={false} />
              <CompanyUpdate />
              <Footer />
            </>
          } />

         

          <Route path='/company/:companyId/jobs/update/:id' element={
            <ProtectedRoute checkPermission={isContentCreator} redirectPath="/">
              <Header offSlide={false} />
              <UpdateJobForm />
              <Footer />
            </ProtectedRoute>}
          />
          
          <Route path='/job-management' element={
            <ProtectedRoute checkPermission={isContentCreatorWithoutCompanyId} redirectPath="/">
              <Header offSlide={false} />
              <OurCompaniesCC />
              <Footer />
            </ProtectedRoute>}
          />

          <Route path='/job-management/:id' element={
            <ProtectedRoute checkPermission={isContentCreatorWithoutCompanyId} redirectPath="/">
              <Header offSlide={false} />
              <JobListCC />
              <Footer />
            </ProtectedRoute>}
          />

          <Route path='/company/:companyId/jobs/create' element={
            <ProtectedRoute checkPermission={isContentCreator} redirectPath="/">
              <Header offSlide={false} />
              <AddJobForm />
              <Footer />
            </ProtectedRoute>}
            />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/profile"
            element={
              <>
                <Header offSlide={false} />
                <Profile />
                <Footer />
              </>
            }
          />

          <Route
            path="/templates"
            element={
              <>
                <Header offSlide={false} />
                <TemplateList />
                <Footer />
              </>
            }
          />
          <Route
            path="/certificates"
            element={
              <>
                <Header offSlide={false} />
                <Certificates />
                <Footer />
              </>
            }
          />
          <Route
            path="/certificates/add"
            element={
              <>
                <Header offSlide={false} />
                <CertificateAddForm />
                <Footer />
              </>
            }
          />
          <Route
            path="/certificates/update/:id"
            element={
              <>
                <Header offSlide={false} />
                <CertificateEditForm />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile/update"
            element={
              <>
                <Header offSlide={false} />
                <UpdateProfile />
                <Footer />
              </>
            }
          />
          <Route
            path="/jobs"
            element={
              <>
                <Header offSlide={false} />
                <JobList />
                <Footer />
              </>
            }
          />

          <Route
            path="/jobs/:id"
            element={
              <>
                <Header offSlide={false} />
                <JobViewDetail />
                
                <Footer />
              </>
            }
          />
          <Route
            path="/company/:id"
            element={
              <>
                <Header offSlide={false} />
                <CompanyViewDetail />
                <Footer />
              </>
            }
          />

          <Route
            path="/company/:companyId/jobs/update/:id"
            element={
              <ProtectedRoute
                checkPermission={isContentCreator}
                redirectPath="/"
              >
                <Header offSlide={false} />
                <UpdateJobForm />
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/company/:companyId/jobs/create"
            element={
              <ProtectedRoute
                checkPermission={isContentCreator}
                redirectPath="/"
              >
                <Header offSlide={false} />
                <AddJobForm />
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/company/signup"
            element={
              <>
                <Header offSlide={false} />
                <CompanyAdd />
                <Footer />
              </>
            }
          />

          <Route
            path="/edit/:type/:id"
            element={
              <>
                <Header offSlide={false} />
                <EditCV />
                <Footer />
              </>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute checkPermission={isAdmin} redirectPath="/">
                <Dashboard />
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved"
            element={
              <ProtectedRoute checkPermission={isLogin} redirectPath="/auth">
                <Header />
                <SavedCV />
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/template/update/:id"
            element={
              <ProtectedRoute checkPermission={isCVDecorator} redirectPath="/">
                <Header offSlide={false} />
                <TemplateBDUpdate />
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/template/add"
            element={
              <ProtectedRoute checkPermission={isCVDecorator} redirectPath="/">
                <Header offSlide={false} />
                <TemplateBDAdd />
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/template"
            element={
              <ProtectedRoute checkPermission={isCVDecorator} redirectPath="/">
                <Header offSlide={false} />
                <TemplateDB />
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
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
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
