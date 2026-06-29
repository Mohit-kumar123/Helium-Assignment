import { EventType, ShopperType } from "@/types";

export const SAMPLE_SESSIONS: Record<ShopperType, EventType[]> = {
  [ShopperType.BROWSER]: [
    EventType.HOMEPAGE_VISIT,
    EventType.CATEGORY_VISIT,
    EventType.SEARCH_PRODUCT,
    EventType.VIEW_PRODUCT,
  ],

  [ShopperType.COMPARER]: [
    EventType.HOMEPAGE_VISIT,
    EventType.SEARCH_PRODUCT,
    EventType.COMPARE_PRODUCTS,
    EventType.VIEW_PRODUCT,
  ],

  [ShopperType.CART_ABANDONER]: [
    EventType.HOMEPAGE_VISIT,
    EventType.SEARCH_PRODUCT,
    EventType.VIEW_PRODUCT,
    EventType.ADD_TO_CART,
  ],

  [ShopperType.DISCOUNT_SEEKER]: [
    EventType.HOMEPAGE_VISIT,
    EventType.SEARCH_PRODUCT,
    EventType.VIEW_PRODUCT,
    EventType.APPLY_COUPON,
  ],

  [ShopperType.LOYAL_CUSTOMER]: [
    EventType.HOMEPAGE_VISIT,
    EventType.SEARCH_PRODUCT,
    EventType.VIEW_PRODUCT,
    EventType.ADD_TO_CART,
    EventType.CHECKOUT_STARTED,
    EventType.PURCHASE_COMPLETED,
  ],
};