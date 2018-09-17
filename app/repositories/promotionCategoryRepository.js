const PromotionCategory = require('../../app/models/promotionCategory');
const PromotionCategoryScaper = require('../../app/scrapers/promotions/credit_cards/promotionCategoryScraper');
const creditCardId = 1;
const travelId = 1;
const lifeStyleId = 2;
const foodBeferageId = 3;
const gadgetElectronicId = 4;
const dailyNeedsId = 5;
const otherPromoId = 6;

class PromotionCategoryRepository {
    addNewCategory() {
        return new PromotionCategory(creditCardId, null, 'Credit Card');
    }

    getCreditCardCategory() {
	return this.addNewCategory()
    }

    addSubcategory(id, parentId, name) {
	return new PromotionCategory(id, parentId, name)
    }

    addNewSubcategories() {
	promotionCategoryRepository = new PromotionCategoryRepository();
	var promotionSubcategories = [];
	var parentId = this.getCreditCardCategory().getId();
	var promotionCategoryScraper = new PromotionCategoryScaper();
	var subCategories = promotionCategoryScraper.getSubCategories();
        subCategories.forEach(function(subcategoryName, i){
            if(i == 0) {
                promotionSubcategories.push(promotionCategoryRepository.addSubcategory(travelId, parentId, subcategoryName));
            } else if(i == 1) {
                promotionSubcategories.push(promotionCategoryRepository.addSubcategory(lifeStyleId, parentId, subcategoryName));
            } else if(i == 2) {
                promotionSubcategories.push(promotionCategoryRepository.addSubcategory(foodBeferageId, parentId, subcategoryName));
            } else if(i == 3) {
                promotionSubcategories.push(promotionCategoryRepository.addSubcategory(gadgetElectronicId, parentId, subcategoryName));
            } else if(i == 4) {
                promotionSubcategories.push(promotionCategoryRepository.addSubcategory(dailyNeedsId, parentId, subcategoryName));
            } else if(i == 5) {
                promotionSubcategories.push(promotionCategoryRepository.addSubcategory(otherPromoId, parentId, subcategoryName));
            }
        });
        return promotionSubcategories;
    }

    getSubCategories() {
        return this.addNewSubcategories();
    }
}

module.exports = PromotionCategoryRepository;