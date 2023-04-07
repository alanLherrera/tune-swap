const express = require('express')
let cors = require('cors')
const app = express()
var sequelizeRouter = require('sequelize-router');
app.use(express.json());
const dotenv = require('dotenv').config({path:'../.env'})
const Spotify = require('spotify-web-api-node')
const port = 3000
let signedIn = '0'
let userId = ''
const db = require('../config/db')
const { Pool } = require('pg')
const Playlist = require('../models/playlist')
const Users = require('../models/log-in')
let playlistName = 'tune-swap'

db.testDbConnection()

app.use('/api', sequelizeRouter(Playlist)); 
app.use('/api', sequelizeRouter(Users));


// copied from spotify documentation
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

//This is where we are authenticating our Spotify Devloper Log-In via Access Token and Refresh Token
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

//This endpoint generates playlist from spotify via genre

//TODO MAKE SURE TO STORE TRACK HASH (id) IN DB
app.post('/generate', async (req, res) => {
 let generate = await spotifyApi.getRecommendations({'seed_genres': ['hip-hop']})

generate = generate['body']['tracks']

 for (let i = 0; i < generate.length; i++){
  await Playlist.create({playlistName: playlistName, songName: generate[i]['name'], songHash: generate[i]['id']})
  }
  
 res.send(generate)

});

//this will be the api end point where we send off to spotify

app.post('/sender', async (req,res) => {
  
  const getPlaylist = await Playlist.findAll({ where: { playlistName: playlistName } });

  let playlist = ''
  
  if(getPlaylist.length > 0 && getPlaylist[0].playlistHash !== '' && getPlaylist[0].playlistHash !== null) {
    playlist = getPlaylist[0].playlistHash
  } else {
    playlist = await spotifyApi.createPlaylist(userId, playlistName, { 'public' : true })
    playlist = playlist['body']['id']
  }
 
  console.log(playlist)

  let tracks = getPlaylist.map(track => `spotify:track:${track.songHash}`)
  //put this in in the DB
  // tracks = JSON.stringify(tracks)

  await spotifyApi.addTracksToPlaylist(playlist, tracks)
  // console.log(playlist['body']['id'])

  await Playlist.update({playlistHash: playlist}, { where: { playlistName: playlistName } })

  res.sendStatus(201)
})

//API end point that creates playlist with or without songs
app.post('/playlist', async (req, res) => {
  try {
    const { playlist } = req.body;
    let song = ''
    if ('song' in req.body) {
      song = req.body.song
    }
    const newPlaylist = await Playlist.create({playlistName: playlist, songName: song})

    res.sendStatus(201)
    
  }catch (err){
    console.log(err.message)
  }
})

//API endpoint that retrieves playlist from DB
//IMPORTANT: must use in /playlist?name='WHATEVER ITS CALLED'
app.get('/playlist', async (req, res) => {
  try{
    const getPlaylist = await Playlist.findAll({ where: { playlistName: req.query.name } });
    res.json(getPlaylist)
  }
 catch (err){
  console.log(err)
 }
})

//API Endpoint that updates the name of the Playlist
//IMPORTANT: must use /playlist/:id?name='WHATEVER ITS CALLED'
app.put('/playlist/:id', async (req, res) => {
  try{

    await Playlist.update({playlistName: req.query.name}, { where: { id: req.params.id } })

    res.sendStatus(204)

  }catch (err){
    console.log(err)
  }
})


//API Endpoint that deletes selected playlist by name
//IMPORTANT: must use with /playlist/?name='WHATEVER IT IS'
app.delete('/playlist', async (req,res) => {
  try{
    await Playlist.destroy({ where: { playlistName: req.query.name } })

    res.sendStatus(204)

  }catch (err){
    console.log(err)
  }
})

app.get('/getgenre', async (req, res) => {
  let genre = await spotifyApi.getAvailableGenreSeeds()
  res.send(genre)
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