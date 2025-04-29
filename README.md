# 🍰 Cheesecake
[![Build and Deploy Cheesecake client](https://github.com/DanHChampion/Cheesecake/actions/workflows/client_deployment.yml/badge.svg)](https://github.com/DanHChampion/Cheesecake/actions/workflows/client_deployment.yml)
[![Build and Deploy Cheesecake client](https://github.com/DanHChampion/Cheesecake/actions/workflows/server_deployment.yml/badge.svg)](https://github.com/DanHChampion/Cheesecake/actions/workflows/server_deployment.yml)

<p align="center">
  <img style="width:50%" src="docs/cheesecake.png" alt="Cheesecake Logo"/>
</p>

## Description
*Cheesecake* is a web application that allows you to stream your movies and TV shows from your own server. It is designed to be easy to use and set up, with a focus on simplicity and performance. It's my alternative to Plex or Jellyfin! *Cheesecake* is built using the **MERN** stack **(MongoDB, Express.js, React.js, Node.js)** and is designed to be self-hosted.

## Current Features
- **Stream** your movies and TV shows from your own server
- Supports **multiple users**
- **Continue watching** from where you left off
- **Search** for movies and TV shows
- Add movies and TV shows to your **watchlist**
- **Customise displayed images** for movies and TV shows

<br/>

# ✍ Contributing
If you would like to contribute to *Cheesecake*, please fork the repository and create a pull request. We welcome any contributions, whether it's bug fixes, new features, or improvements to the documentation.

Currently, we are looking for contributors to help with the following:
- Customise the application to your liking (in progress)
- Add more features to the application See [issues](https://github.com/DanHChampion/Cheesecake/issues) for more details.
- Usage of Docker to run the application
- Installation guide for Windows, MacOS, and Linux
- Home Server setup & optimisations
- A demo page/video of the application

<br/>

# 📥 Installation Guide

## Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- MongoDB (v5 or higher)

## Clone the repository
```bash
git clone https://github.com/DanHChampion/Cheesecake.git

cd Cheesecake
```
## Install dependencies
```bash
cd client
npm install

cd ../server
npm install
```

## Set up the environment variables
```bash
cd client
cp .env.example .env

cd ../server
cp .env.example .env
```

### Client .env variables
`REACT_APP_BACKEND_URL`
- This is the URL of the server. If you are running the server locally, this should be `http://localhost:5000`.
- If you are running the server on a different port, update this variable to match the port.

`REACT_APP_TMDB_API_KEY`
- This is the API key for The Movie Database (TMDB). You can get a free API key by signing up at [TMDB](https://www.themoviedb.org/).
- This is only used when fetching movie and TV show data from TMDB. If you are using your own movie and TV show data, you can leave this variable blank.

`REACT_APP_USE_TMDB_API`
- This is a boolean value that determines whether to use the TMDB API or not. If you are using your own movie and TV show data, set this variable to `false` or `0`.

`HOST`
- This is the host of the client. If you are running the client locally, this should be `localhost` or `0.0.0.0`.

### Server .env variables
`DATABASE_URL`
- This is the connection string for your MongoDB database. You can use a local MongoDB instance or a cloud-based MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- If you are using a local MongoDB instance, this should be `mongodb://localhost:27017/cheesecake`.

`VIDEODIR`
- This is the directory where your movies and TV shows are stored. The server will scan this directory for video files and add them to the database.
- This should be an absolute path to the directory. For example, `/home/user/videos` or `C:\Users\User\Videos`.
- **The sturcture of the directory should be as follows:**
```
📁 <main_directory>
  📁 Movies
    📁 <movie_name>
      📄 <movie_name>.mp4
    ...
  📁 Series
    📁 <series_name>
      📁 <season_name>
        📄 <episode_name>.mp4
        ...
      ...
    ...

# Example:
📁 MyVideos
  📁 Movies
    📁 The Matrix (1999)
      📄 The Matrix (1999).mp4
    📁 The Matrix Reloaded (2003)
      📄 The Matrix Reloaded (2003).mp4
    ...
  📁 Series
    📁 The Office (US)
      📁 Season 1
        📄 The Office (US) - S01E01 - Pilot.mp4
        📄 The Office (US) - S01E02 - Diversity Day.mp4
        ...
      📁 Season 2
        📄 The Office (US) - S02E01 - The Dundies.mp4
        📄 The Office (US) - S02E02 - Office Olympics.mp4
        ...
      ...
    ...
```
`PORT`
- This is the port that the server will run on. If you are running the server locally, this should be `5000`.
- If you are running the server on a different port, update this variable to match the port.

`ALLOWED_ORIGINS`
- This is a comma-separated list of allowed origins for CORS.
- If you are running the client and server on different domains, update this variable to match the domain of the client. For example, `http://localhost:3000`.

## Running the application
To run the application, you need to start both the client and the server. You can do this by running the following commands in separate terminal windows:
```bash
cd client
npm start
```
```bash
cd server
npm start
```

## 🎬 Enjoy your movies and series! 📺


