import { Card, Button } from "react-bootstrap"

function SignIn () {
    return(
        <div className="signIn">
            <h1>Sign-In Page</h1>
            <br></br>
            <Card className="navCard">
                <Card.Body>
                    <Card.Title className="cardTitle">Sign in to Spotify</Card.Title>
                    <Card.Body>
                        <Card.Text>In order to use this application, we are required to have you sign in with Spotify</Card.Text>
                        <br></br>
                        <Button variant="success">Sign-in</Button>{' '}
                        <br></br>
                        <br></br>
                        <Card.Link className="createAcc" target="_blank" rel="noopener noreferrer" href='https://www.spotify.com/us/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2F'>Create Spotify account here</Card.Link>
                    </Card.Body>
                </Card.Body>
            </Card>
        </div>
    )
}

export default SignIn