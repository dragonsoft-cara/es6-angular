class BaseNgClass {
	constructor(...injects) {
		// debugger; 
		// note: this.constructor === MyBaseController
		if(this.constructor.$inject && this.constructor.$inject.length)
			this.constructor.$inject.forEach((injectName, i) => this[injectName] = injects[i]);
	}

	static create() {
		var createFunction = ($scope, myService) => new this($scope, myService);
		createFunction.$inject = ['$scope', 'myService'];
		return createFunction;
	}
}