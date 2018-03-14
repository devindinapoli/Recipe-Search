//Jeff's firebase
var config = {
  apiKey: "AIzaSyAhzmSyewm-Vrt5huNVuAftTflrdMwBxEM",
  authDomain: "project1-7a46c.firebaseapp.com",
  databaseURL: "https://project1-7a46c.firebaseio.com",
  projectId: "project1-7a46c",
  storageBucket: "project1-7a46c.appspot.com",
  messagingSenderId: "380507002059"
};

firebase.initializeApp(config);
//Andrew's API
var apiKey = "_app_id=0fbe7e55&_app_key=6f1a83a5e371300fcbd1a3f859cddf85"
var queryUrl = "https://api.yummly.com/v1/api/recipes?" + apiKey + "&maxResult=30&start=1";
var database = firebase.database();
var recipeArray= [];
var cardArray = [];

var generateCards = function(){
  for(var i = 0; i < cardArray.length; i++){
      var recipeCard =
      $("<div class='col s12 m6 l4 recipe-card'>" +
      "<div class='card'>" + 
      "<div class='card-image'>" + 
      "<img src=" + cardArray[i].images[0].hostedMediumUrl + ">" +
      "<span class='card-title'>" + cardArray[i].name + "</span>" + 
      "</div>" +
      "<div class='card-content'>" + 
      "<p class=recipe-p>Recipe: </p>" +
      "<a class='link' target='_blank' href='" + cardArray[i].source.sourceRecipeUrl + "'>" + cardArray[i].source.sourceDisplayName + "</a>" +
      "</div></div>");

    }
    $(".recipe-box").append(recipeCard);
}

var recipeCall = function(){
  console.log("Lists Off Each Recipe As An Object From Second Ajax Request:")
  for(var i= 0; i < recipeArray.length; i++){  
    var newUrl = "https://api.yummly.com/v1/api/recipe/" + recipeArray[i] + "?" + apiKey;
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

var yumCall = function(search){
  $.ajax({
    url: search,
    method: "GET"
  }).then(function(response) {
    console.log("List Of ID's From First Ajax Request:")
    for(var j = 0; j < response.matches.length; j++){
      recipeArray.push(response.matches[j].id);
      console.log(response.matches[j].id);
    }
    console.log("-----------------")
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
  //Devin's API
})
    
$("#dish-btn").on("click", function (event){
  cardArray = [];
  recipeArray = [];
  event.preventDefault();
  var search = queryUrl;
  var ingredientArray = [];
  var excludeArray =[];

  if($("#search-dish").val() != "") {
    dishName = $("#search-dish").val().trim();
    dishName = dishName.split(" ").join('+');
    search += "&q=" + dishName
    console.log("Name of the  dish:")
    console.log(dishName);
    console.log("-----------------")
  }
  if($("#include-ingredient").val() != "") {
    var ingredients = $("#include-ingredient").val().trim();
    ingredientArray = ingredients.split(", ");
    for(var i = 0; i < ingredientArray.length; i++){
      search += "&allowedIngredient[]=" + ingredientArray[i];
      console.log("Ingredients Allowed:")
      console.log(ingredientArray[i]);
      console.log("-----------------")
    }
  }
  if($("#exclude-ingredient").val() != ""){
    var exclude = $("#exclude-ingredient").val().trim();
    excludeArray = exclude.split(", ");
    for(var i = 0; i < ingredientArray.length; i++){
      search += "&excludedIngredient[]=" + excludeArray[i];
      console.log("Ingredients Excluded:")
      console.log(excludeArray[i]);
      console.log("-----------------")
    }
  }
  if(search != queryUrl){
    yumCall(search);
    generateTable();
  }
  $("#search-dish").val("");
  $("#include-ingredient").val("");
  $("#exclude-ingredient").val("");
  $("#map").attr("src", "https://www.google.com/maps/embed/v1/search?key=AIzaSyBG5a2EUHZpq-aoy20slw4V_TpzY2ZqIMc&q=grocery+stores+near+me");
  
  database.ref("/searches").push({
    dish: dishName,
    includedIngredients: ingredientArray,
    excludedIngredients: excludeArray,
  });
});

//initializes image carousel
$(document).ready(function(){
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  $('.carousel').carousel();
  setInterval(function() {
    $('.carousel').carousel('next');
    }, 3000); 
});
