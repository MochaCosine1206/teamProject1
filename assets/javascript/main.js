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
var town;
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
var selectedCuisine;
var selectedEstab;
var currentTemp;
var currentCondition;

var savedUserName = "";
var savedEmail = "";
var savedPassword = "";
var modalOne = document.getElementById("modal1");
var modalTwo = document.getElementById("modal2");
var newUser = {};

var resName = "";
var resAddress = "";
var resAvgRate = 0;
var resRate = "";
var resRaters = 0;


$(document).ready(function () {

    $("#logOut").hide();
    $(modalOne).hide();
    $(modalTwo).hide();

    $("#signUp").on("click", function(event) {
        event.preventDefault();
        $(modalOne).show();
        $(modalOne).css("z-index", 100);
        $(modalTwo).hide();
    });

    $("#cancelOne").on("click", function(){
        $(modalOne).hide();
        $("#signUp").show();
        $("#logIn").show();

    });

    $("#logIn").on("click", function(event) {
        event.preventDefault();
        $(modalTwo).show();
        $(modalTwo).css("z-index", 100);
        $(modalOne).hide();
    });

    $("#cancelTwo").on("click", function(){
        $(modalTwo).hide();
        $("#signUp").show();
        $("#logIn").show();

    });

    //Sign Up to the app
    $("#submitOne").on("click", function(event) {
        event.preventDefault();
        savedUserName = $("#userNameSignUp").val().trim();
        savedEmail = $("#emailSignUp").val().trim();
        savedPassword = $("#passwordSignUp").val().trim();
        console.log(savedUserName);
        console.log(savedEmail);
        console.log(savedPassword);

        firebase.auth().createUserWithEmailAndPassword(savedEmail, savedPassword).catch(function(error) {
            // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
              $(modalOne).show();  
              $("#signUpTitle").append("<p>" + 'The password is too weak.' + "</p>");
              firebase.auth().signOut()
                $("#userNameSignUp").val("");
                $("#emailSignUp").val("");
                $("#passwordSignUp").val("");
                savedUserName = "";
            } else {
              $(modalOne).show();  
              $("#signUpTitle").append("<p>" + errorMessage + "</p>");
              firebase.auth().signOut()
              $("#userNameSignUp").val("");
              $("#emailSignUp").val("");
              $("#passwordSignUp").val("");
                savedUserName = "";
            }
            console.log(error);
            // [END_EXCLUDE]
          });

        $("#userNameSignUp").val("");
        $("#emailSignUp").val("");
        $("#passwordSignUp").val("");

        $(modalOne).hide();
        $("#signUp").hide();
        $("#logIn").hide();
        
        var user = firebase.auth().currentUser;

            // if (user) {
            //     $("#nav-mobile").append("<li>" + "Welcome!" + "</li>");

            // } else {
            // }
          

        // }else{

        // }
      
        // function writeUserData(userID, savedUserName, savedEmail) {
        //     firebase.database().ref('users/' + userID).set({
        //         username: savedUserName,
        //         email: savedEmail
        //     });
        // }

    });


    $("#submitTwo").on("click", function(event) {
        event.preventDefault();
        var email = $("#emailLogIn").val().trim();
        var password = $("#passwordLogIn").val().trim();
          
        //   console.log(email);
        //   console.log(password);
          // Sign in with email and pass.
          // [START authwithemail]
          firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
              // Handle Errors here.
              console.log(email);
              console.log(password);
    
              var errorCode = error.code;
              var errorMessage = error.message;
              // [START_EXCLUDE]
              if (errorCode === 'auth/wrong-password') {
                $(modalTwo).show();
                  $("#logInTitle").append("<p>" +'Wrong password.' + "</p>");
                  firebase.auth().signOut()
                  $("#emailLogIn").val("");
                  $("#passwordLogIn").val("");
              } else if(errorCode === 'auth/user-not-found') {
                $(modalTwo).show();
                  $("#logInTitle").append("<p>" + 'User not found.' + "</p>");
                  firebase.auth().signOut()
                  $("#emailLogIn").val("");
                  $("#passwordLogIn").val("");
              } else {
                $(modalTwo).show();
                $("#logInTitle").append("<p>" + errorMessage + "</p>");
                firebase.auth().signOut()
                $("#emailLogIn").val("");
                $("#passwordLogIn").val("");
              }
              console.log(error);
              $("#signUp").show();
              $("#logIn").show();
      
            //   var user = firebase.auth().currentUser;

            //   if (user) {
            //       $("#nav-mobile").append("<li>" + "Welcome!" + "</li>");
  
            //   } else {
            //   }
                });

            

              // [END_EXCLUDE]
            

            // if(errorCode==null) {
            //     $("#nav-mobile").append("<li>" + "Welcome!" + "</li>");
            // }else{

            // }
    
            $(modalTwo).hide();
            $("#signUp").hide();
            $("#logIn").hide();

        });
    

