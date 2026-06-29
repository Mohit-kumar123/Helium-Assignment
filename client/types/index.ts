export enum EventType {
  HOMEPAGE_VISIT = 'Homepage Visit',
  CATEGORY_VISIT = 'Category Visit',
  SEARCH_PRODUCT = 'Search Product',
  VIEW_PRODUCT = 'View Product',
  COMPARE_PRODUCTS = 'Compare Products',
  ADD_TO_WISHLIST = 'Add to Wishlist',
  REMOVE_FROM_WISHLIST = 'Remove From Wishlist',
  ADD_TO_CART = 'Add To Cart',
  REMOVE_FROM_CART = 'Remove From Cart',
  APPLY_COUPON = 'Apply Coupon',
  CHECKOUT_STARTED = 'Checkout Started',
  PURCHASE_COMPLETED = 'Purchase Completed',
  EXIT_WEBSITE = 'Exit Website',
}
export enum ShopperType {
  BROWSER = 'Browser',
  COMPARER = 'Comparer',
  DISCOUNT_SEEKER = 'Discount Seeker',
  CART_ABANDONER = 'Cart Abandoner',
  LOYAL_CUSTOMER = 'Loyal Customer',
}

export interface RecommendationDto {
  title: string;
  primaryAction: string;
  secondaryAction: string;
  reasoning: string;
}

export interface AnalyzeResponseDto {
  shopperType: ShopperType;
  confidence: number;
  evidence: string[];
  recommendation: RecommendationDto;
}
