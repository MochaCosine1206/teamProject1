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
var ingredients = [];

$(document).ready(function () {
    //type word or phrase and get a list of 10 different types of the drink you searched
    $("#submitButton").on("click", function (event) {
        event.preventDefault();

        textValue = $("#wordSearch").val().trim();
        search = textValue.split(" ").join("+");
        console.log(search);

        var drinks = search;
        var cocktailQuery = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinks;
        console.log(cocktailQuery);

        $.ajax({
            url: cocktailQuery,
            method: "GET"
            }).then(function(response) {
            console.log(response);
            $('#results').empty();

                for (var i = 0; i < response.drinks.length; i++) {
                    console.log(response.drinks[i]);
                    resultsLine = $("<ul>");
                    resultsLink = $("<a>").text(response.drinks[i].strDrink);
                    resultsLine.append(resultsLink);
                    $("#results").append(resultsLine);
                    for (var z = 1; z < response.drinks[i].length; z++) {
                        // if ( === 'text');
                        // push.
                    }
                    ingredientLink = $("<li>").text(response.drinks[i].strIngredient1);
                    resultsLine.append(ingredientLink);
                    $("#ingredients").append(resultsLine);
                }      
        })
        
    }) 
   
})