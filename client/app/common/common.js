import angular from 'angular';
import Plnkr from './plnkr/plnkr';
import ExampleModule from './example/example';

let commonModule = angular.module('app.common', [
  Plnkr,
  ExampleModule
])

.name;

export default commonModule;
