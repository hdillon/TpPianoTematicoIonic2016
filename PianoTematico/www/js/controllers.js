angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $ionicPopup, $state) { 
  $scope.usuario = {};
  $scope.usuario.nombre = "";
  $scope.login = function() {
      if($scope.usuario.nombre == "")
        $scope.showAlert("POR FAVOR INGRESE SU NOMBRE");
      else{
        $scope.showAlert("BIENVENIDO " + $scope.usuario.nombre + "!");
        var usuario = { "nombre": $scope.usuario.nombre};
        $state.go('tab.jugar', usuario);
      }
    };

    $scope.showAlert = function(resultado) {
      var alertPopup = $ionicPopup.alert({
         title: resultado
      });
      alertPopup.then(function(res) {
         // Custom functionality....
      });
   };
})

.controller('JugarCtrl', function($scope, $ionicPopup, $state, $stateParams, $cordovaVibration,  $cordovaNativeAudio, $timeout) {
  $scope.usuario = angular.fromJson($stateParams);

$scope.reproducirSonido = function(idSonido) {
    switch(idSonido){
        case 'caballo':
          $scope.play('caballo');
        break;
        case 'leon':
          $scope.play('leon');
        break;
        case 'becerro':
          $scope.play('becerro');
        break;
        case 'pajarito':
          $scope.play('pajarito');
        break;
        case 'oveja':
          $scope.play('oveja');
        break;
        case 'gallo':
          $scope.play('gallo');
        break;
        default:
        break;
      }
  };

/****FUNCIONES NATIVE AUDIO****/
try{
  if(!$scope.seCargaronLosSonidos){
    $scope.seCargaronLosSonidos = true;
  $cordovaNativeAudio
      .preloadSimple('caballo', 'audio/caballo.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.log(error);
      });

  $cordovaNativeAudio
      .preloadSimple('leon', 'audio/leon.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.log(error);
      });

  $cordovaNativeAudio
      .preloadSimple('becerro', 'audio/becerro.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.log(error);
      });

  $cordovaNativeAudio
      .preloadSimple('pajarito', 'audio/pajarito.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.log(error);
      });

  $cordovaNativeAudio
      .preloadSimple('oveja', 'audio/oveja.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.log(error);
      });

  $cordovaNativeAudio
      .preloadSimple('gallo', 'audio/gallo.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.log(error);
      });
  }
}catch(err){
  console.log("No es un dispositivo mobile");
}

$scope.play = function (sound) {
  try{
  $cordovaNativeAudio.play(sound);
  }catch(err){
    console.log("No es un dispositivo mobile");
  }
};
/****FIN FUNCIONES NATIVE AUDIO****/

});
