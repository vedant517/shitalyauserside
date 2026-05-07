import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ChevronDown, ChevronUp, X, Star } from "lucide-react";
import { useGetUserOrdersQuery } from "../Redux/api/orderApi";
import { useAddReviewMutation } from "../Redux/api/reviewApi";

// ── Star picker ──────────────────────────────────────────────────────────────
const StarPicker = ({ rating, setRating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setRating(star)}
        className="focus:outline-none"
      >
        <Star
          size={26}
          className={
            star <= rating
              ? "text-[#c9973a] fill-[#c9973a]"
              : "text-gray-300 fill-gray-100"
          }
        />
      </button>
    ))}
  </div>
);

// ── Review Modal ─────────────────────────────────────────────────────────────
const ReviewModal = ({ item, userId, onClose }) => {
  const [rating,  setRating]  = useState(0);
  const [comment, setComment] = useState("");

  const [addReview, { isLoading, isSuccess, isError }] = useAddReviewMutation();

  const productId =
    item.productId ?? item.product?._id ?? item.product ?? null;

  const handleSubmit = async () => {
    if (!rating) return;
    try {
      await addReview({
        ...(userId ? { user: userId } : {}),
        product: productId,
        rating,
        comment,
      }).unwrap();
    } catch (e) {
      console.error("Review error:", e);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/50 flex items-center justify-center p-4">
      <div
        className="bg-white w-full max-w-md relative"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8d5b5]">
          <h3
            className="text-base text-[#1a1008] tracking-[0.06em] uppercase"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Write a Review
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5">
          {/* Product name */}
          <p className="text-sm text-[#6b4c1a] mb-5 font-medium">
            {item.name ?? item.productName ?? "Product"}
          </p>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <Star size={22} className="text-green-600 fill-green-200" />
              </div>
              <p className="text-green-700 font-medium text-sm">
                Review submitted successfully!
              </p>
              <button
                onClick={onClose}
                className="mt-5 text-xs tracking-[0.14em] uppercase text-[#c9973a] underline"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Stars */}
              <div className="mb-5">
                <p className="text-xs text-[#1a1008] tracking-[0.1em] uppercase mb-2">
                  Your Rating <span className="text-red-400">*</span>
                </p>
                <StarPicker rating={rating} setRating={setRating} />
              </div>

              {/* Comment */}
              <div className="mb-5">
                <p className="text-xs text-[#1a1008] tracking-[0.1em] uppercase mb-2">
                  Your Comment
                </p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder="Share your experience with this product..."
                  className="w-full border border-[#e8d5b5] px-3 py-2 text-sm text-[#1a1008] outline-none focus:border-[#c9973a] resize-none transition-colors"
                />
              </div>

              {isError && (
                <p className="text-red-500 text-xs mb-4">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={!rating || isLoading}
                className="w-full bg-[#1a1008] text-[#f5f0e4] text-xs tracking-[0.18em] uppercase py-3
                  hover:bg-[#c9973a] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Submit Review"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Status badge colours ─────────────────────────────────────────────────────
const STATUS_STYLE = {
  pending:    "bg-yellow-50  text-yellow-700  border-yellow-200",
  processing: "bg-blue-50    text-blue-700    border-blue-200",
  shipped:    "bg-purple-50  text-purple-700  border-purple-200",
  delivered:  "bg-green-50   text-green-700   border-green-200",
  cancelled:  "bg-red-50     text-red-600     border-red-200",
};

// ── Single order card ────────────────────────────────────────────────────────
const OrderCard = ({ order }) => {
  const [expanded,   setExpanded]   = useState(false);
  const [reviewItem, setReviewItem] = useState(null);

  const items  = order.items ?? order.products ?? order.orderItems ?? [];
  const status = (order.status ?? order.orderStatus ?? "pending").toLowerCase();
  const total  = order.totalAmount ?? order.total ?? order.totalPrice ?? 0;
  const userId = order.user ?? order.userId ?? null;

  const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <div
      className="border border-[#e8d5b5] bg-white"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ── Order summary row ── */}
      <div className="flex items-center justify-between flex-wrap gap-3 px-4 sm:px-6 py-4">

        <div className="flex flex-col gap-[2px]">
          <p className="text-[10px] text-[#6b4c1a] tracking-[0.1em] uppercase">Order ID</p>
          <p className="text-sm text-[#1a1008] font-medium">
            #{(order._id ?? "").slice(-8).toUpperCase()}
          </p>
        </div>

        <div className="flex flex-col gap-[2px]">
          <p className="text-[10px] text-[#6b4c1a] tracking-[0.1em] uppercase">Date</p>
          <p className="text-sm text-[#1a1008]">{date}</p>
        </div>

        <div className="flex flex-col gap-[2px]">
          <p className="text-[10px] text-[#6b4c1a] tracking-[0.1em] uppercase">Total</p>
          <p className="text-sm text-[#1a1008] font-medium">
            ₹{total.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`text-[11px] font-medium px-3 py-[5px] border capitalize tracking-wide
              ${STATUS_STYLE[status] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}
          >
            {status}
          </span>
          <button
            onClick={() => setExpanded((p) => !p)}
            className="text-[#6b4c1a] hover:text-[#c9973a] transition-colors"
            title={expanded ? "Collapse" : "View items"}
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* ── Expanded items ── */}
      {expanded && (
        <div className="border-t border-[#e8d5b5] divide-y divide-[#f0e6d0]">
          {items.length === 0 && (
            <p className="text-sm text-[#6b4c1a] px-6 py-4">No items found.</p>
          )}

          {items.map((item, idx) => {
            const name  = item.name ?? item.productName ?? item.product?.name ?? "Product";
            const image = item.image ?? item.productImage ?? item.product?.image ?? null;
            const price = item.price ?? item.productPrice ?? 0;
            const qty   = item.quantity ?? item.qty ?? 1;

            return (
              <div
                key={idx}
                className="flex items-center gap-4 px-4 sm:px-6 py-4"
              >
                {/* Image */}
                {image && (
                  <img
                    src={image}
                    alt={name}
                    className="w-16 h-20 object-cover flex-shrink-0 border border-[#e8d5b5]"
                  />
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1a1008] font-medium truncate">{name}</p>
                  <p className="text-xs text-[#6b4c1a] mt-1">
                    Qty: {qty} &nbsp;·&nbsp; ₹{price.toLocaleString("en-IN")}
                  </p>
                  {item.selectedVariant && (
                    <p className="text-xs text-[#6b4c1a] mt-[2px]">
                      Variant: {item.selectedVariant}
                    </p>
                  )}
                </div>

                {/* Give Review — only for delivered orders */}
                {status === "delivered" && (
                  <button
                    onClick={() => setReviewItem(item)}
                    className="flex-shrink-0 text-[11px] tracking-[0.1em] uppercase border border-[#c9973a] text-[#c9973a]
                      px-3 py-2 hover:bg-[#c9973a] hover:text-white transition-colors duration-200 whitespace-nowrap"
                  >
                    Give Review
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Review modal */}
      {reviewItem && (
        <ReviewModal
          item={reviewItem}
          userId={userId}
          onClose={() => setReviewItem(null)}
        />
      )}
    </div>
  );
};

// ── Skeleton loader ──────────────────────────────────────────────────────────
const OrderSkeleton = () => (
  <div className="border border-[#e8d5b5] bg-white px-6 py-5 animate-pulse">
    <div className="flex flex-wrap gap-8">
      <div className="h-4 bg-gray-200 rounded w-28" />
      <div className="h-4 bg-gray-200 rounded w-20" />
      <div className="h-4 bg-gray-200 rounded w-16" />
      <div className="h-5 bg-gray-200 rounded w-20 ml-auto" />
    </div>
  </div>
);

// ── Page ─────────────────────────────────────────────────────────────────────
const OrderHistory = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetUserOrdersQuery();

  const orders = Array.isArray(data)
    ? data
    : data?.orders ?? data?.data ?? [];

  return (
    <div
      className="min-h-screen bg-[#faf7f2] pt-[72px]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* ── Page header ── */}
        <div className="mb-8 sm:mb-10">
          <h1
            className="text-2xl sm:text-3xl text-[#1a1008] tracking-[0.04em]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Order History
          </h1>
          <p className="text-sm text-[#6b4c1a] mt-1">
            Track and review your past orders
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => <OrderSkeleton key={i} />)}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center py-16">
            <Package size={44} className="text-[#e8d5b5] mx-auto mb-4" />
            <p className="text-[#6b4c1a] mb-5 text-sm">
              Failed to load orders. Please try again.
            </p>
            <button
              onClick={refetch}
              className="text-xs tracking-[0.16em] uppercase border border-[#1a1008] px-6 py-[10px]
                hover:bg-[#1a1008] hover:text-white transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && orders.length === 0 && (
          <div className="text-center py-16">
            <Package size={44} className="text-[#e8d5b5] mx-auto mb-4" />
            <p className="text-[#6b4c1a] text-sm mb-5">
              You haven't placed any orders yet.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="text-xs tracking-[0.16em] uppercase border border-[#1a1008] px-6 py-[10px]
                hover:bg-[#1a1008] hover:text-white transition-colors duration-200"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* Orders list */}
        {!isLoading && !isError && orders.length > 0 && (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default OrderHistory;