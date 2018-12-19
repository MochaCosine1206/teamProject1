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

//datamuse variables
var search;
var textValue;

//google maps
var lat;
var lng;
var latlon;
var img_url;



$(document).ready(function () {

    //type word or phrase and get a list of 10 closest meaning words
    $("#submitButton").on("click", function (event) {

        event.preventDefault();

        textValue = $("#wordSearch").val().trim();
        search = textValue.split(" ").join("+");
        console.log(search);


        console.log(search);
        $("#submitButton").off("click")

        var dataMuseQuery = "https://cors-escape.herokuapp.com/https://api.datamuse.com/words?ml=" + search + "&max=10";

        console.log(dataMuseQuery);

        $.ajax({
            url: dataMuseQuery,
            method: "GET",
            success: function (response) {
                console.log(response[0]);
                console.log(response.length);
                console.log(response[0].word);

                for (var i = 0; i < response.length; i++) {
                    resultsLine = $("<li>")
                    console.log(resultsLine);
                    resultsLink = $("<a>").text(response[i].word);
                    console.log(resultsLink);
                    resultsLine.append(resultsLink);
                    $("#results").append(resultsLine);
                }
            }

        });

    })

    //function to get user location

    //Google Maps apikey: AIzaSyB-DVMcEdGN_fvf9j-0lmmWrJmUAs3OTdQ

    $("#addressButton").on("click", function (event) {
        event.preventDefault();

        addressSearch();
        $("#locationSearch").val("");


    });



    function addressSearch() {
        var newAddress = $("#locationSearch").val().trim();
        var newAddressString = newAddress.split(" ").join("+");

        //take address and make it the new URL

        var addressURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + newAddressString + "&key=AIzaSyB-DVMcEdGN_fvf9j-0lmmWrJmUAs3OTdQ"

        console.log(addressURL);

        $.ajax({
            url: addressURL,
            method: "GET",
            success: function (response) {
                console.log(response);
                console.log(response.results[0].geometry.location.lat + "," + response.results[0].geometry.location.lng);
                console.log(response.results[0].formatted_address);
                latlon = response.results[0].geometry.location.lat + "," + response.results[0].geometry.location.lng
                lat = response.results[0].geometry.location.lat;
                lng = response.results[0].geometry.location.lng;

                img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&position=" + latlon + "&zoom=14&size=400x300&sensor=false&key=AIzaSyAALDv6NEVWFRRIOeI6dV1HiGQNOuhr5Pg";


                $("#map-loc").html("<img src=" + img_url + ">");

                $("#locText").html("Latitude: " + response.results[0].geometry.location.lat + " <br> Longitude: " + response.results[0].geometry.location.lng + " <br> Street Address: " + response.results[0].formatted_address);

                //Brewery DB Function//
                //---------------------This is pulling from their sandbox, not much data coming back-----//

                getBrewInfo();

                function getBrewInfo() {

                    var brewURL = "https://cors-escape.herokuapp.com/https://sandbox-api.brewerydb.com/v2/search/geo/point?lat=" + lat + "&lng=" + lng + "&key=0cb1b40195347c3b31061996a9fae21b";

                    $.ajax({
                        url: brewURL,
                        method: "GET",
                        success: function (response) {
                            console.log(response);
                        }
                    })

                }

            }
        })


    }

//This click event gets your location through the browser
    $("#locationButton").on("click", function (event) {

        event.preventDefault();

        getLocation();

    });







//this function actually grabs your location depending on where you are.
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
        latlon = position.coords.latitude + "," + position.coords.longitude;
        console.log(latlon)
        img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&position=" + latlon + "&zoom=14&size=400x300&sensor=false&key=AIzaSyAALDv6NEVWFRRIOeI6dV1HiGQNOuhr5Pg";
        console.log(img_url);



        $("#map-loc").html("<img src=" + img_url + ">");

        $("#locText").text("Latitude: " + position.coords.latitude + " <br> Longitude: " + position.coords.longitude);


    }
//this function runs if there is an error
    showError();
    function showError(error) {
        if (error === "PERMISSION_DENIED") {
            $("#map-loc").text("User denied the request for Geolocation.")
        } else if (error === "POSITION_UNAVAILABLE") {
            $("#map-loc").text("Location information is unavailable.")
        } else if (error === "TIMEOUT") {
            $("#map-loc").text("The request to get user location timed out.")
        } else if (error === "UNKNOWN_ERROR") {
            $("#map-loc").text("An unknown error occured.")
        }
    }




})