// var userID = firebase.auth().currentUser.uid;

   $("#logOut").on("click", function() {
    firebase.auth().signOut().then(function() {
        $("#signUp").show();
        $("#logIn").show();
        $("#apiInfo").hide();
        $("#logOut").hide();

        console.log("Logged out!")
     }, function(error) {
        console.log(error.code);
        console.log(error.message);
     });
   });
    
    // function checkUser() {
    //     var user = firebase.auth().currentUser;
    //     if (user != null) {
    //         var name = user.userName;
    //         $("#nav-mobile").prepend("<li>" + "Welcome, " + name + "</li>");
    //         newUser.favorites = new Array();

    //     }
    // }

//     var user = firebase.auth().currentUser;
// var name = ""; 
// var email = ""; 
// var password = "";
// var uid = ""; 
// var emailVerified = "";

// if (user != null) {
//   name = user.userName;
//   email = user.email;
//   password = user.password;
//   emailVerified = user.emailVerified;
//   uid = user.uid; 

//   $("#nav-mobile").append("<li>" + "Welcome, " + name + "</li>");
//   $("#apiInfo").show();
// }

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
        $("#weatherDat").empty();
        if (mymap !== undefined) {
            mymap.remove();
        }
        $("#moreResults").remove();
        $("#cuisineSel").val("");
        selectedCuisine = "";
        resultsCount = 0;
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
        $("#mapid").css({"border": "4px inset white"});
        console.log(mymap);
        L.tileLayer('https://api.mapbox.com/styles/v1/mochacosine1206/cjq2cj6sx2l172rl7r4l5nkp1/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibW9jaGFjb3NpbmUxMjA2IiwiYSI6ImNqcTJhbmE1czE2YTQzeXNianA4c3FrY2sifQ.RbdmQEMMo25L1OWZuOasLA'
        }).addTo(mymap);
        var marker = L.marker([lat, lng]).addTo(mymap);
        
        geoAddress();
        getZamatoCats();
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
        $("#selCuisine").show();
        console.log(data);
        for (var i = 0; i < data.cuisines.length; i++){
            console.log(data.cuisines[i].cuisine.cuisine_name);
            var cuisineOption = $("<option>").val(data.cuisines[i].cuisine.cuisine_id).text(data.cuisines[i].cuisine.cuisine_name);
            $("#cuisineSel").append(cuisineOption);
        } 
    }


    function cuisineSelectedOption() {
        $("#cuisineSel").on("change", function(){
            selectedCuisine = $("#cuisineSel option:selected").val();
            console.log(selectedCuisine);
            $("#moreResults").remove();
                for (i = 0; i < restMarkerArr.length; i++) {
                    mymap.removeLayer(restMarkerArr[i]);
                }
                restMarkerArr = [];
                resultsCount = 0;
                resultsCount += 10;
                console.log(resultsCount);
                console.log(restMarker);

                $("#zamato").empty();
                getZamato();
                })
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
        county = data.address.county;
        console.log(county);
        residential = data.address.residential;
        console.log(residential);
        hamlet = data.address.hamlet;
        console.log(hamlet);
        town = data.address.town;
        console.log(town);
        city = data.address.city;
        console.log(city);
        if (city === undefined && hamlet === undefined && town === undefined) {
            formattedCityStateName = county + ",_" + state;
            console.log(formattedCityStateName);
        } else if (city === undefined && hamlet === undefined) {
            formattedCityStateName = town + ",_" + state;
            console.log(formattedCityStateName);
        } else if (city === undefined) {
            formattedCityStateName = hamlet + ",_" + state;
            console.log(formattedCityStateName);
        } else {
            formattedCityStateName = city + ",_" + state;
            console.log(formattedCityStateName);
        }

        // if (city === undefined) {
        //     formattedCityStateName = town + ",_" + state;
        // } else if (town === undefined){
        //     formattedCityStateName = hamlet + ",_" + state;
        // } else if (hamlet === undefined) {
        //     formattedCityStateName = residential + ",_" + state;
        // } else if (residential === undefined){
        //     formattedCityStateName = county + ",_" + state;
        // } else if (county === undefined) {
        //     formattedCityStateName = state;
        // } else {
        //     formattedCityStateName = city + ",_" + state;
        // }

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


//function below is getting the information data for the area that has been searched
    function placeDetails(data) {
        console.log(data);
        $("#map-loc").html("<img id='wikithumb' src=" + data.thumbnail.source +  ">");
        $("#map-loc").addClass("center");
        $("#loc-text").html(data.extract_html + "<a href=" + data.content_urls.desktop + ">wikipedia link</a>");
        $("#loc-text").css({"background-color": "white", "opacity": "0.8", "padding": "5px", "display": "block"});

    }


    function getWeatherData() {
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=ea5e0c43f629fa52f7b65eb894ba50e7&units=imperial";
        $.ajax({
            url: weatherURL,
            method: "GET",
            success: weatherData
        });
    }


    function weatherData(data) {
        console.log(data)
        currentTemp = data.main.temp;
        console.log(currentTemp);
        currentCondition = data.weather[0].description;
        console.log(currentCondition);
        var tempData = $("<p>").addClass("card-title center").attr("id", "weatherDat")
            .text("Current Temp: " + currentTemp + " Current Conditions: " + currentCondition)

            .css({"color": "orange", "font-size": "12px"});
        $("#cloud").prepend(tempData);

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
            geoAddress();
            getZamatoCats();
            getZamato();
          }
        }



    function getZamato() {
        if(selectedCuisine) {
            var zamatoURL = "https://developers.zomato.com/api/v2.1/search?start=" + resultsCount + "&count=10&lat=" + lat + "&lon=" + lng + "&radius=8047&sort=rating&order=desc&cuisines=" + selectedCuisine;
            console.log(zamatoURL);
        } else {
            var zamatoURL = "https://developers.zomato.com/api/v2.1/search?start=" + resultsCount + "&count=10&lat=" + lat + "&lon=" + lng + "&radius=8047&sort=rating&order=desc";
            console.log(zamatoURL);
            console.log(selectedCuisine);   
        }
        
        $.ajax({
            url: zamatoURL,
            headers: {
                "Accept": "application/json",
                "user-key": "bbb2d252f54e5d415f243174cd22b200",
            },
            success: zamatoRes,
        })



        function zamatoRes(data) {
            console.log(data);
            for (var i = 0; i < data.restaurants.length; i++) {
                restLat = data.restaurants[i].restaurant.location.latitude;
                restlng = data.restaurants[i].restaurant.location.longitude;
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
                restMarker.bindTooltip("<p>" +data.restaurants[i].restaurant.name + "</p>" +  data.restaurants[i].restaurant.location.address, {offset: [0,1], direction: "auto"});

                console.log(restMarkerArr);

                var zamatoDivCard = $("<div>").addClass("card orange lighten-2");
                zamatoDivCard.css({"opacity": "0.9"});
                var zamatoDivCardContent = $("<div>").addClass("card-content white-text");
                var zamatoDivCardText = $("<p>");
                var zamatoSec = zamatoDivCardText.html("Name: " + data.restaurants[i].restaurant.name + "<br>" + "Address: " + data.restaurants[i].restaurant.location.address + "<br>" 
                    + "Avg Rating: " + data.restaurants[i].restaurant.user_rating.aggregate_rating + "<br>" + "Rating: " + data.restaurants[i].restaurant.user_rating.rating_text + "<br>" + "No. of Reviews: " + data.restaurants[i].restaurant.user_rating.votes);
            
                var zamatoImgSpot = $("<div>").addClass("card-panel");
                var zamatoImg = zamatoImgSpot.html(data.restaurants[i].restaurant.thumb);
                console.log(data.restaurants[i].restaurant.thumb);

                zamatoImgSpot.append(zamatoDivCardContent);
                zamatoImg.append(zamatoImgSpot);

                zamatoDivCardText.append(zamatoSec);
                zamatoDivCardContent.append(zamatoDivCardText);
                zamatoDivCard.append(zamatoDivCardContent);
                $("#zamato").append(zamatoDivCard);

                
            }
            mymap.setZoom(11);
            moreRestaurants()
        }


        function moreRestaurants() {
            var moreButton = $("<button>").addClass("yellow darken-2 waves-effect waves-light btn").attr("id", "moreResults").text("next 10");
            $("#zamatoDiv").prepend(moreButton);


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
    cuisineSelectedOption();
    // establishmentSelectedOption();

// $("#faveSave").on("click", function(event) {
//     event.preventDefault();
//     resName = data.restaurants[i].restaurant.name;
//     resAddress = data.restaurants[i].restaurant.location.address;
//     resAvgRate = data.restaurants[i].restaurant.user_rating.aggregate_rating;
//     resRate = data.restaurants[i].restaurant.user_rating.rating_text;
//     resRaters = data.restaurants[i].restaurant.user_rating.votes;

//     console.log(resName);
//     console.log(resAddress);
//     console.log(resAvgRate);
//     console.log(resRate);
//     console.log(resRaters);

// });


});

