var config = {
    apiKey: "AIzaSyB2Kcu48M0PHgRM5XAlmLM8slqwc08DirY",
    authDomain: "teamproject1.firebaseapp.com",
    databaseURL: "https://teamproject1.firebaseio.com",
    projectId: "teamproject1",
    storageBucket: "teamproject1.appspot.com",
    messagingSenderId: "1068555305070"
};
firebase.initializeApp(config);

var database = firebase.database();
var latlon;
var city;
var cityPlaceId;
var state;
var statePlaceId;
var country;
var cityPlaceId;
var formattedCityStateName;
var lat;
var lng;

//Google Maps apikey: AIzaSyB-DVMcEdGN_fvf9j-0lmmWrJmUAs3OTdQ

$(document).ready(function () {
    $("#addressButton").on("click", function (event) {
        event.preventDefault();

        addressSearch();
        $("#locationSearch").val("");


    });

    $("#locationButton").on("click", function (event) {

        event.preventDefault();

        getLocation();

    });

    function getLocation() {
        console.log(navigator.geolocation);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            $("#map-loc").text("Geolocation is not supported by this browser");
        }
    }


    //This function gets a picture of the map where you are and adds it to the HTML
    function showPosition(position) {
        console.log(position);
        latlon = position.coords.latitude + "," + position.coords.longitude;
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log(typeof latlon)
        console.log(typeof position.coords.latitude);
        var mymap = L.map('mapid').setView([lat, lng], 13);
        console.log(mymap);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibW9jaGFjb3NpbmUxMjA2IiwiYSI6ImNqcTJhbmE1czE2YTQzeXNianA4c3FrY2sifQ.RbdmQEMMo25L1OWZuOasLA'
        }).addTo(mymap);

        geoAddress()

        // img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&position=" + latlon + "&zoom=14&size=400x300&sensor=false&key=AIzaSyAALDv6NEVWFRRIOeI6dV1HiGQNOuhr5Pg";
        // console.log(img_url);

        // $("#map-loc").html("<img src=" + img_url + ">");

        

    }

    function geoAddress() {
        console.log(latlon);
        var addressURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlon + "&key=AIzaSyB-DVMcEdGN_fvf9j-0lmmWrJmUAs3OTdQ"

        $.ajax({
            url: addressURL,
            method: "GET",
            success: getAddressDetails,
        });

        console.log(addressURL);
    }

    function getAddressDetails(data) {
        console.log(data);
        console.log(data.results.length);
        var countryIndex = data.results.length
        country = data.results[countryIndex - 1].formatted_address;
        console.log(country);
        countryPlaceId = data.results[countryIndex - 1].place_id;
        console.log(countryPlaceId);
        state = data.results[countryIndex - 2].formatted_address;
        console.log(state);
        statePlaceId = data.results[countryIndex - 2].place_id;
        console.log(statePlaceId);
        city = data.results[countryIndex - 5].formatted_address;
        console.log(city);
        cityPlaceId = data.results[countryIndex - 5].place_id;
        console.log(cityPlaceId);
        formattedCityStateName = data.results[countryIndex - 5].address_components[1].long_name + ",_" + data.results[countryIndex - 5].address_components[3].long_name;
        console.log(formattedCityStateName);

        getPlaceDetails();
    }



    function getPlaceDetails() {
        var cityIdUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/" + formattedCityStateName

        $.ajax({
            url: cityIdUrl,
            method: "GET",
            success: placeDetails,
        })
    }

    function placeDetails(data) {
        console.log(data);
        $("#map-loc").text(data.extract);

    }


    function addressSearch() {
        var newAddress = $("#locationSearch").val().trim();
        var newAddressString = newAddress.split(" ").join("+");

        //take address and make it the new URL

        var addressURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + newAddressString + "&key=AIzaSyB-DVMcEdGN_fvf9j-0lmmWrJmUAs3OTdQ"

        console.log(addressURL);


        $.ajax({
            url: addressURL,
            method: "GET",
            success: addressEntry,

        });

        function addressEntry(response) {
            console.log(response);
            console.log(response.results[0].geometry.location.lat + "," + response.results[0].geometry.location.lng);
            console.log(response.results[0].formatted_address);
            latlon = response.results[0].geometry.location.lat + "," + response.results[0].geometry.location.lng
            lat = response.results[0].geometry.location.lat;
            lng = response.results[0].geometry.location.lng;

            var mymap = L.map('mapid').setView([lat, lng], 13);
            console.log(mymap);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoibW9jaGFjb3NpbmUxMjA2IiwiYSI6ImNqcTJhbmE1czE2YTQzeXNianA4c3FrY2sifQ.RbdmQEMMo25L1OWZuOasLA'
            }).addTo(mymap);



            $("#locText").html("Latitude: " + response.results[0].geometry.location.lat + " <br> Longitude: " + response.results[0].geometry.location.lng + " <br> Street Address: " + response.results[0].formatted_address);

            geoAddress()
        }

    }
});
