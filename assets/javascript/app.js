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


  var yumCall = function(search) {
    var apiKey = "_app_id=0fbe7e55&_app_key=6f1a83a5e371300fcbd1a3f859cddf85"
    var queryUrl = "http://api.yummly.com/v1/api/recipes?" + apiKey;

    $.ajax({
        url: queryUrl + search,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
  }

  $("#dish-btn").on("click", function (event) {
      event.preventDefault();
      var search;
      var ingredients = [];
      var exclude = [];

      if($("#ing-1").val() != null) {
        var ingredients = $("#ing-1").val();
        search += ingredients;
      }
      if($("#search-dish").val() != null) {
        var dishName = $("#dish-name").val();
        search += dishName
      }
      if($("#exclude").val() != null) {
        var  exclude = $("#exclude").val();
        search += exclude;
      }

      yumCall(search);
  });