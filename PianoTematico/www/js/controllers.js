angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $ionicPopup, $state, $timeout) { 
  $scope.loginData={};
    $scope.loginData.username = "dillonhoraciodavid@gmail.com";
    $scope.loginData.password = "34551422";

    $scope.loguear = function() {
      if($scope.loginData.username == "" || $scope.loginData.password == "")
        $scope.showAlert("DEBE IMGRESAR MAIL Y PASSWORD!");
      else{
      firebase.auth().signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password).catch(function(error) {
        $scope.showAlert("DATOS INCORRECTOS!");
        console.info("error", error);
 
      }).then(function(respuesta){
        $timeout(function(){
          //console.info("RESP", firebase.auth().currentUser);
          /*console.info("Esta Autenticado", respuesta.emailVerified);
          console.info("respuesta", respuesta);*/
          if(firebase.auth().currentUser != null){
            $scope.showAlert("BIENVENIDO!");
            $state.go('app.jugar');
          }
          
        });
        
      });
     }
   }

//emailVerified: false

    $scope.resetearPass = function() {
     firebase.auth().sendPasswordResetEmail($scope.loginData.username)
     .then(function(respuesta){
        console.info("respuestaReset", respuesta);
     }).catch(function(error){
      console.info("Se ropio el reset", error);

     });
     
    }
    
    $scope.verificarEmail = function() {
      alert("asd");
     
    }

    $scope.showAlert = function(resultado) {
      var alertPopup = $ionicPopup.alert({
         title: resultado
      });
      alertPopup.then(function(res) {
         // Custom functionality....
      });
   }
})

.controller('JugarCtrl', function($scope, $ionicPopup, $state, $stateParams, $cordovaVibration,  $cordovaNativeAudio, $timeout, $cordovaFile) {
  //$scope.usuario = angular.fromJson($stateParams);
  $scope.leon = 'img/leon.jpg';
  $scope.gallo = 'img/gallo.jpg';
  $scope.becerro = 'img/becerro.jpg';
  $scope.pajarito = 'img/pajarito.jpg';
  $scope.caballo = 'img/caballo.jpg';
  $scope.oveja = 'img/oveja.jpg';
  $scope.fileContent ="";
  

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

$scope.leer = function() {
  try{
    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "piano.txt")
          .then(function (success) {
            console.info("SUCCES READ: ", success);
            $scope.fileContent = success.split("\n");
            console.info("SPLITEO: ", $scope.fileContent);    
            $scope.reproducirSecuencia();//LLAMO A LA FUNCION QUE REPRODUCE LA SECUENCIA CON EL ARRAY LEÍDO
          }, function (error) {
            console.info("ERROR READ: ", error);
          });
  }catch(err)
  {
    console.info("Error leyendo archivo: ", err); 
  }
}

$scope.reproducirSecuencia = function() {
  try{
    for (var i = 1; i < $scope.fileContent.length - 1; i++) {
    //alert($scope.fileContent[i]);
      $scope.reproducirSonido($scope.fileContent[i], false);
      $scope.sleep(1700);
    }
  }catch(err)
  {
    console.info("Error reproducirSecuencia: ", err); 
  }
}

$scope.sleep = function(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
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

.controller('AutorCtrl', function($scope, $cordovaInAppBrowser) {
  $scope.miFoto = 'img/perfil.png';
  var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

  $scope.InAppBrowser=function(){
    $cordovaInAppBrowser.open('https://github.com/hdillon', '_system', options);
  }

})

.controller('InicioCtrl', function($scope) {
  
})


.controller('AppCtrl', function($scope, $timeout) {


})

.controller('LogoutCtrl', function($scope, $state, $timeout, $ionicHistory) {

    $scope.desloguear = function(confirmacion) {
      $ionicHistory.nextViewOptions({//ESTA CONFIG HACE QUE NO ME APAREZCA EL BTN BACK CUANDO HAGO UN STATE GO A OTRA VIEW
        disableBack: true
      });
      
      if(confirmacion == 'SI'){
        firebase.auth().signOut().then(function(){
          $timeout(function(){
            console.info("outLogin", firebase.auth().currentUser);
            $state.go('login');
          });
          
        });
       }else
         $state.go('app.jugar');
     }


})






