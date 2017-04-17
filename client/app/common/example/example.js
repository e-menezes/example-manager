import angular from 'angular';
import uiRouter from 'angular-ui-router';
import exampleComponent from './example.component';

let exampleModule = angular.module('example', [
  uiRouter
])

.component('example', exampleComponent)

.name;

export default exampleModule;
