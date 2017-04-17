import PlnkrModule from './plnkr';
import PlnkrController from './plnkr.controller';
import PlnkrComponent from './plnkr.component';
import PlnkrTemplate from './plnkr.html';

describe('Plnkr', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PlnkrModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PlnkrController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(PlnkrTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PlnkrComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PlnkrTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PlnkrController);
      });
  });
});
