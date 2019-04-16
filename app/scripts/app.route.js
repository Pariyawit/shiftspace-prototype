'use strict';

/**
 * @ngdoc overview
 * @name shiftspaceApp
 * @description
 * # shiftspaceApp
 *
 * Main module of the application.
 */
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      }).when('/listspace', {
        templateUrl: 'views/owner/listspace.html',
        controller: 'ListSpaceCtrl',
        controllerAs: 'listSpace'
      }).when('/addspace', {
        templateUrl: 'views/owner/addspace.html',
        controller: 'AddSpaceCtrl',
        controllerAs: 'addSpace'
      // }).when('/addspace/:step', {
      //   templateUrl: 'views/owner/step-add-space/steps.html',
      //   controller: 'StepAddSpaceCtrl',
      //   controllerAs: 'stepAddSpace'
      }).when('/addspace/step1', {
        templateUrl: 'views/owner/step-add-space/steps.html',
        controller: 'AddStep1Ctrl',
        // controllerAs: 'stepAddSpace'
      }).when('/addspace/step2', {
        templateUrl: 'views/owner/step-add-space/steps.html',
        controller: 'AddStep2Ctrl',
        // controllerAs: 'stepAddSpace'
      }).when('/addspace/step3', {
        templateUrl: 'views/owner/step-add-space/steps.html',
        controller: 'AddStep3Ctrl',
        // controllerAs: 'stepAddSpace'
      })
      .when('/spaces/:spaceType/:keyword?', {
        templateUrl: 'views/spaces.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      }).when('/space/:spaceId', {
        templateUrl: 'views/space.html',
        controller: 'SpaceCtrl',
        controllerAs: 'space'
      }).when('/space-preview/:spaceId', {
        templateUrl: 'views/space_2.html',
        controller: 'SpacePreviewCtrl',
        controllerAs: 'space'
      }).otherwise({
        redirectTo: '/'
      });
  
    // $locationProvider.html5Mode({
    //              enabled: true,
    //              requireBase: false
    //       });
  });
