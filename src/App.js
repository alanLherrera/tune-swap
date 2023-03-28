import './App.css';
import NavBar from './NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Features from './Features';
import SignIn from './signin';

function App() {
  return (

    <BrowserRouter>
    <div className="App">
      <NavBar />
      {/* <h1>This is Tune-Swap</h1> */}
    <Routes>
    <Route exact path="/home" element={
            <div> AAA </div>}/>
    <Route exact path="/*" element={
      <h1>This is Tune-Swap</h1>}/>
    <Route exact path="/features" element={
      <Features />
    } />
    <Route exact path="/sign-in" element={
      <SignIn/>}/>
    </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
