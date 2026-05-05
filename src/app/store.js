// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";

// ── Import your existing slices/APIs below ──
// As you build features, uncomment and add them here.

// import authReducer      from "../features/auth/authSlice";
// import cartReducer      from "../features/cart/cartSlice";
// import wishlistReducer  from "../features/wishlist/wishlistSlice";
// import { orderApi }     from "../features/orders/orderApi";
// import { reviewApi }    from "../features/review/reviewApi";
// import { productApi }   from "../features/products/productApi";

const store = configureStore({
  reducer: {
    // auth:     authReducer,
    // cart:     cartReducer,
    // wishlist: wishlistReducer,
    // [orderApi.reducerPath]:   orderApi.reducer,
    // [reviewApi.reducerPath]:  reviewApi.reducer,
    // [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
    // .concat(orderApi.middleware)
    // .concat(reviewApi.middleware)
    // .concat(productApi.middleware)
});

export default store;
