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
        ingredients = $("#include-ingredient").val().trim();
        search += "&allowedIngredient[]=" + ingredients;
        console.log(ingredients);
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

  });