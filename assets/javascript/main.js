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
var search;
var dataMuseQuery;
console.log(search);



$("#submitButton").on("click", function(event) {

    event.preventDefault();

    var textValue = $("#wordSearch").val().trim();
    search = textValue.split(" ").join("+");
    console.log(search);
    
    
    console.log(search);
    $("#submitButton").off("click")




    dataMuseQuery = "https://cors-escape.herokuapp.com/https://api.datamuse.com/words?ml=" + search;

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

