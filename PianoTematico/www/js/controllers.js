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
        $state.go('app.jugar', usuario);
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

.controller('JugarCtrl', function($scope, $ionicPopup, $state, $stateParams, $cordovaVibration,  $cordovaNativeAudio, $timeout, $cordovaFile) {
  $scope.usuario = angular.fromJson($stateParams);
  $scope.leon = 'img/leon.jpg';
  $scope.gallo = 'img/gallo.jpg';
  $scope.becerro = 'img/becerro.jpg';
  $scope.pajarito = 'img/pajarito.jpg';
  $scope.caballo = 'img/caballo.jpg';
  $scope.oveja = 'img/oveja.jpg';
  

$scope.reproducirSonido = function(idSonido, flagGuardar) {

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

      if(flagGuardar)
        $scope.guardar(idSonido + "\n");

  };


$scope.guardar = function(idSonido) {
  try{
    $cordovaFile.checkFile(cordova.file.externalDataDirectory, "piano.txt")
      .then(function (success) {

        $cordovaFile.writeExistingFile(cordova.file.externalDataDirectory, "piano.txt", idSonido)
            .then(function (success) {

            }, function (error) {
            
            });
      }, function (error) {
        
        $cordovaFile.createFile(cordova.file.externalDataDirectory, "piano.txt", true)
          .then(function (success) {

          }, function (error) {

          });

        $cordovaFile.writeFile(cordova.file.externalDataDirectory, "piano.txt", "USUARIO\n", true)
          .then(function (success) {

          }, function (error) {

          });
      });
  } catch(err){
    console.log("No es un dispositivo mobile");
  }
      
}




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
  console.info("ERROR AL CARGAR AUDIOS: ", err);
}

$scope.play = function (sound) {
  try{
  $cordovaNativeAudio.play(sound);
  }catch(err){
    console.log("No es un dispositivo mobile");
  }
};
/****FIN FUNCIONES NATIVE AUDIO****/


/****FUNCIONES FILE****/
document.addEventListener('deviceready', function () {



  });

/****FIN FUNCIONES FILE****/

})

.controller('AcercadeCtrl', function($scope) {
  $scope.miFoto = 'img/perfil.png';
})

.controller('InicioCtrl', function($scope) {
  
})




//BORRAR ******************************************************************************************************
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})






