import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAddToWishlistMutation } from "../Redux/api/wishlistApi";

export default function ProductCard({ product }) {
  const navigate  = useNavigate();
  const [addToWishlist, { isLoading: addingToWish }] = useAddToWishlistMutation();
  const [wishStatus, setWishStatus] = useState("idle"); // idle | success | error

  const discount =
    product.mrp && product.price
      ? Math.round((1 - product.price / product.mrp) * 100)
      : null;

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/login");
      return;
    }
    try {
      await addToWishlist({
        productId:   product._id ?? product.id,
        name:        product.name,
        price:       product.price,
        image:       product.image ?? product.images?.[0] ?? "",
        rating:      Number(product.ratings ?? product.rating ?? 0),
        description: product.description ?? "",
      }).unwrap();
      setWishStatus("success");
      setTimeout(() => setWishStatus("idle"), 2000);
    } catch (err) {
      console.error("Wishlist add failed", err);
      setWishStatus("error");
      setTimeout(() => setWishStatus("idle"), 2000);
    }
  };

  return (
    <div className="relative group cursor-pointer w-full">

      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden bg-[#f5e8d0] rounded-sm">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Discount Badge — top-left on image */}
      {discount && discount > 0 && (
        <div
          className="absolute top-2 left-2 text-white text-[8px] sm:text-[9px] tracking-[0.1em] px-2 py-[3px] rounded-sm"
          style={{
            fontFamily: '"Cinzel", serif',
            background: "linear-gradient(135deg,#c9973a,#e8c46a)",
          }}
        >
          {discount}% OFF
        </div>
      )}

      {/* Wishlist Heart */}
      <button
        onClick={handleWishlist}
        disabled={addingToWish}
        title={
          wishStatus === "success" ? "Added to wishlist!" :
          wishStatus === "error"   ? "Failed — try again" :
          "Add to Wishlist"
        }
        className="absolute top-2 right-2 bg-white/90 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition hover:scale-110 disabled:opacity-60"
      >
        {addingToWish ? (
          <Loader2 className="w-3 h-3 sm:w-[13px] sm:h-[13px] animate-spin text-[#c9973a]" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-3 h-3 sm:w-[14px] sm:h-[14px]"
            fill={wishStatus === "success" ? "#c9973a" : "none"}
            stroke={wishStatus === "error" ? "#b91c1c" : "#c9973a"}
            strokeWidth="2"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        )}
      </button>

      {/* Product Info */}
      <div className="mt-2 sm:mt-3 px-0.5">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <h3 className="text-[11px] sm:text-[12px] md:text-[13px] font-medium text-[#3d2800] truncate leading-snug">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 mt-0.5 sm:mt-1 flex-wrap">
          <p className="text-[11px] sm:text-[12px] text-[#c9973a] font-semibold">
            ₹{product.price?.toLocaleString("en-IN")}
          </p>
          {product.mrp && product.mrp !== product.price && (
            <p className="text-[10px] sm:text-[11px] text-[#bbb] line-through">
              ₹{product.mrp?.toLocaleString("en-IN")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}