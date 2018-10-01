angular.module('americanExperian').service('sharedProperties',function(){
    var property = {};    

    return{
        getProperty: function(){
            return property;
        },
        setProperty: function(value){
           property = value;
        }
    };

});