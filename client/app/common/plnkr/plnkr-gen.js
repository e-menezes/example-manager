angular.module('plunker', [])

  .factory('plunkGenerator', function($document) {

    return function(ngVersion, bsVersion, version, module, content) {

      var form = angular.element(`
        <form style="display: none;" 
          method="post" 
          action="https://plnkr.co/edit/?p=preview" 
          target="_blank"
        >
        </form>
        `);
      var addField = function(name, value) {
        var input = angular.element(`<input type="hidden" name="${name}">`);
        input.attr('value', value);
        form.append(input);
      };

      var indexContent = function(content, version) {
        return `
          <!doctype html>
          <html ng-app="ui.bootstrap.demo">
            <head>
              <script src="//ajax.googleapis.com/ajax/libs/angularjs/${ngVersion}/angular.js"></script>
              <script src="//ajax.googleapis.com/ajax/libs/angularjs/${ngVersion}/angular-animate.js"></script>
              <script src="//ajax.googleapis.com/ajax/libs/angularjs/${ngVersion}/angular-sanitize.js"></script>
              <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-${version}.js"></script>
              <script src="example.js"></script>
              <link href="//netdna.bootstrapcdn.com/bootstrap/${bsVersion}/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
              ${content}
            </body>
          </html>`;
      };

      var scriptContent = function(content) {
        return `angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']); ${content}`;
      };

      addField('description', 'http://angular-ui.github.io/bootstrap/');
      addField('files[index.html]', indexContent(content.markup, version));
      addField('files[example.js]', scriptContent(content.javascript));

      $document.find('body').append(form);
      form[0].submit();
      form.remove();
    };
  })

  .controller('PlunkerCtrl', function($scope, plunkGenerator) {

    $scope.content = {};

    $scope.edit = function(ngVersion, bsVersion, version, module) {
      plunkGenerator(ngVersion, bsVersion, version, module, $scope.content);
    };
  })

  .directive('plunkerContent', function() {
    return {
      link: function(scope, element, attrs) {
        scope.content[attrs.plunkerContent] = element.text().trim();
      }
    };
  });
