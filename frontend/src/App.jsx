 
import './App.css'
import {Routes, Route} from "react-router-dom"
import MultiForm from './components/MultiForm'
import Home from './components/Home'
 
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
 
import TemplatesGallery from './components/TemplatesGallery'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="pt-20 pb-12">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/info" element={<MultiForm />}/>
        
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/pricing" element={<Pricing />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/templates" element={<TemplatesGallery />}/>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
