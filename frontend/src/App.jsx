 
import './App.css'
import {Routes, Route} from "react-router-dom"
import MultiForm from './components/MultiForm'
import ProfessionalHome from './components/ProfessionalHome'
 
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
 
import TemplatesGallery from './components/TemplatesGallery'
 
import DashboardLayout from './layouts/DashboardLayout'
import AllResumes from './components/DashboardSection/AllResumes'
import CoverLetters from './components/DashboardSection/CoverLetters'
import Profile from './components/DashboardSection/Profile'
import TemplateShowcase from './components/TemplateShowCase'
import MultiStepForm from './components/MultiStepForm/MultiStepForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="pt-20 pb-12">
        <Routes>
          <Route path="/" element={<ProfessionalHome />}/>
          <Route path="/info" element={<MultiForm />}/>
        
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/pricing" element={<Pricing />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/templates" element={<TemplatesGallery />} />
          <Route path="/Dashboard" element={<DashboardLayout />}>
            <Route index element={<AllResumes />} />
            <Route path="coverletters" element={<CoverLetters />} />
            <Route path="profile" element={<Profile />} />
            <Route path="createresume" element={<MultiStepForm />} />
            <Route path="templates" element={<TemplatesGallery />} />
            </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
