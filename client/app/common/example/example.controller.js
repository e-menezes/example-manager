class ExampleController {
  constructor($sce) {
    this.name = 'example';
    this.$sce = $sce;
  }

  $onInit() {
    this.url = `exemplos/${this.example.manifest.name}/result.html`;
    this.page = this.$sce.trustAsHtml(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="exemplos/${this.example.manifest.name}/index.html"></script>
</head>
<body>    
    <div ng-app="myApp">
  <div ng-controller="myController">
    <h1 ng-bind="titulo"></h1>
    <h3 ng-bind="subtitulo"></h3>
    <p ng-bind="saudacao"></p>
  </div>
</div>
</body>
</html>
    `);

  }
}
ExampleController.$inject = ['$sce'];
export default ExampleController;
