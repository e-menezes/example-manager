class PlnkrExampleService{
  constructor($q, $http){
    this._q = $q;
    this._http = $http;
    console.log('PlnkrExampleService constructor');
  }

  set examplePath(examplePath){
    this.example = {
      path: examplePath,
      manifest: undefined,
      files: undefined,
      name: 'AngularJS Example'
    };
    this.prepareExampleData(this._q)
      .then( (data) => {
        this.example.name = data.name;
        this.example.manifest = data.manifest;
        this.example.files = data.files;
      });
  }

  get exampleData(){
    return this.example;
  }

  prepareExampleData($q) {
    if (this.example.manifest) {
      return $q.resolve(this.example);
    }

    return this.getExampleData(this.exampleData.path, this._http, this._q)
      .then( (data) => {
        this.example.files = data.files;
        this.example.manifest = data.manifest;
        // Build a pretty title for the Plunkr
        var exampleNameParts = data.manifest.name.split('-');
        exampleNameParts.unshift('AngularJS');
        angular.forEach(exampleNameParts, function(part, index) {
          exampleNameParts[index] = part.charAt(0).toUpperCase() + part.substr(1);
        });
        this.example.name = exampleNameParts.join(' - ');
        return this.example;
      });
  }

  getExampleData(exampleFolder, $http, $q) {
    // Load the manifest for the example
    return $http.get(exampleFolder + '/manifest.json')
      .then(function(response) {
        return response.data;
      })
      .then(function(manifest) {
        var filePromises = [];

        angular.forEach(manifest.files, function(filename) {
          filePromises.push($http.get(exampleFolder + '/' + filename, {
              transformResponse: []
            })
            .then(function(response) {

              // The manifests provide the production index file but Plunkr wants
              // a straight index.html
              if (filename === 'index-production.html') {
                filename = 'index.html';
              }

              return {
                name: filename,
                content: response.data
              };
            }));
        });

        return $q.all({
          manifest: manifest,
          files: $q.all(filePromises)
        });
      });
  }

}

PlnkrExampleService.$inject = [
  '$q',
  '$http'
];

export default PlnkrExampleService;
