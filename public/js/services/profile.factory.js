angular.module('abcdlacosEternos')
    .factory('Profile',function () {

    var roles = [];
    
      
    function setRoles(roles) {
        this.roles = roles;
    }
    
    function isAdmin() {
        return contains(this.roles, 'ADMIN');
    }
    
    function isVisualization() {
        return contains(this.roles, 'VISUALIZATION');
    }
    
    function isModification() {
        return contains(this.roles, 'MODIFICATION');
    }
    
    function isPartner() {
        return contains(this.roles, 'PARTNER');
    }
    
    function contains(array, element) {
       
	   return array && array.indexOf(element) > -1 ;
       
    }

     return {
        setRoles: setRoles,
        isAdmin: isAdmin,
        isVisualization: isVisualization,
        isModification: isModification,
        isPartner: isPartner
    };

});