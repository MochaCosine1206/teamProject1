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


//cocktailDB search variable
//recipe search
//ingredient search
//random cocktail search
//category search


//get ingredient and category items on page load and list them in selection boxes

$(document).ready(function(){
    //establish lists
    var categories = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
    
    $.ajax({
        url: categories,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(response.drinks[0].strCategory); 

        for (var i = 0; i < response.drinks.length; i++) {
            var option = $("<option>").val(response.drinks[i].strCategory).text(response.drinks[i].strCategory)
            $("#categorySelect").append(option);
        }
    })

    var ingredients = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
    $.ajax({
        url: ingredients,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(response.drinks[0].strIngredient1); 
        console.log(response.drinks.length); 
            
        //change data into usable autocomplete object
        for (var i = 0; i < response.drinks.length; i++) {
            var option = $("<option>").val(response.drinks[i].strIngredient1).text(response.drinks[i].strIngredient1)
            $("#ingredientSelect").append(option);
        }

        
        
    })


    //glasses search

    var glasses = "https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list";
    $.ajax({
        url: glasses,
        method: "GET"
    }).then(function(response){
        console.log(response);

        for (var i = 0; i < response.drinks.length; i++) {
            var option = $("<option>").val(response.drinks[i].strGlass).text(response.drinks[i].strGlass)
            $("#glassSelect").append(option);
        }
    })



    

    var alcoholic = "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list";

    $.ajax({
        url: alcoholic,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })

    cocktailSearch();


})

function cocktailSearch() {
    $("#searchButton").on("click", function(){
        var value = $("#cocktailName").val().trim();
        var cocktailMultiple = value.split(" ").join("+");
        var cockTailSearchVal = cocktailMultiple;
        var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cockTailSearchVal;
        console.log(cockTailSearchVal);
        console.log(cocktailURL);

        $.ajax({
            url: cocktailURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            for (var i = 0; i < response.drinks.length; i++) {
                var cocktailCard = $("<div>").addClass("card");
                var cocktailCardImage = $("<div>").addClass("card-image").attr("src")
                var cocktailContent = $("<div").addClass("card-content")
            }
        })
    })
}