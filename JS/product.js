app.controller("proCtrl",function($scope,$http,$routeParams,$route){
  $http({
    method: "get",
    url: "../database/product.json",
    dataType: "json",
    contentType: "application/json",
  }).then(
    function ($data) {
      $scope.items = $data.data.items;
      $scope.number= $routeParams.number;
      switch($scope.number){
        case "0":
          $scope.title = "SẢN PHẨM MỚI";
          $scope.numb = "";
          break;
        case "1":
          $scope.title = "ÁO";
          $scope.numb = "1";
          break;
        case "2":
          $scope.title = "QUẦN";
          $scope.numb = "2";
          break;
        case "3":
          $scope.title = "VÁY";
          $scope.numb = "3";
          break;
        case "4":
          $scope.title = "ĐẦM";
          $scope.numb = "4";
          break;
      }
      $scope.totalItem=0;
      for(let i of $scope.items){
        if($scope.number==="0"){ $scope.totalItem=$scope.items.length-1; break;}
        else
        if(i.type.toString()===$scope.number) $scope.totalItem++;
      }
      $scope.page=[];
      $scope.totalPage= Math.ceil($scope.totalItem/6);
      for(let i=1;i<=$scope.totalPage;i++) $scope.page.push(i);
      $scope.begin= $routeParams.page?$routeParams.page:"0";
      $scope.begin= Number($scope.begin)*6;
      $scope.cart = sessionStorage.getItem('cart')?JSON.parse(sessionStorage.getItem('cart')):[];
    },
    function ($error) {
      console.log("there was an error", $error);
    }
  );
  $scope.addItem=(item)=>{
    let check=0;
    $scope.cart= $scope.cart.map(e =>{if(item.name===e.name) {e.quantity++; check=1;}; return e;})
    if(check==0) {
      item.quantity=1;
      item.id=$scope.cart.length;
      $scope.cart.push(item);
    }
    sessionStorage.setItem('cart',JSON.stringify($scope.cart));
  }

  $scope.thanhtien = (item) => {
    item.thanhtien = item.quantity * item.price;
    $scope.sum = 0;
    let check = $scope.cart
      .map(function (e) {
        return e.id;
      })
      .indexOf(item.id)
    $scope.cart[check].quantity=item.quantity;
    for (let i of $scope.cart) $scope.sum += i.thanhtien;
    sessionStorage.setItem('cart',JSON.stringify($scope.cart));
  };
  $scope.delete = (item)=>{
    let check = $scope.cart
      .map(function (e) {
        return e.id;
      })
      .indexOf(item.id); //
    if (check > -1) {
    $scope.cart.splice(check, 1); // 2nd parameter means remove one item only
    for(let i=0;i<$scope.cart.length;i++){
      $scope.cart[i].id=i;
    }
    sessionStorage.setItem('cart',JSON.stringify($scope.cart));
    $route.reload();
}}
  $scope.name1=$scope.diachi1=$scope.email1="";
  $scope.pay= ()=>{
    sessionStorage.clear();
    $route.reload();
  }
});
