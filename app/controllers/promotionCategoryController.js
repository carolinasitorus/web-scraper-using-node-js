const PromotionCategoryRepository = require('../../app/repositories/promotionCategoryRepository');
class PromotionCategoryController {
	getCreditCardPromotionCategory() {
		promotionCategoryRepository = new PromotionCategoryRepository();
        console.log(promotionCategoryRepository.getSubCategories());
	}
}