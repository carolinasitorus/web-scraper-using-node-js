const cheerio = require('cheerio')

class PromotionScraper {
	replaceMultipleSpace(str) {
		return str.trim().replace(/\s\s+/g, ' ');
	}

	replaceString(str, subString, replaceWith) {
		return str.trim().replace(subString, replaceWith); 
	}

	getTitle(content) {
		var $ = cheerio.load(content);
		return this.replaceMultipleSpace($("div.titleinside", content).text());
	}

	getLocation(content) {
		var $ = cheerio.load(content);
		var area = this.replaceMultipleSpace($("div.area", content).text());
		return this.replaceString(area, 'Area Promo : ', '');
	}

	getPeriode(content) {
		var $ = cheerio.load(content);
		var periode = this.replaceMultipleSpace($("div.periode", content).text());
		return this.replaceString(periode, 'Periode Promo : ', '');
	}

	getImage(content) {
		var $ = cheerio.load(content);
		return $("div.keteranganinside img", content).attr('src');
	}

	getDetailUrl(content) {
		var $ = cheerio.load(content);
		return $('a').attr('href');
	}
}

module.exports = PromotionScraper;