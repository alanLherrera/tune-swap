import './App.css';
import NavBar from './NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Features from './Features';
import SignIn from './signin';
import Home from './Home';

function App() {
  return (

    <BrowserRouter>
    <div className="App">
      <NavBar />
    <Routes>
    <Route exact path="/*" element={<Home />}/>
    <Route exact path="/features" element={<Features />}/>
    <Route exact path="/sign-in" element={<SignIn/>}/>
    </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
