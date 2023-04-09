import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";
import mainLogo from './assets/appLogo.png'

function Home () {
    const navigate = useNavigate()

    function handleClick() {
    navigate("/features");
    }
    
    return(
        <div>
            <div className="header">
                <img  src={mainLogo} alt="fireSpot" className='img'/>
            </div>
            <div className="test" >
               <div className="item item-1">Welcome to Tune-Swap! here you can generate a playlist and copy it into your spotify account. Please Sign In to Spotify to get started.</div>
               <div className="item item-2 justify-content-center"><Button className="homeBttn" type="button" onClick={handleClick}>Make Your Playlist!</Button></div>
            </div>
          
        </div>
    )
}

export default Home