
# TUNE-SWAP

Ever wanted a brand new playlist made from scratch well look no furter this app allows you to create a completely random playlist based of a genre to which you can transfer to your spotify account. See a song you dont like just DELETE it using the buttons underneath the song. 


BUGS
- only one person may sign in at a time we are working on a fix
- you wont be able to modify playist once in spotify
- only allowed one genre per playlist
- you may run into a bug where you are unable to delete a specific song or clear the playlist by hitting send to spotify if this occurs it means one of two things there are to many users OR the server is being throttled in which case you should shut both terminals down and restart them and sign in again










## Authors
- [@natdagr85](https://github.com/natdagr85)
- [@alexisIvanAvila](https://github.com/alexisIvanAvila)
- [@Ezequiel Capaceta](https://github.com/ezequiel-capaceta)
- [@alanLherrera](https://github.com/alanLherrera)


## Demo
INSTRUCTORS
in order to see the best of this application you must folow these steps

STEP 1
create a .env file globally
copy and paste the provided .env information into said file

STEP 2
via this email "alanherrera06@gmail.com" send your spotify email address so we can authenticate you as a user while still in development.

STEP 3
Once completed open a new terminal and type in 
(nodemon back-end/index.js) first then open another terminal in VScode type in 
(npm start) this will ensure that the app is on the right port

STEP 4
if your email has been recieved click on the sign in button it will redirect you to spotify and log you in 

STEP 5
click on create playlist button on the homepage or click on generate on the navbar
select the desired genre and once the songs have loaded you can press SEND TO SPOTIFY once you do press the button open your spotify in a seperate tab and the playlist you generated should be named tune-swap. you can remove specific undesirable songs if you wish.



## Features

- CREATE a new playlist thats randomized via a genre
- READ each song youve just generated
- UPDATE your playlist by modifying the songs within
- Delete by removing any song you dont want



## API Reference
Spotify api
#### Authenticates Spotify developer Logn-In via Access Token & Refresh Token

```http
  GET /api/sign-in
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` |  Your API key |

#### Create a playlist

```http
  POST /generate
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cors`      | `array` |  genrates random playlist|






## Documentation

[Documentation](https://github.com/thelinmichael/spotify-web-api-node)
[Documentation](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)



## Roadmap

Future Patches

allowing more then one sign in 

allowing multiple genres to be added to one playlist

a clear all function for easier use

support for apple music


