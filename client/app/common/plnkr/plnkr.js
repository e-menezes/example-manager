import angular from 'angular';
import uiRouter from 'angular-ui-router';
import plnkrComponent from './plnkr.component';
import service from './plnkr.service';

let plnkrModule = angular.module('plnkr', [
  uiRouter
])

.component('plnkr', plnkrComponent)
.service('PlnkerExampleManager', service)
.directive('runnableExample', [function() {
  var exampleClassNameSelector = '.runnable-example-file';
  var tpl = `
  <nav class="runnable-example-tabs" ng-if="tabs">
    <a ng-class="{active:$index==activeTabIndex}"
      ng-repeat="tab in tabs track by $index"
      href=""
      class="btn"
      ng-click="setTab($index)">
      {{ tab }}
    </a>
  </nav>`;

  return {
    restrict: 'A',
    scope: true,
    controller: ['$scope', function($scope) {
      $scope.setTab = function(index) {
        var tab = $scope.tabs[index];
        $scope.activeTabIndex = index;
        $scope.$broadcast('tabChange', index, tab);
      };
    }],
    compile: function(element) {
      element.html(tpl + element.html());
      return function(scope, element) {
        var node = element[0];
        var examples = node.querySelectorAll(exampleClassNameSelector);
        var tabs = [];
        angular.forEach(examples, function(child, index) {
          tabs.push(child.getAttribute('name'));
        });

        if (tabs.length > 0) {
          scope.tabs = tabs;
          scope.$on('tabChange', function(e, index, title) {
            angular.forEach(examples, function(child) {
              child.style.display = 'none';
            });
            var selected = examples[index];
            selected.style.display = 'block';
          });
          scope.setTab(0);
        }
      };
    }
  };
}])
.name;

export default plnkrModule;
