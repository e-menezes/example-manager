import angular from 'angular';
import uiRouter from 'angular-ui-router';
import exemploComponent from './exemplo.component';

let exemploModule = angular.module('exemplo', [
  uiRouter
])

.config(['$stateProvider', ($stateProvider) => {

  $stateProvider
    .state('exemplo', {
      url: '/exemplo/:exampleName',
      component: 'example',
      resolve: {
        example: ['$stateParams', '$http', '$q', ($stateParams, $http, $q) => {
          let deferred = $q.defer();
          $http.get(`exemplos/${$stateParams.exampleName}/manifest.json`)
            .then((response) => { return {manifest: response.data}; })
            .then((ex) => {
              console.log(ex);
              let promises = {};
              angular.forEach(ex.manifest.files, (value) => {
                promises[value] = $http.get(`exemplos/${ex.manifest.name}/${value}`);
              });
              return $q.all(promises).then((values) => {
                angular.forEach(ex.manifest.files, (value) => {
                  ex[value] = values[value].data;
                  console.log(ex);
                });
                deferred.resolve(ex);
              });
            });
          return deferred.promise;
        }]
      }
    });
}])

.component('exemplo', exemploComponent)

.name;

export default exemploModule;
