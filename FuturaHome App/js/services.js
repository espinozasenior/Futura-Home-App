angular.module('starter.services', [])

.factory('Historial', function() {
  var pila = [];
  var pila2 = [];
    
  return {
    push: function(index) {
      	return pila.push(index);
    },
    pop: function() {
        return pila.pop();
    },
    top: function() {
      return pila[pila.length-1];
    },
    state: function(){
      return pila;    
    },
      size: function(){
          return pila.length;
      },
      /* Funciones para la otra pila */
    push2: function(index) {
      	return pila2.push(index);
    },
    pop2: function() {
        return pila2.pop();
    },
    top2: function() {
      return pila2[pila2.length-1];
    },
    state2: function(){
      return pila2;    
    },
      size2: function(){
          return pila2.length;
      }
  }
})

.factory('Aires', function($http) {
  var btu = 0;
  var aires = [];  
  var id = 0;
  var path = "";  
  return {
      setPath: function(valor){
          path = valor;
      },
      getPath: function(){
          return path;
      },
    all: function() {
        var total = 0;
        aires = [];
        $http.get("http://futurahome.com.uy/app/public/getac/"+btu
               ).success(function (response, data, status, headers, config) {
             total=response.length;
              
            console.log(total);
              for(var i=0;i<total;i++){
                  var row ={ id: response[i].id, nombre: response[i].nombre, descripcion: response[i].descripcion, btu: response[i].btu, costo: response[i].costo, imagen: response[i].imagen};
      		     aires.push(row);
      	      }
            aires.splice(total,total);
          }).error(function (data, status, headers, config) {
            console.log('error');
        });
      return aires;        
    },
      allBTU: function() {
        var total = 0;
        aires = [];
        $http.get("http://futurahome.com.uy/app/public/getelac/"+btu
               ).success(function (response, data, status, headers, config) {
             total=response.length;
              
            console.log(total);
              for(var i=0;i<total;i++){
                  var row ={ id: response[i].id, nombre: response[i].nombre, descripcion: response[i].descripcion, btu: response[i].btu, costo: response[i].costo, imagen: response[i].imagen};
      		     aires.push(row);
      	      }
            aires.splice(total,total);
          }).error(function (data, status, headers, config) {
            console.log('error');
        });
      return aires;        
    },
      getAcById: function() {
        var total = 0;
        aires = [];
        $http.get("http://futurahome.com.uy/app/public/acbyid/"+id
               ).success(function (response, data, status, headers, config) {
             total=response.length;
              
            console.log(total);
              for(var i=0;i<total;i++){
                  var row ={ id: response[i].id, nombre: response[i].nombre, descripcion: response[i].descripcion, btu: response[i].btu, costo: response[i].costo, imagen: response[i].imagen};
      		     aires.push(row);
      	      }
            aires.splice(total,total);
          }).error(function (data, status, headers, config) {
            console.log('error');
        });
      return aires;        
    },
      setBTU: function(valor){
          aires = [];
          btu = valor;
      },
      getAc: function(){
          aires = [];
          var length = aires.length;
          for(var i=0;i<length;i++){
              if(aires[i].id == id){return aires[i];}
          }
      },
      setId: function(valor){
          id = valor;
      }
  }
});
