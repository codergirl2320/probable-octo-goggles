const app = angular.module('Trippr', []);

app.controller('MyController', ['$http', function($http){
    this.username = null;
    this.password = null;
    this.loggedInUser = false;
    this.indexOfEditFormToShow = null;

    const controller = this;

    this.signup = function(){
        $http({
            method:'POST',
            url:'/users',
            data:{
              username:this.username,
              password:this.password
            }
        }).then(
            function(response){
                console.log(response);
                // after testing
                controller.loggedInUser = response.data;
            })
    }; //end of this.signup

    this.login = function(){
        $http({
            method:'POST',
            url:'/session',
            data:{
                username:this.loginUsername,
                password:this.loginPassword
            }
        }).then(
            function(response){
                if (response.data.username) {
                    controller.loggedInUser = response.data;
                } else {
                    controller.loginUsername = null;
                    controller.loginPassword = null;
                }
            });
    }; // end of this.login

    this.logout = function(){
        $http({
            method:'DELETE',
            url:'/session'
        }).then(
            function(){
                controller.loginUsername = null;
                controller.loginPassword = null;
                controller.signupUsername = null;
                controller.signupPassword = null;
                controller.loggedInUser = false;
            });
    }; // end of this.logout





    this.createTrip = function(){
        $http({
            method:'POST',
            url:'/trippr',
            data: {
              username:this.username,
              password:this.password
            }
        }).then(
            function(response){
                controller.place = null;
                controller.getTrip();
            },
            function(error){
                console.log(error);
            }
        )
    }; // end of create trip

    this.deleteTrip = function(trip){
        $http({
            method:'DELETE',
            url:'/trippr/' + trip._id  ///watch out for url path
        }).then(
            function(){
                controller.getTrip();
            },
            function(error){}
        )
    };// end of this.deleteTrip

    this.editTrip = function(trip){
        $http({
            method:'PUT',
            url:'/trippr/' + trip._id,
            data: {
                place:this.place
            }
        }).then(
            function(response){
                controller.indexOfEditFormToShow = null;
                controller.getTrip();
            },
            function(error){}
        )
    }; // end of this.editTrip

    this.getTrip = function(){
        $http({
            method:'GET',
            url:'/trippr'
        }).then(
            function(response){
                console.log(response);
            },
            function(error){}
        )
    }; // end of getTrip

    this.getTrip();

    $http({
        method:'GET',
        url:'/session'
    }).then(
        function(response){
            if (response.data.username) {
                controller.loggedInUser = response.data
            }
        })

}]; // end of app.controller
