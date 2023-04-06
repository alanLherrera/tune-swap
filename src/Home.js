import { Navbar } from "react-bootstrap"

function Home () {
    return(
        <>
        <div className="header">
        <h1 className="header">This is Tune Swap</h1>
            <h2 className="short-desc">A playlist just for you</h2>
         
        </div>
        <body>
        <div className="container" >
               <div className="item item-1">Small description of how the app works and a link that sends you to the Sign-In page</div>
               <div className="item item-2">The actual generate button</div>
               <div className="item item-3">Music playlist logos</div>
            </div>
        </body>
          
        </>
    )
}

export default Home