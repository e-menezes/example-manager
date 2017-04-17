import template from './example.html';
import controller from './example.controller';
import './example.scss';

let exampleComponent = {
  restrict: 'E',
  bindings: {
    example: '<'
  },
  template,
  controller
};

export default exampleComponent;
