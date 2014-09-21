exports.search_artist = function(req, res) {

	// http://api.setlist.fm/rest/0.1/search/artists.json?artistName=%22Dream%20Theater%22
	var results = [];
	var name = req.params["name"];
	if(name == null) {
		name = req.body.name;
	}
	var url = "http://api.setlist.fm/rest/0.1/search/setlists.json?artistName=" + name;
	var request = require("request");
	var async = require("async");
	request(url, function(error, response, body) {
		data = JSON.parse(body);
		var setlist = data.setlists.setlist;

		async.eachSeries(setlist, function(setlist, callback) {
			var id = setlist["@id"];
			var eventDate = setlist["@eventDate"];
			var venue = setlist["venue"];
			var venueName = venue["@name"];
			var artist = setlist["artist"]
			var artistName = artist["@name"];
			var setlistInfo = { "id": id, "eventDate":eventDate, "venue":venue, "venueName":venueName, "artist":artist, "artistName":artistName };
			results.push(setlistInfo);
			callback(null);
		},
		function(err) {
			res.render('search', { name: name, results: results });
		});
	});
}
