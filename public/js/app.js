const app = angular.module('Trippr', []);

app.controller('MyController', ['$http', function($http){
    this.image = null;
    this.title = null;
    this.story = null;
    this.loggedInUser = false;
    this.indexOfEditFormToShow = null;
    this.indexOfTripToShow = null;

// MODAL VIEW CHANGE VARIABLES
// ==========================

    this.bodyChange = false;
    this.showLogIn = false;
    this.showCreate = false;
    this.showForm = true;

    console.log(this.bodyChange);
    console.log(this.showLogIn);
    console.log(this.showForm);
    console.log(this.showCreate);
// LIKE COUNTER
//====================

    this.like = 0;


    const controller = this;



    this.signup = function(){
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
                controller.showForm = true;
                controller.bodyChange = false;
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
                    controller.showForm = true;
                    controller.bodyChange = false;
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
                controller.showLogIn = false;
                controller.showCreate = false;
                controller.showForm = true;
            });
    }; // end of this.logout





    this.createTrip = function(){
        controller.showCreate = !controller.showCreate;
        controller.showForm = !controller.showForm
        $http({
            method:'POST',
            url:'/trippr',
            data: {
              image:this.image,
              title:this.title,
              story:this.story,
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
      controller.showLogin = false
      controller.showForm = !controller.showForm
    }

// show signup/login modal

    this.toggleLogIn = () => {
      controller.showLogIn = !controller.showLogIn
      controller.bodyChange = !controller.bodyChange;
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

// Adding a like emoticon

this.like ={
  count: 0
}

        this.addLike = (like) => {
          // like[0]++;
          // this.getTrip();
        };



        this.removeLike = (like) => {
          // like[0]--;
        };




}]); // end of app.controller
