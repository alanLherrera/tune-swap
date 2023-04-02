const express = require('express')
let cors = require('cors')
const app = express()
const dotenv = require('dotenv').config()
const Spotify = require('spotify-web-api-node')
const port = 3000
let signedIn = '0'
let userId = ''
//const { Pool } = require['pg'];
const db = require('../config/db')
const testDbConnection = require('../config/db')

console.log(testDbConnection)

// copied from sotify documentation
const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];

const spotifyApi = new Spotify({
  redirectUri: 'http://localhost:3000/callback',
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
});

app.get('/api/sign-in', (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
})

app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error){
    console.error('Callback Error:', error);
    res.send(`'Callback Error:' ${error}`);
    return;
  }



//taken from github repo
spotifyApi
    .authorizationCodeGrant(code)
    //allows for token refresh
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log('access_token:', access_token);
      console.log('refresh_token:', refresh_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );
      signedIn = '1'
      res.redirect('http://localhost:3001');

      spotifyApi.getMe().then(req => {
        userId = req.body.id
      })


      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);
        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);
    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
});




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/api/isloggedin', cors(), (req,res) => {
  res.send([signedIn, userId])
})

app.get('/api/logout', cors(), (req, res) => {
  signedIn = '0'
})