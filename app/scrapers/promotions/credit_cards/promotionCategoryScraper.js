const cheerio = require('cheerio')
const BaseScaper = require('../../../../app/scrapers/baseScraper');
const request = require('sync-request');
const url = 'https://www.bankmega.com/promolainnya.php' 


class PromotionCategoryScraper {
	getSubCategories() {
		var baseScraper = new BaseScaper();
		var bodyHtml = baseScraper.getSyncRequest(url);
		var subCategory = [];
		if(bodyHtml) {
			var $ = cheerio.load(bodyHtml);
		    $('#subcatpromo').find('div').each(function(){
		        var name = $(this).find('img').attr('title');
		        subCategory.push(name);
		    });
		    return subCategory;
		} else {
			return 0;
		}    
	}
}

module.exports = PromotionCategoryScraper;