const Spotify = require('spotify-web-api-js')

const spotifyApi = new Spotify();
spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);

(async () => {
  const user = await spotifyApi.getUser();
  console.log(user);

})().catch(e => {
  console.error(e);
})