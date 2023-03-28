const express = require('express')
const app = express()
const Spotify = require('spotify-web-api-js')
const port = 3000

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
  redirectUri: 'http://localhost:3000/',
  clientId: 'c6d26137276a4defae105e0f0198d5c3',
  clientSecretId: 'e7871e7e973e4a5a8e94492bb03e7998',
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})