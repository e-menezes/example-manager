import ExemploModule from './exemplo';
import ExemploController from './exemplo.controller';
import ExemploComponent from './exemplo.component';
import ExemploTemplate from './exemplo.html';

describe('Exemplo', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ExemploModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ExemploController();
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
      expect(ExemploTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ExemploComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ExemploTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ExemploController);
      });
  });
});
