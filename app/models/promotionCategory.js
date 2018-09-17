class promotionCategory {
	constructor(_id, _parent, _name) {
		this.id = _id;
		this.parent =  _parent;
		this.name = _name;
	}

	getId() {
		return this.id;
	}

	setId(_id) {
		this.id = _id;
	}

	getParent() {
		return this.parent;
	}

	setParent(_parent) {
		this.parent = _parent;
	}

	getName() {
		return this.name;
	}

	setName(_name) {
		this.name = _name;
	}
}
module.exports = promotionCategory;