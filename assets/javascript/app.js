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

var apiKey = "_app_id=0fbe7e55&_app_key=6f1a83a5e371300fcbd1a3f859cddf85" //Andrew's API key
var queryUrl = "https://api.yummly.com/v1/api/recipes?" + apiKey  + "&requirePictures=true";
var database = firebase.database();
var recipeArray= [];
var cardArray = [];
var favArray = [];

/*-----------------------------------------------FUNCTIONAL FUNCTIONS------------------------------------------------------------------ */
var generateCards = function(array){
  for(var i = 0; i < array.length; i++){
      var recipeCard =
      $("<div class='col s12 m6 l4 recipe-card'>" +
      "<div class='card'>" + 
      "<div class='card-image'>" + 
      "<img src=" + array[i].images[0].hostedMediumUrl + ">" +
      "<span class='card-title'>" + array[i].name + "</span>" + 
      "</div>" +
      "<div class='card-content'>"+ "<br/>" + 
      "<p class=recipe-p>Recipe: </p>" +
      "<i class='material-icons fav-icon' id=" + array[i].id + ">favorite</i>" +
      "<a class='link' target='_blank' href='" + array[i].source.sourceRecipeUrl + "'>" + array[i].source.sourceDisplayName + "</a>" +
      "</div></div>");

    }
    $(".recipe-box").append(recipeCard);
}

// This AJAX function will only be ran after our 1st call. It's purpose is to get specific information about each recipe that came from yumCall
var recipeCall = function(){
  console.log("Lists Off Each Recipe As An Object From Second Ajax Request:")
  for(var i= 0; i < recipeArray.length; i++){  
    var newUrl = "https://api.yummly.com/v1/api/recipe/" + recipeArray[i] + "?" + apiKey;
      $.ajax({
      url: newUrl,
      method: "GET"
    }).then(function(response){
      //console.log(response); // this will show all recipes as objs in console
      cardArray.push(response);
      generateCards(cardArray);
    })
  }
}

// this ajax function is what searches through yummly's api and brings back results based on parameters given.
// we pushed the ids of each recipe from THIS response into an array.
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
    console.log(queryUrl);
  });
}

function generateTable(){
  $(".scrollbox").empty();
  var box = $("<div>");
  box.addClass("recipe-box")
  $(".scrollbox").append(box);
}

/*-----------------------------------------------EVENT HANDLERS------------------------------------------------------------------ */
$("#zip-button").on("click", function(event){
  event.preventDefault();
  var zip = $("#zip-search").val().trim();
  var newMap = $("#map").attr("src", "https://www.google.com/maps/embed/v1/search?key=AIzaSyBG5a2EUHZpq-aoy20slw4V_TpzY2ZqIMc&q=grocery+stores+" + zip)
  console.log(newMap);
  //Devin's API
})

$("#fav-btn").on("click", function() {
  // pul
});
    
// The big doozy. this on click handler will check to see what inputs the user has and has not filed
// this function generates a var 'search' that holds all needed search parameters to be fed to our yumCall()
$("#dish-btn").on("click", function (event){
  cardArray = [];
  recipeArray = [];
  event.preventDefault();
  var limit = 30;
  var search = "";
  var ingredientArray = [];
  var excludeArray =[];
  var random = Math.floor(Math.random() * 150) + 1;


// Default search conditionals
  // if user has entered a dish name, execute.
  if($("#search-dish").val() != "") {
    dishName = $("#search-dish").val().trim();
    dishName = dishName.split(" ").join('+');
    search += "&q=" + dishName

    console.log("Name of the  dish:")
    console.log(dishName);
    console.log("-----------------")
  }

  // if user has included ingredients
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

  // if user has excluded any ingredients
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
  // if they selected a value for the course drop down
  if($('select#course-dropdown option:selected').val() != "none") {
    search += "&allowedCourse[]=" + $('select#course-dropdown option:selected').val();
  }

// advance search conditionals
  // checking for cuisine input
  if($('select#cuisine-dropdown option:selected').val() != "none") {
    search += "&allowedCuisine[]=" + $('select#cuisine-dropdown option:selected').val();
  }

  // checking for diet input
  if($('select#diet-dropdown option:selected').val() != "none") {
    search += "&allowedDiet[]=" + $('select#diet-dropdown option:selected').val();
  }

  // checking for result limit value
  if($("#limit-input").val() != "") {
    search += "&maxResult=" + $("#limit-input").val();
  }

  // check for max time input and then convert to seconds to work with yummly api
  if($("#time-input").val() != "") {
    var toSec = $("#time-input").val() * 60;
    search += "&maxTotalTimeInSeconds=" + toSec;
  }

  //  var search will equal a blank string unless the user inputs something to at least one field 
  if(search != "") {
    yumCall(queryUrl + search + "&start=" + random);
    console.log(search)
    generateTable();
  } else {
    // if our user has input nothing lets just return random results at defult limit (30) bc we are generous.
     orgUrl = queryUrl + "&maxResult=" + limit + "&start=" + random;
     yumCall(orgUrl);
     generateTable();
  }
  $("#search-dish").val("");
  $("#include-ingredient").val("");
  $("#exclude-ingredient").val("");
  $("#map").attr("src", "https://www.google.com/maps/embed/v1/search?key=AIzaSyBG5a2EUHZpq-aoy20slw4V_TpzY2ZqIMc&q=grocery+stores+near+me");


/*-----------------------------------------------Materialize LOGIC------------------------------------------------------------------ */
  //page moves to recipes scrollbox after submit button is clicked
  $('html, body').animate({
    scrollTop: $(".scrollbox").offset().top
  }, 1000);

}); // end of our dish-btn event listener

//initializes image carousel
$(document).ready(function(){
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  $('.carousel').carousel();
  setInterval(function() {
    $('.carousel').carousel('next');
    }, 3000); 
  //initializes dropdown in general search
  $('select').material_select();  
});

//toggles advanced-search section upon click of advanced-search button
$("#advanced-button").click(function() {
  $(".advanced-search").toggle();
});

/*-----------------------------------------------FIREBASE LOGIC------------------------------------------------------------------ */
$(document).ready(function() {
  $(document).on("click", ".fav-icon", function() {
    var recipeName = $(this).attr("id");
    database.ref("/searches").push({ savedRecipes: recipeName});
    favArray.push(recipeName);
    console.log(favArray);
  });
  
  
})

