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
var hamlet;
var county;
var residential;
var state;
var country;
var formattedCityStateName;
var lat;
var lng;
var mymap;
var restLat;
var restlng;
var restMarker;
var restMarkerArr = [];
var resultsCount = 0;

//Google Maps apikey: AIzaSyB-DVMcEdGN_fvf9j-0lmmWrJmUAs3OTdQ
//ZAMATO API KEY:bbb2d252f54e5d415f243174cd22b200

$(document).ready(function () {
    $("#addressButton").on("click", function (event) {
        event.preventDefault();
        addressSearch();
        clearField()
    });


    $("#locationButton").on("click", function (event) {
        event.preventDefault();
        clearField()
        getLocation();
    });


    function clearField() {
        $("#locationSearch").val("");
        $("#zamato").empty();
        if (mymap !== undefined) {
            mymap.remove();
        }
        $("#moreResults").remove();
    }


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
        console.log(mymap);
        mymap = L.map('mapid').setView([lat, lng], 13);
        console.log(mymap);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibW9jaGFjb3NpbmUxMjA2IiwiYSI6ImNqcTJhbmE1czE2YTQzeXNianA4c3FrY2sifQ.RbdmQEMMo25L1OWZuOasLA'
        }).addTo(mymap);
        var marker = L.marker([lat, lng]).addTo(mymap);

        geoAddress()
        getZamato();

    }

    function geoAddress() {
        console.log(latlon);
        var addressURL = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + lng + "&zoom=18&addressdetails=1"

        $.ajax({
            url: addressURL,
            method: "GET",
            success: getAddressDetails,
        });
        console.log(addressURL);
    }

    function getAddressDetails(data) {
        console.log(data);
        console.log(data.address);
        country = data.address.country;
        console.log(country);
        state = data.address.state;
        console.log(state);
        residential = data.address.residential;
        console.log(residential);
        county = data.address.county;
        console.log(county);
        hamlet = data.address.hamlet;
        console.log(hamlet);
        city = data.address.city;
        console.log(city);
        if (city === undefined && hamlet === undefined && county === undefined) {
            formattedCityStateName = residential + ",_" + state;
            console.log(formattedCityStateName);
        } else if (city === undefined && hamlet === undefined) {
            formattedCityStateName = county + ",_" + state;
            console.log(formattedCityStateName);
        } else if (city === undefined) {
            formattedCityStateName = hamlet + ",_" + state;
            console.log(formattedCityStateName);
        } else {
            formattedCityStateName = city + ",_" + state;
            console.log(formattedCityStateName);
        }
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
        $("#map-loc").html("<hr>" + data.extract);
    }


    function addressSearch() {
        var newAddress = $("#locationSearch").val().trim();
        console.log(newAddress);
        var newAddressString = newAddress.split(" ").join("+");
        //take address and make it the new URL

        var addressURL = "https://nominatim.openstreetmap.org/search?q=" + newAddressString + "&format=json&addressdetails=1"
        console.log(addressURL);

        $.ajax({
            url: addressURL,
            method: "GET",
            success: addressEntry,

        });


        function addressEntry(response) {
            console.log(response);
            console.log(response[0].lat + "," + response[0].lon);
            console.log(response[0].display_name);
            latlon = response[0].lat + "," + response[0].lon
            lat = response[0].lat;
            lng = response[0].lon;
            if (mymap === undefined) {
                console.log(undefined)
            }
            mymap = L.map('mapid').setView([lat, lng], 13);
            console.log(mymap);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoibW9jaGFjb3NpbmUxMjA2IiwiYSI6ImNqcTJhbmE1czE2YTQzeXNianA4c3FrY2sifQ.RbdmQEMMo25L1OWZuOasLA'
            }).addTo(mymap);
            var marker = L.marker([lat, lng]).addTo(mymap);

            $("#locText").html("Latitude: " + response[0].lat + " <br> Longitude: " + response[0].lon + " <br> Street Address: " + response[0].display_name);

            geoAddress()
            getZamato();
        }
    }


    function getZamato() {
        var zamatoURL = "https://developers.zomato.com/api/v2.1/search?start=" + resultsCount + "&count=10&lat=" + lat + "&lon=" + lng + "&radius=8047&sort=rating&order=desc";
        $.ajax({
            url: zamatoURL,
            headers: {
                "Accept": "application/json",
                "user-key": "bbb2d252f54e5d415f243174cd22b200",
            },
            success: zamatoRes,
        })

        // https://developers.zomato.com/api/v2.1/geocode?lat=" + lat + "&lon=" + lng

        // https://developers.zomato.com/api/v2.1/search?count=10&lat=33.4196675&lon=-111.9157036&radius=8047&sort=rating&order=desc


        function zamatoRes(data) {
            console.log(data);
            for (var i = 0; i < data.restaurants.length; i++) {
                restLat = data.restaurants[i].restaurant.location.latitude,
                restlng = data.restaurants[i].restaurant.location.longitude
                console.log(data);
                console.log("restaurant Name: " + data.restaurants[i].restaurant.name);
                console.log("Type of Cuisine: " + data.restaurants[i].restaurant.cuisines);
                console.log("Address: " + data.restaurants[i].restaurant.location.address);
                console.log("Menu Link: " + data.restaurants[i].restaurant.menu_url);
                console.log("Avg rating: " + data.restaurants[i].restaurant.user_rating.aggregate_rating);
                console.log("Rated: " + data.restaurants[i].restaurant.user_rating.rating_text);
                console.log("Number of times rated: " + data.restaurants[i].restaurant.user_rating.votes);
                restMarker = L.marker([restLat, restlng]).addTo(mymap);
                restMarkerArr.push(restMarker);
                restMarker.bindTooltip("<p>" + data.restaurants[i].restaurant.name + "</p>" +  data.restaurants[i].restaurant.location.address, {offset: [0,1], direction: "auto"});

                console.log(restMarkerArr);

                var zamatoDiv = $("<p>")
                var zamatoSec = zamatoDiv.html("<hr>" + data.restaurants[i].restaurant.name + "<br>" + data.restaurants[i].restaurant.location.address + "<br>" + data.restaurants[i].restaurant.user_rating.aggregate_rating + "<br>" + data.restaurants[i].restaurant.user_rating.rating_text + "<br>" + data.restaurants[i].restaurant.user_rating.votes);
                $("#zamato").append(zamatoSec);
            }
            mymap.setZoom(9);
            moreRestaurants()
        }


        function moreRestaurants() {
            var moreButton = $("<button>").addClass("yellow darken-2 waves-effect waves-light btn").attr("id", "moreResults").text("next 10");
            $("#formList").append(moreButton);

            $("#moreResults").on("click", function () {
                event.preventDefault();
                $("#moreResults").remove();
                for (i = 0; i < restMarkerArr.length; i++) {
                    mymap.removeLayer(restMarkerArr[i]);
                }
                restMarkerArr = [];
                resultsCount += 10;
                console.log(resultsCount);
                console.log(restMarker);

                $("#zamato").empty();
                getZamato();
                $("#moreResults").off("click");
            })
        }
    }
});