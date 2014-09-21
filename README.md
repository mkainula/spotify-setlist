spotify-setlist
===============

Generate a Spotify playlist from your favorite artist's latest setlists. Uses Setlist.fm API to search for artists and setlists and Spotify Metadata API to fetch the Spotify track ID for each song in the setlist.

## Tech stack ##
* Node.js for the webapp
* async for fetching the data
* Jade for templates and CSS

## Running ##
The webapp requires some node.js packages that can be installed using 
	
	npm install
	
The webapp can be run using
	
	node app.js
	
By default, the application runs on port 3000, so you can try it out at
	
	http://localhost:3000
	
Live version of the webapp can be found at http://spotify-setlist.herokuapp.com

## TODO ##
The current version is basically in a PoC phase, so there are still loads of features to be implemented, for example:
* Filtering the results from Spotify Metadata API to contain only songs by the artist we're searching for
* Better error handling
* Support for encores (well, this should be pretty straightforward since it's just a second setlist)
* Design and implement a proper frontend
