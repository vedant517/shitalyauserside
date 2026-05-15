import { configureStore } from "@reduxjs/toolkit";
import { productsApi }  from "./api/productsApi";
import { wishlistApi }  from "./api/wishlistApi";
import { orderApi }     from "./api/orderApi";
import { authApi }      from "./api/authApi";
import { categoryApi }  from "./api/categoryApi";
import { contactApi }   from "./api/contactApi";
import { cartApi }      from "./api/cartApi";
import { addressApi }   from "./api/addressApi";
import { reviewApi }    from "./api/reviewApi";
import { couponApi }    from "./api/couponApi";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]:  productsApi.reducer,
    [wishlistApi.reducerPath]:  wishlistApi.reducer,
    [orderApi.reducerPath]:     orderApi.reducer,
    [authApi.reducerPath]:      authApi.reducer,
    [categoryApi.reducerPath]:  categoryApi.reducer,
    [contactApi.reducerPath]:   contactApi.reducer,
    [cartApi.reducerPath]:      cartApi.reducer,
    [addressApi.reducerPath]:   addressApi.reducer,
    [reviewApi.reducerPath]:    reviewApi.reducer,
    [couponApi.reducerPath]:    couponApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(wishlistApi.middleware)
      .concat(orderApi.middleware)
      .concat(authApi.middleware)
      .concat(categoryApi.middleware)
      .concat(contactApi.middleware)
      .concat(cartApi.middleware)
      .concat(addressApi.middleware)
      .concat(reviewApi.middleware)
      .concat(couponApi.middleware),
});