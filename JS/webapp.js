var app= angular.module("myApp",["ngRoute"]);
app.config(function($routeProvider){
  $routeProvider
    .when("/home",{
      templateUrl: "../HTML/trang_chu.html?" + Math.random(),
      controller: "proCtrl"
    })
    .when("/product/:number",{
      templateUrl: "../HTML/product.html?" + Math.random(),
      controller: "proCtrl"
    })
    .when("/product/:number/:page",{
      templateUrl: "../HTML/product.html?" + Math.random(),
      controller: "proCtrl"
    })
    .when("/cart",{
      templateUrl: "../HTML/payment.html?" + Math.random(),
      controller: "proCtrl"
    })
    .otherwise({redirectTo:"/home"})
})