
import { Navbar } from "react-bootstrap"


import Button from 'react-bootstrap/Button'

import { useNavigate } from "react-router-dom";


function Home () {
    const navigate = useNavigate()

    function handleClick() {
    navigate("/features");
    }
    
    return(
        <>
        <div className="header">
        <h1 className="header">This is Tune Swap</h1>
            <h2 className="short-desc">A playlist just for you</h2>
            <img  src={mainLogo} alt="fireSpot"/>
        </div>
        <body>
        <div className="container" >
               <div className="item item-1">Welcome to Tune-Swap! here you can generate a playlist and copy it into your spotify account. Please Select a Genre to get started.</div>
               <div className="item item-2 justify-content-center"><Button href={'/generate'}class="btn btn-success btn-lg btn" type="button" >Generate</Button></div>
               <div className="item item-3">Music playlist logos</div>
            </div>
        </body>
          
        </>
    )
}

export default Home