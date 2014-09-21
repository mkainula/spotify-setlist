exports.get_setlist = function(req, res) {

	// http://api.setlist.fm/rest/0.1/setlist/3bd6440c.json
	var result = "empty";
	var url = "http://api.setlist.fm/rest/0.1/setlist/" + req.params["id"] + ".json";
	var spotifyIds = [];
	var request = require("request");
	var async = require("async");
	request(url, function(error, response, body) {
		result = JSON.parse(body);
		var setlist = result.setlist.sets.set[0];
		var artist = result.setlist.artist["@name"];
		var venue = result.setlist.venue["@name"];
		var eventDate = result.setlist["@eventDate"];
		var songs = setlist.song;

		async.eachSeries(songs, function(songs, callbacks) { 
			var songName = songs["@name"];
			var spotifyApiUrl = "http://ws.spotify.com/search/1/track.json?q=" + songName;
			var spotifyApiUri = encodeURI(spotifyApiUrl);
			var spotifyId = "error";
			async.series([function(callback) {
				request(spotifyApiUri, function(error, response, body) {
					callback(null, body);
				});
			}], function(err, results) {
				if(results != null && results != '') {
					var parsed = JSON.parse(results || null);
					if(parsed != null) {
						spotifyId = parsed.tracks[0]["href"];
						spotifyIds.push({ "name": songs["@name"], "spotifyId": spotifyId});
						callbacks(null);
					}
				}
				else { 
					console.log("Could not fetch spotify id");
					callbacks(null); 
				}
			});
		}, function(err) { 
			playlistUrl = "spotify:trackset:setlist:";
			for(var i in spotifyIds) {
				parts = spotifyIds[i]["spotifyId"].split(':');
				playlistUrl = playlistUrl + "," + parts[2];
			}
			res.render('setlist', { artist: artist, venue: venue, eventDate: eventDate, results: setlist, spotifyIds: spotifyIds, playlistUrl: playlistUrl });
		});
});
}
