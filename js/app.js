"use strict";

(function(){
  angular.module("wdinstagram", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("InstagramIndexController", InstagramIndexControllerFunc)
  .controller("InstagramShowController", InstagramShowControllerFunc)

  function RouterFunction($stateProvider) {
    $stateProvider
    .state("postIndex", {
        url: "/posts",
        templateUrl: "js/index.template.html",
        controller: "InstagramIndexController",
        controllerAs: "indexVm"
      })
    .state("postShow", {
        url: "/posts/:id",
        templateUrl: "js/show.template.html",
        controller: "InstagramShowController",
        controllerAs: "showVm"
      });
  }

  var dummyData = [
    {
      author: "guy1",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Abe_Vigoda.jpg",
      body: "ha, these are words"
    },
    {
      author: "guy2",
      photoUrl: "http://media1.fdncms.com/sacurrent/imager/con-air-nicolas-cage-is-the-best-nicolas-cage/u/original/2382699/nicolas-cage-as-cameron-poe-in-con-air-1997.jpg",
      body: "omg, these are words too"
    }
  ];

  function InstagramIndexControllerFunc(){

    var indexVm = this;
    indexVm.posts = dummyData

    indexVm.create = function(){
      dummyData.push(indexVm.newPost);
    };

    indexVm.edit = function(index){
      var post = indexVm.posts[index];
      indexVm.content = post;
    };

    indexVm.update = function(index){
      indexVm.posts[index] = indexVm.content;
    };

    indexVm.delete = function(index){
      indexVm.posts.splice(index, 1);
    }

  }

  InstagramShowControllerFunc.$inject = [ "$stateParams"];
  function InstagramShowControllerFunc ($stateParams){
      var showVm = this;
      showVm.post = dummyData[$stateParams.id]

      showVm.update = function() {
        dummyData[$stateParams.id] = showVm.post;
      }

      showVm.delete = function(){
        dummyData.splice($stateParams.id, 1);
      }



  };


})();
