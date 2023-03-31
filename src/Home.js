import { Navbar } from "react-bootstrap"

function Home () {
    return(
        <>
        <div class="header">
        <h1 class="header">This is Tune Swap</h1>
            <h2 class="short-desc">A playlist just for you</h2>
         
        </div>
        <body>
        <div class="container" >
               <div class="item item-1">Small description of how the app works and a link that sends you to the Sign-In page</div>
               <div class="item item-2">The actual generate button</div>
               <div class="item item-3">Music playlist logos</div>
            </div>
        </body>
          
        </>
    )
}

export default Home