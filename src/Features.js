import { Button } from "react-bootstrap"
import { useState, useEffect } from "react"


function Features () {

    const [isVisible, setIsVisible] = useState(true)
    let [myArray, setMyArray] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
              const response = await fetch('http://localhost:3000/playlist');
              const data = await response.json();
              let newData = Object.entries(data)
            //   console.log(newData)
              setMyArray(newData);
            //   console.log(myArray)
            } catch (error) {
              console.error(error);
            }
          }
          fetchData();
        }, []);

    useEffect(() => {
        // function logger (){
            console.log(myArray)
        // }
        // logger()
    })

    let genres = [
        "acoustic",
        "blues",
        "children",
        "chill",
        "classical",
        "club",
        "country",
        "dance",
        "disco",
        "disney",
        "dubstep",
        "edm",
        "electro",
        "hip-hop",
        "holidays",
        "house",
        "jazz",
        "k-pop",
        "metal",
        "new-release",
        "opera",,
        "party",
        "pop",
        "punk-rock"
    ]

    function buttonClick (text) {
        return async () => {
            let selectedGenre = await fetch(`http://localhost:3000/generate?genre=${text}`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Access-Control-Allow-Origin':'*'
                }
              })
              selectedGenre = await selectedGenre.json()
            console.log(selectedGenre[0])
            window.location.reload(false)
            //map over array to display and style the songs going into playlist
            setIsVisible(false);
        }
    }


    async function send  () {
        await fetch('http://localhost:3000/sender', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*'
            }
        })
    }

    genres = genres.map((text) => {
        return <Button className="genreButton" onClick={buttonClick(text)}>{text}</Button>
    })

    async function destroy (name) {
        let song = await fetch(`http://localhost:3000/delete?name=${name}`,{
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        song = await song
            window.location.reload(false)
    }
    

    return(
        <>
        <div>
            {isVisible && <div className="genre">{genres}</div>}
            <div className="pl"> <h1>Current Playlist</h1> </div>
            <div className="songs">
            {myArray.map((item)=>{
                console.log(item[1]['songName'])
            return (
              <div key={item.id}>{item[1]['songName']}<div><Button className="remove-button" onClick={() => {destroy(item[1]['songName'])}}>Remove</Button></div></div>
            )
          })}
            </div>
            <div className="send-button">
            <Button variant='success' onClick={send}>SEND TO SPOTIFY</Button>
            </div>
        </div>
        </>
    )
}

export default Features