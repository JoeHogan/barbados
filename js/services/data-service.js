(function(){

	var dataService = angular.module('dataService', [])

	.factory('dataService', ['$filter','$http','$q', function($filter,$http,$q) {
		return {
			getForm: function(id){
				var def = $q.defer();  //testing with local data
				this.getForms().then(function(forms){
					forms.data = $filter('filter')(forms.data,{blockId: parseInt(id)},true)[0];
					def.resolve(forms);
				});
				return def.promise;				
			},
			getForms: function(){
				return $http.get("sample-data/forms.json", {cache: true}); //testing with local data
			},
			postForm: function(data,id){
				if(id && !data.blockId) data.blockId = id;
				return $http.post("http://52.25.174.100/Forms/PostForm",{formData: JSON.stringify(data)});
			},
			getLists: function(id,types){
				return $http.get("sample-data/lists.json", {cache: true}); //testing with local data
			}
		}
	}]);
	
})();