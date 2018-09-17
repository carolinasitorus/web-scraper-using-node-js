class Promotion {
	constructor(_title, _category, _imageUrl, _location, _periode) {
		this.title = _title;
		this.category = _category;
		this.imageUrl = _imageUrl;
		this.location = _location;
		this.periode = _periode;
	}

	getCategory() {
		return this.category;
	}

	setCategory(_category) {
		this.category = _category;
	}

	getTitle() {
		return this.title;
	}

	setTitle(_title) {
		this.title = _title;
	}

	getimageUrl() {
		return this.imageUrl;
	}

	setImageUrl(_imageUrl) {
		this.imageUrl = _imageUrl;
	}

	getLocation() {
		return this.location;
	}

	setLocation(_location) {
		this.location = _location;
	}

	getPeriode() {
		return this.periode;
	}

	setLocation(_periode) {
		this.periode = _periode;
	}
}
module.exports = Promotion;