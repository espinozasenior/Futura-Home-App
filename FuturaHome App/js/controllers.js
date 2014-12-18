angular.module('starter.controllers', [])

// A simple controller that fetches a list of data from a service
.controller('IndexCtrl', function($scope, $http, $state, $location, $ionicPlatform, $rootScope, Aires, Historial) {
    $scope.resultado = 0; 
    $scope.calcular = function(metro3, ventanas, puertas) {
        $scope.resultado = 230 * metro3 + ((ventanas+puertas) * 476);
        console.log($scope.resultado);
        Aires.setBTU($scope.resultado);        
        /* $state.go("listac"); */
        Aires.setPath("listac");
        $state.go("promo");
    };
    $scope.btu = function(btu){
        Aires.setBTU(btu);  
        Aires.setPath("listacunique");
        $state.go("promo");
        /* $state.go("listacunique"); */
    }
})

.controller('ListCtrl', function($scope, $stateParams, $http, $state, $location, Aires) {   
    $scope.aires = Aires.all(); 
    $scope.godetail = function(id){
        Aires.setId(id);
        $state.go("aire");
    }
})
/* Controlador para la lista de BTU único*/
.controller('ListUniqueCtrl', function($scope, $stateParams, $http, $state, $location, Aires) {   
    $scope.aires = [];
    $scope.aires = Aires.allBTU();
    console.log($scope.aires);
    $scope.godetail = function(id){
        Aires.setId(id);
        $state.go("aire");
    }
})

.controller('DetailAcCtrl', function($scope, $stateParams, Aires) {   
    $scope.aire = Aires.getAc();    
})

.controller('PromoCtrl', function($scope, $http, $timeout, $state, Aires) {
    $scope.promo = []; 
    $scope.aire = [];
    var total = 0;  
    var flag = false;
    $scope.godetail = function(value){   
        console.log(value);
        Aires.setId(value);
        console.log("------------ ");
        $scope.aire = Aires.getAcById();
        flag = true;
        console.log($scope.aire);
        $state.go("aire");
    };
    
     $http.get("http://futurahome.com.uy/app/public/getpromo/")
     .success(function (response, data, status, headers, config) {
             total=response.length;              
            console.log(total);
              for(var i=0;i<total;i++){
                  var row ={imagen: response[i].imagen, id_aire: response[i].id_aire};
      		     $scope.promo.push(row);
      	      }
            $scope.promo.splice(total,total); 
         $timeout(function(){
             if(flag == false){
                $state.go(Aires.getPath()); 
             }
         }, 7000);
          }).error(function (data, status, headers, config) {
            console.log('error');
        });
    
})

.controller('MainCtrl', function($state, $ionicPlatform, $location, $scope, $ionicPlatform, $rootScope, Historial) {
    $ionicPlatform.onHardwareBackButton(function() {
       $scope.goBack();
  	});
    $scope.activo = "inactivo";
    
    $scope.goBack = function() {
        var item = '';
        if(Historial.size() > 1){
          item = Historial.pop(); 
          Historial.push2(item);  
        }else{
          navigator.app.exitApp();  
        }
        $state.go(Historial.top());
    };
    
     $scope.goForward = function() {
        if(Historial.size2() > 1){
          Historial.pop2();  
        }
        $state.go(Historial.top2());
    };
    
     $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        if(Historial.top() != $state.$current.self.name && $state.$current.self.name != "promo"){
            Historial.push($state.$current.self.name);
        }
         if(Historial.size() > 1){
             $scope.activo = "activo";
         }else{
             $scope.activo = "inactivo";
         }
        console.log("Top: "+Historial.top());
        console.log("Content: "+Historial.state());
	});
});

