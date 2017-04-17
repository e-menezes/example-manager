import angular from 'angular';
import Home from './home/home';
import Exemplo from './exemplo/exemplo';

let componentModule = angular.module('app.components', [
  Home,
  Exemplo
])

.name;

export default componentModule;
