var prox = angular
    .module('prox', [
        'ngResource',
        'ngSanitize',
        'ui.router',
        'LocalStorageModule'
    ])
    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, localStorageServiceProvider) {

        localStorageServiceProvider.setPrefix('Prox');

        var siteName = 'Prox';
        $stateProvider
        .state('home', {
            url         : '/',
            templateUrl : 'views/home.html',
            controller  : 'HomeController'
        })
        .state('diagnostics', {
            url         : '/diagnostics',
            templateUrl : 'views/diagnostics.html',
            controller  : 'DiagnosticsController'
        });
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);
});
