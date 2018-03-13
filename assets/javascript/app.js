// Initialize Firebase
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
var queryUrl = "http://api.yummly.com/v1/api/recipes?" + apiKey;


var yumCall = function(search) {

  $.ajax({
    url: search,
    method: "GET"
    }).then(function(response) {
    console.log(response);
  });
}

function generateTable(){
  $(".scrollbox").empty();
  var box = $("<div>");
  box.addClass("recipe-box")
  $(".scrollbox").append(box);
}

$("#dish-btn").on("click", function (event) {
  event.preventDefault();
  var search = queryUrl;
  var ingredients;
  var exclude;

  if($("#search-dish").val() != "") {
    dishName = $("#search-dish").val().trim();
    search += "&q=" + dishName
    console.log(dishName);
  }
  if($("#include-ingredient").val() != "") {
    ingredients = $("#include-ingredient").val().trim();
    search += "&allowedIngredient[]=" + ingredients;
    console.log(ingredients);
  }
  if($("#exclude-ingredient").val() != "") {
    exclude = $("#exclude-ingredient").val().trim();
    search += "&excludedIngredient[]=" + exclude;
    console.log(exclude);
  }
  console.log(search)
  if(search != queryUrl){
  yumCall(search);
  }
  
  generateTable();

});

$("#zip-button").on("click", function(event){
  event.preventDefault();
  var zip = $("#zip-search").val().trim();
  var newMap = $("#map").attr("src", "https://www.google.com/maps/embed/v1/search?key=AIzaSyBG5a2EUHZpq-aoy20slw4V_TpzY2ZqIMc&q=grocery+stores+" + zip)


  console.log(newMap);

})
