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
//OpenWeatherMap API KEY: ea5e0c43f629fa52f7b65eb894ba50e7

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
        L.tileLayer('https://api.mapbox.com/styles/v1/mochacosine1206/cjq2cj6sx2l172rl7r4l5nkp1/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibW9jaGFjb3NpbmUxMjA2IiwiYSI6ImNqcTJhbmE1czE2YTQzeXNianA4c3FrY2sifQ.RbdmQEMMo25L1OWZuOasLA'
        }).addTo(mymap);
        var marker = L.marker([lat, lng]).addTo(mymap);
        



        geoAddress()
        getZamatoCats()
        getZamato();

    }

    function getZamatoCats() {

        var zamatoCatURL = "https://developers.zomato.com/api/v2.1/cuisines?lat=" + lat + "&lon=" + lng;
        $.ajax({
            url: zamatoCatURL,
            headers: {
                "Accept": "application/json",
                "user-key": "bbb2d252f54e5d415f243174cd22b200",
            },
            success: zamatoCatFunc,
        })
    }

    function zamatoCatFunc(data) {
        console.log(data);
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
        town = data.address.town;
        console.log(town);
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
        getWeatherData()

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
        $("#map-loc").html("<img id='wikithumb' src=" + data.thumbnail.source +  ">" + data.extract_html + "<a href=" + data.content_urls.desktop + ">wikipedia link</a>");
    }

    function getWeatherData() {
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=ea5e0c43f629fa52f7b65eb894ba50e7&units=imperial";
        $.ajax({
            url: weatherURL,
            method: "GET",
            success: weatherData
        })
    }

    function weatherData(data) {
        console.log(data)
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
            L.tileLayer('https://api.mapbox.com/styles/v1/mochacosine1206/cjq2cj6sx2l172rl7r4l5nkp1/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoibW9jaGFjb3NpbmUxMjA2IiwiYSI6ImNqcTJhbmE1czE2YTQzeXNianA4c3FrY2sifQ.RbdmQEMMo25L1OWZuOasLA'
            }).addTo(mymap);
            var marker = L.marker([lat, lng]).addTo(mymap);

            $("#locText").html("Latitude: " + response[0].lat + " <br> Longitude: " + response[0].lon + " <br> Street Address: " + response[0].display_name);

            geoAddress()
            getZamatoCats()
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
                restLat = data.restaurants[i].restaurant.location.latitude
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
                // restMarker.bindPopup("<p>" +data.restaurants[i].restaurant.name + "</p>" +  data.restaurants[i].restaurant.location.address, {offset: [0,1]}).openPopup();
                restMarker.bindTooltip("<p>" +data.restaurants[i].restaurant.name + "</p>" +  data.restaurants[i].restaurant.location.address, {offset: [0,1], direction: "auto"});

                console.log(restMarkerArr);

                var zamatoDivCard = $("<div>").addClass("card blue lighten-2");
                var zamatoDivCardContent = $("<div>").addClass("card-content white-text");
                var zamatoDivCardText = $("<p>");
                var zamatoSec = zamatoDivCardText.html(data.restaurants[i].restaurant.name + "<br>" + data.restaurants[i].restaurant.location.address + "<br>" + data.restaurants[i].restaurant.user_rating.aggregate_rating + "<br>" + data.restaurants[i].restaurant.user_rating.rating_text + "<br>" + data.restaurants[i].restaurant.user_rating.votes);
                zamatoDivCardText.append(zamatoSec);
                zamatoDivCardContent.append(zamatoDivCardText)
                zamatoDivCard.append(zamatoDivCardContent)
                $("#zamato").append(zamatoDivCard);

            }
            // console.log(restMarkerArr[0]._latlng.lat + "," +  restMarkerArr[0]._latlng.lng )
            // mymap.fitBounds(restMarkerArr.getBounds());
            mymap.setZoom(11);
            moreRestaurants()
        }
        function moreRestaurants() {
            var moreButton = $("<button>").addClass("waves-effect waves-light btn").attr("id", "moreResults").text("next 10");
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
