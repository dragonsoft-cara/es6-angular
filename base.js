
class BaseNgClass {
	constructor(...injects) {
		if(this.constructor.$inject && this.constructor.$inject.length)
			this.constructor.$inject.forEach((injectName, i) => this[injectName] = injects[i]);
	}

	static create(){
		let createFunction = (...injects) => new this(...injects);
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

class BaseDirectiveClass extends BaseNgClass {
	compile() {

		// make "this" point to directive class in link/pre functions
		// make "this.scope" point to the "scope" in link/pre functions so that the scope
		// can be accessed in class methods.
		if (typeof this.link == "function") {
			let lnk = this.link;
			this.link = (...args) => {
				this.scope = args[0];
				lnk.apply(this, args);
			}
		} else if(typeof this.link == "object") {
			if(this.link.pre && typeof this.link.pre == "function") {
				let pre = this.link.pre;
				this.link.pre = (...args) => {
					this.scope = args[0];
					pre.apply(this, args);
				}
			} 
			if(this.link.post && typeof this.link.post == "function") {
				let post = this.link.post;
				this.link.post = (...args) => {
					this.scope = args[0];
					post.apply(this, args);
				}				
			}
		} else {
			console.log("error in directive link.");
		}

		return this.link;
	}	

	setScope(newScope) {
		if(!this.scope) {
			this.scope = newScope;
		} else {
			$.extend( this.scope, newScope );
		}
	}	
}