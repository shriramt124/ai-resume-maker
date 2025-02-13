 
import './App.css'
import {Routes, Route} from "react-router-dom"
import MultiForm from './components/MultiForm'
import Home from './components/Home'
function App() {
 

  return (
   <Routes>
    <Route  path="/" element={<Home />}/>
     <Route path="/info" element={<MultiForm />}/>
   </Routes>
  )
}

export default App
