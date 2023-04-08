import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";
import mainLogo from './assets/appLogo.png'

function Home () {
    const navigate = useNavigate()

    function handleClick() {
    navigate("/features");
    }
    
    return(
        <>
        <div className="header">
<<<<<<< HEAD
        <h1 className="header">This is Tune Swap</h1>
            <h2 className="short-desc">A playlist just for you</h2>
            <img src={mainLogo} alt="fireSpot" width={"40%"}/>
            
            
           
=======
            <img  src={mainLogo} alt="fireSpot"/>
>>>>>>> e2bd9c53222d669543c8ba2edeb3fac8c8b45503
        </div>
        <div className="container" >
               <div className="item item-1">Welcome to Tune-Swap! here you can generate a playlist and copy it into your spotify account. Please Sign In to Spotify to get started.</div>
               <div className="item item-2 justify-content-center"><Button className="btn btn-success btn-lg btn" type="button" onClick={handleClick}>Make Your Playlist!</Button></div>
               <div className="item item-3">Music playlist logos</div>
            </div>
          
        </>
    )
}

export default Home