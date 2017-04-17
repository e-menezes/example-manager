import template from './plnkr.html';
import controller from './plnkr.controller';
import './plnkr.scss';

let plnkrComponent = {
  restrict: 'E',
  bindings: {
    examplePath: '@'
  },
  template,
  controller
};

export default plnkrComponent;
