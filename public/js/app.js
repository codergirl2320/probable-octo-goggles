const app = angular.module('Trippr', []);

app.controller('MyController', ['$http', function($http){
    this.image = null;
    this.title = null;
    this.story = null;
    this.loggedInUser = false;
    this.indexOfEditFormToShow = null;
    this.indexOfTripToShow = null;
    this.bodyChange = false;
    this.showSignup = false;
    this.showLogin = false;
    this.showCreate = false;
    this.showForm = true;


    const controller = this;



    this.signup = function(){
      controller.showForm = true;
        $http({
            method:'POST',
            url:'/users',
            data:{
              username:this.signupUsername,
              password:this.signupPassword
            }
        }).then(
            function(response){
                console.log(response);
                // after testing
                controller.loggedInUser = response.data;
            })
    }; //end of this.signup

    this.login = function(){
      controller.showForm = true;
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
                controller.title = null;
                controller.story = null;
                controller.image = ' ';
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

// CONTENT DISPLAY FUNCTIONS
//=====================

// show create form


    this.toggleCreate = () => {
      this.showCreate = !this.showCreate
      controller.showSignup = false
      controller.showLogin = false
      controller.showForm = !controller.showForm


    }

// show signup modal

    this.toggleSignup = () => {
      this.bodyChange = !this.bodyChange
      controller.showSignup = !controller.showSignup
      controller.showLogin = false
      controller.showForm = !controller.showForm
      controller.showCreate = false
    }

// show login modal

    this.toggleLogin = () => {
      this.bodyChange = !this.bodyChange
      controller.showLogin = !controller.showLogin
      controller.showSignup = false
      controller.showForm = !controller.showForm
      controller.showCreate = false
    }





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


}]); // end of app.controller
