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
var sectionMap;


//get ingredient and category items on page load and list them in selection boxes

$(document).ready(function () {



    //establish lists
    var categories = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

    $.ajax({
        url: categories,
        method: "GET"
    }).then(function (response) {

        for (var i = 0; i < response.drinks.length; i++) {
            var option = $("<option>").val(response.drinks[i].strCategory).text(response.drinks[i].strCategory)
            $("#categorySelect").append(option);
        }
    })

    var ingredients = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
    $.ajax({
        url: ingredients,
        method: "GET"
    }).then(function (response) {
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
    }).then(function (response) {

        for (var i = 0; i < response.drinks.length; i++) {
            var option = $("<option>").val(response.drinks[i].strGlass).text(response.drinks[i].strGlass)
            $("#glassSelect").append(option);
        }
    })






    cocktailSearch();

    function cocktailSearch() {
        $.ajax({
            url: "https://cors-escape.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&titles=List_of_IBA_official_cocktails&prop=links&pllimit=max",
            method: "GET"
        }).then(function (response) {
            console.log(response)
            console.log(response.query.pages[8702622].links[0].title);
            var wikiArticleArray = response.query.pages[8702622].links.map(function (titles) {
                wikiLinks = titles.title
                // console.log(titles.title);
                return wikiLinks;
            })
            // console.log(wikiArticleArray);

            $("#searchButton").on("click", function () {
                var value = $("#cocktailName").val().trim();
                var cocktailMultiple = value.split(" ").join("+");
                var cockTailSearchVal = cocktailMultiple;
                var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cockTailSearchVal;
                // console.log(cockTailSearchVal);
                // console.log(cocktailURL);

                $.ajax({
                    url: cocktailURL,
                    method: "GET"
                }).then(function (response) {




                    //Map Arrays for URL, Drink Names, Images, Instructions--------------------

                    var drinkNamesArray = response.drinks.map(function (drinkNames) {
                        var drinkName = drinkNames.strDrink;
                        return drinkName;
                    })
                    console.log(drinkNamesArray);

                    var drinksWikiUrl = response.drinks.map(function (drinkNames) {
                        var drinkName = drinkNames.strDrink;
                        var drinkNameFormatted = drinkName.split(" ").join("_");
                        var wikiURL = "https://en.wikipedia.org/api/rest_v1/page/summary/" + drinkNameFormatted;
                        return wikiURL;




                    });
                    console.log(drinksWikiUrl);


                    



                    for (var i = 0; i < response.drinks.length; i++) {

                        if (wikiArticleArray.includes(response.drinks[i].strDrink)) {

                            $.ajax({
                                url: drinksWikiUrl,
                                method: "get",
                            }).then(function(data){
                                console.log(data.extract);
                                var extractDiv = $("<p>").text(data.extract);
                            });
                            
                        }

                        var cocktailCard = $("<div>").addClass("card");
                        var cocktailCardImageDiv = $("<div>").addClass("card-image")
                        var cocktailCardImage = $("<img>").attr("src", response.drinks[i].strDrinkThumb);
                        var cocktailCardContent = $("<div>").addClass("card-content");
                        var cocktailCardName = $("<h1>").text(response.drinks[i].strDrink);
                        var cocktailSnippetDiv = $("<div>").attr("id", "wikiDiv");
                        console.log("snippetDiv created");
                        var breakSpace = $("<br>");
                        var ingredientBreakSpace = $("<br><h4>Ingredients: </h4><br>");
                        var cocktailCardDirections = $("<p>").text(response.drinks[i].strInstructions);
                        cocktailCardImageDiv.append(cocktailCardImage);
                        cocktailCardContent.append(cocktailCardName, cocktailSnippetDiv, breakSpace, cocktailCardDirections, ingredientBreakSpace);



                        // -----------------------------------------------------
                        // below the only way I know how to pull in the ingredients so far

                        var cocktailIngredient1 = response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1

                        var cocktailIngredient2 = response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2

                        var cocktailIngredient3 = response.drinks[i].strMeasure3 + response.drinks[i].strIngredient3

                        var cocktailIngredient4 = response.drinks[i].strMeasure4 + response.drinks[i].strIngredient4

                        var cocktailIngredient5 = response.drinks[i].strMeasure5 + response.drinks[i].strIngredient5

                        var cocktailIngredient6 = response.drinks[i].strMeasure6 + response.drinks[i].strIngredient6

                        var cocktailIngredient7 = response.drinks[i].strMeasure7 + response.drinks[i].strIngredient7

                        var cocktailIngredient8 = response.drinks[i].strMeasure8 + response.drinks[i].strIngredient8

                        var cocktailIngredient9 = response.drinks[i].strMeasure9 + response.drinks[i].strIngredient9

                        var cocktailIngredient10 = response.drinks[i].strMeasure10 + response.drinks[i].strIngredient10

                        var cocktailIngredient11 = response.drinks[i].strMeasure11 + response.drinks[i].strIngredient11

                        var cocktailIngredient12 = response.drinks[i].strMeasure12 + response.drinks[i].strIngredient12

                        var cocktailIngredient13 = response.drinks[i].strMeasure13 + response.drinks[i].strIngredient13

                        var cocktailIngredient14 = response.drinks[i].strMeasure14 + response.drinks[i].strIngredient14

                        var cocktailIngredient15 = response.drinks[i].strMeasure15 + response.drinks[i].strIngredient15

                        if (cocktailIngredient1.trim().length > 0 && cocktailIngredient2.trim().length > 0 && cocktailIngredient3.trim().length > 0 && cocktailIngredient4.trim().length > 0 && cocktailIngredient5.trim().length > 0 && cocktailIngredient6.trim().length > 0 && cocktailIngredient7.trim().length > 0 && cocktailIngredient8.trim().length > 0 && cocktailIngredient9.trim().length > 0 && cocktailIngredient10.trim().length > 0 && cocktailIngredient11.trim().length > 0 && cocktailIngredient12.trim().length > 0 && cocktailIngredient13.trim().length > 0 && cocktailIngredient14.trim().length > 0 && cocktailIngredient15.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1 + " <br> " + "- " + response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2 + " <br> " + "- " + response.drinks[i].strMeasure3 + response.drinks[i].strIngredient3 + " <br> " + "- " + response.drinks[i].strMeasure4 + response.drinks[i].strIngredient4 + " <br> " + "- " + response.drinks[i].strMeasure5 + response.drinks[i].strIngredient5 + " <br> " + "- " + response.drinks[i].strMeasure6 + response.drinks[i].strIngredient6 + " <br> " + "- " + response.drinks[i].strMeasure7 + response.drinks[i].strIngredient7 + " <br> " + "- " + response.drinks[i].strMeasure8 + response.drinks[i].strIngredient8 + " <br> " + "- " + response.drinks[i].strMeasure9 + response.drinks[i].strIngredient9 + " <br> " + "- " + response.drinks[i].strMeasure10 + response.drinks[i].strIngredient10 + " <br> " + "- " + response.drinks[i].strMeasure11 + response.drinks[i].strIngredient11 + " <br> " + "- " + response.drinks[i].strMeasure12 + response.drinks[i].strIngredient12 + " <br> " + "- " + response.drinks[i].strMeasure13 + response.drinks[i].strIngredient13 + " <br> " + "- " + response.drinks[i].strMeasure14 + response.drinks[i].strIngredient14 + " <br> " + "- " + response.drinks[i].strMeasure15 + response.drinks[i].strIngredient15;
                            cocktailCardContent.append(cockTailIngredient);
                        } else if (cocktailIngredient1.trim().length > 0 && cocktailIngredient2.trim().length > 0 && cocktailIngredient3.trim().length > 0 && cocktailIngredient4.trim().length > 0 && cocktailIngredient5.trim().length > 0 && cocktailIngredient6.trim().length > 0 && cocktailIngredient7.trim().length > 0 && cocktailIngredient8.trim().length > 0 && cocktailIngredient9.trim().length > 0 && cocktailIngredient10.trim().length > 0 && cocktailIngredient11.trim().length > 0 && cocktailIngredient12.trim().length > 0 && cocktailIngredient13.trim().length > 0 && cocktailIngredient14.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1 + " <br> " + "- " + response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2 + " <br> " + "- " + response.drinks[i].strMeasure3 + response.drinks[i].strIngredient3 + " <br> " + "- " + response.drinks[i].strMeasure4 + response.drinks[i].strIngredient4 + " <br> " + "- " + response.drinks[i].strMeasure5 + response.drinks[i].strIngredient5 + " <br> " + "- " + response.drinks[i].strMeasure6 + response.drinks[i].strIngredient6 + " <br> " + "- " + response.drinks[i].strMeasure7 + response.drinks[i].strIngredient7 + " <br> " + "- " + response.drinks[i].strMeasure8 + response.drinks[i].strIngredient8 + " <br> " + "- " + response.drinks[i].strMeasure9 + response.drinks[i].strIngredient9 + " <br> " + "- " + response.drinks[i].strMeasure10 + response.drinks[i].strIngredient10 + " <br> " + "- " + response.drinks[i].strMeasure11 + response.drinks[i].strIngredient11 + " <br> " + "- " + response.drinks[i].strMeasure12 + response.drinks[i].strIngredient12 + " <br> " + "- " + response.drinks[i].strMeasure13 + response.drinks[i].strIngredient13 + " <br> " + "- " + response.drinks[i].strMeasure14 + response.drinks[i].strIngredient14;
                            cocktailCardContent.append(cockTailIngredient);
                        } else if (cocktailIngredient1.trim().length > 0 && cocktailIngredient2.trim().length > 0 && cocktailIngredient3.trim().length > 0 && cocktailIngredient4.trim().length > 0 && cocktailIngredient5.trim().length > 0 && cocktailIngredient6.trim().length > 0 && cocktailIngredient7.trim().length > 0 && cocktailIngredient8.trim().length > 0 && cocktailIngredient9.trim().length > 0 && cocktailIngredient10.trim().length > 0 && cocktailIngredient11.trim().length > 0 && cocktailIngredient12.trim().length > 0 && cocktailIngredient13.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1 + " <br> " + "- " + response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2 + " <br> " + "- " + response.drinks[i].strMeasure3 + response.drinks[i].strIngredient3 + " <br> " + "- " + response.drinks[i].strMeasure4 + response.drinks[i].strIngredient4 + " <br> " + "- " + response.drinks[i].strMeasure5 + response.drinks[i].strIngredient5 + " <br> " + "- " + response.drinks[i].strMeasure6 + response.drinks[i].strIngredient6 + " <br> " + "- " + response.drinks[i].strMeasure7 + response.drinks[i].strIngredient7 + " <br> " + "- " + response.drinks[i].strMeasure8 + response.drinks[i].strIngredient8 + " <br> " + "- " + response.drinks[i].strMeasure9 + response.drinks[i].strIngredient9 + " <br> " + "- " + response.drinks[i].strMeasure10 + response.drinks[i].strIngredient10 + " <br> " + "- " + response.drinks[i].strMeasure11 + response.drinks[i].strIngredient11 + " <br> " + "- " + response.drinks[i].strMeasure12 + response.drinks[i].strIngredient12 + " <br> " + "- " + response.drinks[i].strMeasure13 + response.drinks[i].strIngredient13;
                            cocktailCardContent.append(cockTailIngredient);
                        } else if (cocktailIngredient1.trim().length > 0 && cocktailIngredient2.trim().length > 0 && cocktailIngredient3.trim().length > 0 && cocktailIngredient4.trim().length > 0 && cocktailIngredient5.trim().length > 0 && cocktailIngredient6.trim().length > 0 && cocktailIngredient7.trim().length > 0 && cocktailIngredient8.trim().length > 0 && cocktailIngredient9.trim().length > 0 && cocktailIngredient10.trim().length > 0 && cocktailIngredient11.trim().length > 0 && cocktailIngredient12.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1 + " <br> " + "- " + response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2 + " <br> " + "- " + response.drinks[i].strMeasure3 + response.drinks[i].strIngredient3 + " <br> " + "- " + response.drinks[i].strMeasure4 + response.drinks[i].strIngredient4 + " <br> " + "- " + response.drinks[i].strMeasure5 + response.drinks[i].strIngredient5 + " <br> " + "- " + response.drinks[i].strMeasure6 + response.drinks[i].strIngredient6 + " <br> " + "- " + response.drinks[i].strMeasure7 + response.drinks[i].strIngredient7 + " <br> " + "- " + response.drinks[i].strMeasure8 + response.drinks[i].strIngredient8 + " <br> " + "- " + response.drinks[i].strMeasure9 + response.drinks[i].strIngredient9 + " <br> " + "- " + response.drinks[i].strMeasure10 + response.drinks[i].strIngredient10 + " <br> " + "- " + response.drinks[i].strMeasure11 + response.drinks[i].strIngredient11 + " <br> " + "- " + response.drinks[i].strMeasure12 + response.drinks[i].strIngredient12;
                            cocktailCardContent.append(cockTailIngredient);
                        } else if (cocktailIngredient1.trim().length > 0 && cocktailIngredient2.trim().length > 0 && cocktailIngredient3.trim().length > 0 && cocktailIngredient4.trim().length > 0 && cocktailIngredient5.trim().length > 0 && cocktailIngredient6.trim().length > 0 && cocktailIngredient7.trim().length > 0 && cocktailIngredient8.trim().length > 0 && cocktailIngredient9.trim().length > 0 && cocktailIngredient10.trim().length > 0 && cocktailIngredient11.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1 + " <br> " + "- " + response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2 + " <br> " + "- " + response.drinks[i].strMeasure3 + response.drinks[i].strIngredient3 + " <br> " + "- " + response.drinks[i].strMeasure4 + response.drinks[i].strIngredient4 + " <br> " + "- " + response.drinks[i].strMeasure5 + response.drinks[i].strIngredient5 + " <br> " + "- " + response.drinks[i].strMeasure6 + response.drinks[i].strIngredient6 + " <br> " + "- " + response.drinks[i].strMeasure7 + response.drinks[i].strIngredient7 + " <br> " + "- " + response.drinks[i].strMeasure8 + response.drinks[i].strIngredient8 + " <br> " + "- " + response.drinks[i].strMeasure9 + response.drinks[i].strIngredient9 + " <br> " + "- " + response.drinks[i].strMeasure10 + response.drinks[i].strIngredient10 + " <br> " + "- " + response.drinks[i].strMeasure11 + response.drinks[i].strIngredient11;
                            cocktailCardContent.append(cockTailIngredient);
                        } else if (cocktailIngredient1.trim().length > 0 && cocktailIngredient2.trim().length > 0 && cocktailIngredient3.trim().length > 0 && cocktailIngredient4.trim().length > 0 && cocktailIngredient5.trim().length > 0 && cocktailIngredient6.trim().length > 0 && cocktailIngredient7.trim().length > 0 && cocktailIngredient8.trim().length > 0 && cocktailIngredient9.trim().length > 0 && cocktailIngredient10.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1 + " <br> " + "- " + response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2 + " <br> " + "- " + response.drinks[i].strMeasure3 + response.drinks[i].strIngredient3 + " <br> " + "- " + response.drinks[i].strMeasure4 + response.drinks[i].strIngredient4 + " <br> " + "- " + response.drinks[i].strMeasure5 + response.drinks[i].strIngredient5 + " <br> " + "- " + response.drinks[i].strMeasure6 + response.drinks[i].strIngredient6 + " <br> " + "- " + response.drinks[i].strMeasure7 + response.drinks[i].strIngredient7 + " <br> " + "- " + response.drinks[i].strMeasure8 + response.drinks[i].strIngredient8 + " <br> " + "- " + response.drinks[i].strMeasure9 + response.drinks[i].strIngredient9 + " <br> " + "- " + response.drinks[i].strMeasure10 + response.drinks[i].strIngredient10;
                            cocktailCardContent.append(cockTailIngredient);
                        } else if (cocktailIngredient1.trim().length > 0 && cocktailIngredient2.trim().length > 0 && cocktailIngredient3.trim().length > 0 && cocktailIngredient4.trim().length > 0 && cocktailIngredient5.trim().length > 0 && cocktailIngredient6.trim().length > 0 && cocktailIngredient7.trim().length > 0 && cocktailIngredient8.trim().length > 0 && cocktailIngredient9.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1 + " <br> " + "- " + response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2 + " <br> " + "- " + response.drinks[i].strMeasure3 + response.drinks[i].strIngredient3 + " <br> " + "- " + response.drinks[i].strMeasure4 + response.drinks[i].strIngredient4 + " <br> " + "- " + response.drinks[i].strMeasure5 + response.drinks[i].strIngredient5 + " <br> " + "- " + response.drinks[i].strMeasure6 + response.drinks[i].strIngredient6 + " <br> " + "- " + response.drinks[i].strMeasure7 + response.drinks[i].strIngredient7 + " <br> " + "- " + response.drinks[i].strMeasure8 + response.drinks[i].strIngredient8 + " <br> " + "- " + response.drinks[i].strMeasure9 + response.drinks[i].strIngredient9;
                            cocktailCardContent.append(cockTailIngredient);
                        } else if (cocktailIngredient1.trim().length > 0 && cocktailIngredient2.trim().length > 0 && cocktailIngredient3.trim().length > 0 && cocktailIngredient4.trim().length > 0 && cocktailIngredient5.trim().length > 0 && cocktailIngredient6.trim().length > 0 && cocktailIngredient7.trim().length > 0 && cocktailIngredient8.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1 + " <br> " + "- " + response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2 + " <br> " + "- " + response.drinks[i].strMeasure3 + response.drinks[i].strIngredient3 + " <br> " + "- " + response.drinks[i].strMeasure4 + response.drinks[i].strIngredient4 + " <br> " + "- " + response.drinks[i].strMeasure5 + response.drinks[i].strIngredient5 + " <br> " + "- " + response.drinks[i].strMeasure6 + response.drinks[i].strIngredient6 + " <br> " + "- " + response.drinks[i].strMeasure7 + response.drinks[i].strIngredient7 + " <br> " + "- " + response.drinks[i].strMeasure8 + response.drinks[i].strIngredient8;
                            cocktailCardContent.append(cockTailIngredient);
                        } else if (cocktailIngredient1.trim().length > 0 && cocktailIngredient2.trim().length > 0 && cocktailIngredient3.trim().length > 0 && cocktailIngredient4.trim().length > 0 && cocktailIngredient5.trim().length > 0 && cocktailIngredient6.trim().length > 0 && cocktailIngredient7.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1 + " <br> " + "- " + response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2 + " <br> " + "- " + response.drinks[i].strMeasure3 + response.drinks[i].strIngredient3 + " <br> " + "- " + response.drinks[i].strMeasure4 + response.drinks[i].strIngredient4 + " <br> " + "- " + response.drinks[i].strMeasure5 + response.drinks[i].strIngredient5 + " <br> " + "- " + response.drinks[i].strMeasure6 + response.drinks[i].strIngredient6 + " <br> " + "- " + response.drinks[i].strMeasure7 + response.drinks[i].strIngredient7;
                            cocktailCardContent.append(cockTailIngredient);
                        } else if (cocktailIngredient1.trim().length > 0 && cocktailIngredient2.trim().length > 0 && cocktailIngredient3.trim().length > 0 && cocktailIngredient4.trim().length > 0 && cocktailIngredient5.trim().length > 0 && cocktailIngredient6.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1 + " <br> " + "- " + response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2 + " <br> " + "- " + response.drinks[i].strMeasure3 + response.drinks[i].strIngredient3 + " <br> " + "- " + response.drinks[i].strMeasure4 + response.drinks[i].strIngredient4 + " <br> " + "- " + response.drinks[i].strMeasure5 + response.drinks[i].strIngredient5 + " <br> " + "- " + response.drinks[i].strMeasure6 + response.drinks[i].strIngredient6;
                            cocktailCardContent.append(cockTailIngredient);
                        } else if (cocktailIngredient1.trim().length > 0 && cocktailIngredient2.trim().length > 0 && cocktailIngredient3.trim().length > 0 && cocktailIngredient4.trim().length > 0 && cocktailIngredient5.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1 + " <br> " + "- " + response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2 + " <br> " + "- " + response.drinks[i].strMeasure3 + response.drinks[i].strIngredient3 + " <br> " + "- " + response.drinks[i].strMeasure4 + response.drinks[i].strIngredient4 + " <br> " + "- " + response.drinks[i].strMeasure5 + response.drinks[i].strIngredient5;
                            cocktailCardContent.append(cockTailIngredient);
                        } else if (cocktailIngredient1.trim().length > 0 && cocktailIngredient2.trim().length > 0 && cocktailIngredient3.trim().length > 0 && cocktailIngredient4.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1 + " <br> " + "- " + response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2 + " <br> " + "- " + response.drinks[i].strMeasure3 + response.drinks[i].strIngredient3 + " <br> " + "- " + response.drinks[i].strMeasure4 + response.drinks[i].strIngredient4;
                            cocktailCardContent.append(cockTailIngredient);
                        } else if (cocktailIngredient1.trim().length > 0 && cocktailIngredient2.trim().length > 0 && cocktailIngredient3.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1 + " <br> " + "- " + response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2 + " <br> " + "- " + response.drinks[i].strMeasure3 + response.drinks[i].strIngredient3;
                            cocktailCardContent.append(cockTailIngredient);
                        } else if (cocktailIngredient1.trim().length > 0 && cocktailIngredient2.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1 + " <br> " + "- " + response.drinks[i].strMeasure2 + response.drinks[i].strIngredient2;
                            cocktailCardContent.append(cockTailIngredient);
                        } else if (cocktailIngredient1.trim().length > 0) {
                            cockTailIngredient = "- " + response.drinks[i].strMeasure1 + response.drinks[i].strIngredient1;
                            cocktailCardContent.append(cockTailIngredient);
                        } else {
                            console.log(false);
                        }


                        //-----------------------------------------------------



                        cocktailCard.append(cocktailCardImageDiv, cocktailCardContent);
                        $("#resultsBox").append(cocktailCard);
                    }


                    $("#searchBox").fadeOut(1000);
                    $("#resultsBox").delay(1000).show();
                });

            });
        });
    }
});
