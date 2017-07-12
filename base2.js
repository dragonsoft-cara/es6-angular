class BaseNgClass {
	constructor(...injects) {
		if(this.constructor.$inject && this.constructor.$inject.length)
			this.constructor.$inject.forEach((injectName, i) => this[injectName] = injects[i]);
	}

	static create(){
		var createFunction = (...injects) => new this(...injects);
		createFunction.$inject = this.$inject;
		return createFunction;
	}

	static inject(injects){
		if(!this.$inject) {
			this.$inject = injects;
		} else {
			this.$inject = [...new Set(this.$inject.concat(injects))];
		}
	}
}