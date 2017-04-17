class PlnkrController {
  constructor(ExampleManager){
    this._ExampleManager = ExampleManager;
  }

  $onInit() {
    console.log();
    this._ExampleManager.examplePath = this.examplePath;
    this.exampleData = this._ExampleManager.exampleData;
  }
}

PlnkrController.$inject = ['PlnkerExampleManager'];

export default PlnkrController;
