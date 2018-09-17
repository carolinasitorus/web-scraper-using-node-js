const baseURL = 'https://www.bankmega.com/';
const BaseScaper = require('../../app/scrapers/baseScraper');
const cheerio = require('cheerio');
const fs = require('fs');
const Promotion = require('../../app/models/promotion');
const PromotionCategoryRepository = require('../../app/repositories/promotionCategoryRepository');
const PromotionScaper = require('../../app/scrapers/promotions/credit_cards/promotionScraper');
const promotionURL = baseURL + 'promolainnya.php';
const request = require('sync-request');

promotionScaper = new PromotionScaper();
promotionCategoryRepository = new PromotionCategoryRepository();
baseScraper = new BaseScaper();

class CreditCardPromotionController {

	saveToFile(creditCardPromotions) {
		var json = JSON.stringify(creditCardPromotions, null, 4);
		fs.writeFileSync('solution.json', json, 'utf8');  
	}

	main() {
		var creditCardPromotionController = new CreditCardPromotionController();
		var subcategories = promotionCategoryRepository.getSubCategories();
		var creditCardPromotions = {};
		var subcategoryPromotions = {};
		subcategories.forEach(function(subcategory) {
            creditCardPromotions[subcategory.name] = [];
		});

		var promises = subcategories.map(function (subcategory) {
		    new Promise(function (resolve, reject) {
		    	var subcategoryName = subcategory.getName();
		    	console.log('promotion : ' + subcategoryName)
		    	subcategoryPromotions[subcategoryName] = [];

		        var promotionDetailUrls = [];
		        var pageTotal = [];

		        var product = subcategory.getParent();
		        var subcat = subcategory.getId();

		        var mainUrl = "https://www.bankmega.com/promolainnya.php?product=" + product + "&subcat=" +subcat;
		        var mainHtml = baseScraper.getSyncRequest(mainUrl);
		        if(mainHtml) {
		            var $ = cheerio.load(mainHtml);
		            $('#promolain').find('li').each(function(){
		                var detailUrl = $(this).find('a').attr('href');
		                promotionDetailUrls.push(detailUrl);
		            });

		            //Pagination
		            $('.tablepaging').find('td').each(function(){
		                var page = $(this).find('a').text();
		                var pagingId = $(this).find('a').attr('id');
		                if (typeof pagingId !== typeof undefined && pagingId !== false) {
		                    if(pagingId !== 'paging1') {
		                        pageTotal.push(page);
		                    }
		                }
		            });

		            pageTotal.forEach(function(page) {
		                var nextPageUrl = mainUrl + "&page=" + page;
		                var detailHtml = baseScraper.getSyncRequest(nextPageUrl);
		                var $ = cheerio.load(detailHtml);
		                $('#promolain').find('li').each(function(){
		                    var detailUrl = $(this).find('a').attr('href');
		                    promotionDetailUrls.push(detailUrl);
		                });
		            });

		            promotionDetailUrls.forEach(function(promotionDetailUrl){
		                console.log(promotionDetailUrl);
		                if(promotionDetailUrl.indexOf('promo_detail.php') > -1) {
		                    var detailHtml = baseScraper.getSyncRequest(baseURL + promotionDetailUrl);
		                    var $ = cheerio.load(detailHtml);
		                    $('#contentpromolain2').each(function(i, item){
		                        var title = promotionScaper.getTitle(item);
		                        var location = promotionScaper.getLocation(item);
		                        var periode = promotionScaper.getPeriode(item);
		                        var img = promotionScaper.getImage(item);
		                        var promotion = new Promotion(title, subcategoryName, img, location, periode);
		                        var categoryPromo =  subcategory.getId();
		                        creditCardPromotions[subcategoryName].push(promotion);
		                    });
		                }
		            });
		        }
		    });
		});

		Promise.all(promises).then(function (values) {
		    creditCardPromotionController.saveToFile(creditCardPromotions);
		}).catch(function (error) {
		  console.log(error)
		});
	}
}

module.exports = CreditCardPromotionController;