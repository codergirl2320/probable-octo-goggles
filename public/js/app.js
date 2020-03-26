const app = angular.module('Trippr', []);

app.controller('MyController', ['$http', function($http){
    this.image = null;
    this.title = null;
    this.story = null;
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
              image:this.image,
              title:this.title,
              story:this.story
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
              image:this.updatedImage,
              title:this.updatedTitle,
              story:this.updatedStory
            }
        }).then(
            function(response){
                controller.updatedImage = null;// clears field
                controller.updatedTitle = null;// clears field
                controller.updatedStory = null;// clears field
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
                controller.trips = response.data;
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
