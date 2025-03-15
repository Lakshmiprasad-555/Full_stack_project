import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login"
import Home from "./Home"
import forgot from './forgot';
import Signup from "./Signup"
import Editinguser from './Editinguser';
import Contactupdating from './contactupdate';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<forgot />} />
        <Route path='/Editing/:id'  element={<Editinguser/>}/>
        <Route path='/updating/:id'  element={<Contactupdating/>}/>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
