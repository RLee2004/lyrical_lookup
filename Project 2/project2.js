let last_fm_key = "0222fd29f0f4049d5b560b08d3271fdb";
function get_lyrics(json) {
	$(".output-container, .info-container").css("display", "grid")
    json.lyrics = json.lyrics.replace(/.*chanson/, "");
    json.lyrics = json.lyrics.replace(/par/, "by");
    json.lyrics = json.lyrics.replace(/\n/g, "<br>");
    document.getElementById("lyrics").innerHTML = json.lyrics
}

function get_info(json) {
	console.log(json)
	let artist_info_URL = "https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=0222fd29f0f4049d5b560b08d3271fdb&format=json&artist=" + encodeURIComponent(artist);
	$.get(artist_info_URL, function(data) {
		console.log(data)
		artist_bio = data.artist.bio;
		if (artist_bio){
			let summary = artist_bio.summary;
			$("#info").html(summary);
		} else {
			$("#info").html("");
		}
	})
	if (json.track.album) {
		let img = json.track.album.image[2]['#text'];
        $("#album-pic").attr("src", img);
    } else {
		$("#album-pic").hide();
	}
	if (json.track.wiki) {
		let info = json.track.wiki.summary;
		$("#info").html(info);
	 } 	
}	

function getJSON() {
	let lyricsURL = "https://api.lyrics.ovh/v1/";
	let get_info_URL = "https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=0222fd29f0f4049d5b560b08d3271fdb"
    artist = $("#artist").val();
    let song = $("#song").val();

	if (artist == "" || song == "") {
		alert("Error, Missing Fields! ");
		return;
	}
    // check if fields are inputted or not
    // if there is no result, print out error
	
	// get information entered to web-page here
	// using baseURL + information entered, create full URL
	lyricsURL += artist + "/" + song;
	get_info_URL += "&artist=" + artist + "&track=" + song +"&format=json";
	// Make sure the fullURL works: copy and paste it in a browser:
	//console.log(fullURL);
	
	$.get(lyricsURL, function(data) {
		// Success callback function
		$("#rawJSON").html(JSON.stringify(data));
		get_lyrics(data);
		$.get(get_info_URL, function(data) {
			get_info(data)
		})
	})
	.fail(function(jqXHR) {
		if (jqXHR.status === 404) {
			// Handle 404 Not Found error
			alert("Song is either not in API database, or title/artist is incorrect");
		} 
	});

	
}