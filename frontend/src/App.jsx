 
import './App.css'
import {Routes, Route} from "react-router-dom"
import MultiForm from './components/MultiForm'
import Home from './components/Home'
import GetData from './Testing/GetData'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import SignUp from './components/SignUp'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="pt-20 pb-12">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/info" element={<MultiForm />}/>
          <Route path="/test" element={<GetData />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
