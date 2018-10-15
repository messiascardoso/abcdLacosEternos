angular.module('abcdlacosEternos').factory('ModalAlertService', function($uibModal) {
    
    var modal ='';
    var success = 'Success...';
    var error = 'Error...';


    return {
      messageSuccess: function(size) {
        return $uibModal.open({
          animation: true,
          template: "<div class='alert alert-success text-center alert-dismissible' role='alert'>"+
                     "<a class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
                    "<strong>"+success+"</strong></div>",
      
        });
      },
      messageError: function(size) {
        return $uibModal.open({
          animation: true,
          template: "<div class='alert alert-danger text-center alert-dismissible' role='alert'>"+
                     "<a class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+
                    "<strong>"+error+"</strong></div>",
      
        });
      },

       messageDel: function(size) {
        return $uibModal.open({
          animation: true,
          templateUrl: "partials/modalDel.html",
          controller: 'ModalController',
      
        });
        
      }
     
      
    };
      
      


  }); //fim factory


//href='#'


 /* return {
      open: function(size, template) {
        return $uibModal.open({
          animation: true,
          templateUrl: template || 'myModalContent.html',
          controller: 'ModalResultInstanceCtrl',
          size: size,
         resolve: {
            params: function() {
              return params;
            }
          }
        });
      }
    };*/