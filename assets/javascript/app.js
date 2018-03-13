
var config = {
apiKey: "AIzaSyAhzmSyewm-Vrt5huNVuAftTflrdMwBxEM",
authDomain: "project1-7a46c.firebaseapp.com",
databaseURL: "https://project1-7a46c.firebaseio.com",
projectId: "project1-7a46c",
storageBucket: "project1-7a46c.appspot.com",
messagingSenderId: "380507002059"
};

firebase.initializeApp(config);

var apiKey = "_app_id=0fbe7e55&_app_key=6f1a83a5e371300fcbd1a3f859cddf85"
var queryUrl = "http://api.yummly.com/v1/api/recipes?" + apiKey + "&maxResults=10&start=1";

var recipeArray= [];
var cardArray = [];

var generateCards = function(){
  for(var i = 0; i < cardArray.length; i++){
    var recipeCard =
     $("<div class='col s4 recipe-card'>" +
      "<div class='card'>" + 
      "<div class='card-image'>" + 
      "<img src=" + cardArray[i].images[0].hostedSmallUrl + ">" +
      "<span class='card-title'>" + cardArray[i].name + "</span>" + 
      "</div>" +
      "<div class='card-content'>" + 
      "<p class=recipe-p>Recipe: </p>" +
      "<a class='link' href='" + cardArray[i].source.sourceRecipeUrl + "'>" + cardArray[i].source.sourceDisplayName + "</a>" +
      "</div></div>");
  }
  $(".recipe-box").append(recipeCard);
}

var recipeCall = function(){
  for(var i= 0; i < recipeArray.length; i++){  
  var newUrl = "http://api.yummly.com/v1/api/recipe/" + recipeArray[i] + "?" + apiKey;
    $.ajax({
    url: newUrl,
    method: "GET"
  }).then(function(response){
    console.log(response);
    cardArray.push(response);
    generateCards();
  })
}
}


var yumCall = function(search) {

  $.ajax({
    url: search,
    method: "GET"
  }).then(function(response) {
      for(var j = 0; j < response.matches.length; j++){
      recipeArray.push(response.matches[j].id);
    }
    recipeCall();
  });
}

function generateTable(){
  $(".scrollbox").empty();
  var box = $("<div>");
  box.addClass("recipe-box")
  $(".scrollbox").append(box);
}

$("#zip-button").on("click", function(event){
  event.preventDefault();
  var zip = $("#zip-search").val().trim();
  var newMap = $("#map").attr("src", "https://www.google.com/maps/embed/v1/search?key=AIzaSyBG5a2EUHZpq-aoy20slw4V_TpzY2ZqIMc&q=grocery+stores+" + zip)
  console.log(newMap);
})


  function generateTable(){
      $(".scrollbox").empty();
      var box = $("<div>");
      box.addClass("recipe-box")
      $(".scrollbox").append(box);
    }
    
    $("#zip-button").on("click", function(event){
      event.preventDefault();
      var zip = $("#zip-search").val().trim();
      var newMap = $("#map").attr("src", "https://www.google.com/maps/embed/v1/search?key=AIzaSyBG5a2EUHZpq-aoy20slw4V_TpzY2ZqIMc&q=grocery+stores+" + zip)
      console.log(newMap);
    })
    
  $("#dish-btn").on("click", function (event) {
      event.preventDefault();
      var search = queryUrl;
      var ingredientArray = [];
      var excludeArray =[];

      if($("#search-dish").val() != "") {
        dishName = $("#search-dish").val().trim();
        dishName = dishName.split(" ").join('+');
        search += "&q=" + dishName
        console.log(dishName);
      }
      if($("#include-ingredient").val() != "") {
        var ingredients = $("#include-ingredient").val().trim();
        ingredientArray = ingredients.split(" ");
        for(var i = 0; i < ingredientArray.length; i++) {
          search += "&allowedIngredient[]=" + ingredientArray[i];
          console.log(ingredientArray[i]);
        }
      }
      if($("#exclude-ingredient").val() != "") {
         var exclude = $("#exclude-ingredient").val().trim();
         excludeArray = exclude.split(" ");
         for(var i = 0; i < ingredientArray.length; i++) {
          search += "&excludedIngredient[]=" + exclude;
          console.log(excludeArray[i]);
         }
      }
      console.log(search)
      if(search != queryUrl  )
        yumCall(search);
        generateTable();
       
  });
