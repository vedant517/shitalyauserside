import React, { useState } from "react";
import { Star, MessageSquare, ThumbsUp, Send, Loader2, AlertCircle } from "lucide-react";
import { useGetProductReviewsQuery, useAddReviewMutation } from "../Redux/api/reviewApi";
import { useNavigate } from "react-router-dom";

export default function ReviewSection({ productId }) {
  const navigate = useNavigate();
  const { data: reviews = [], isLoading, refetch } = useGetProductReviewsQuery(productId);
  const [addReview, { isLoading: isSubmitting }] = useAddReviewMutation();

  const isLoggedIn = !!localStorage.getItem("user");

  const averageRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  const [form, setForm] = useState({ rating: 5, comment: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) { navigate("/login"); return; }
    if (!form.comment.trim()) { setError("Please write a comment."); return; }
    
    setError("");
    try {
      await addReview({ productId, ...form }).unwrap();
      setSuccess(true);
      setForm({ rating: 5, comment: "" });
      setTimeout(() => setSuccess(false), 3000);
      refetch();
    } catch (err) {
      setError(err?.data?.message || "Failed to submit review.");
    }
  };

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <Loader2 className="animate-spin text-[#c9973a]" size={32} />
      </div>
    );
  }

  return (
    <div className="mt-16 sm:mt-24 border-t border-gray-100 pt-16 pb-12" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* ── LEFT: STATS ── */}
        <div className="lg:col-span-4">
          <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1a0800] mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
            Customer Reviews
          </h2>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="text-[48px] font-bold text-[#1a0800] leading-none">{averageRating}</div>
            <div>
              <div className="flex text-[#c9973a] mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} fill={s <= Math.round(averageRating) ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="text-[13px] text-gray-500 uppercase tracking-wider font-medium">Based on {reviews.length} reviews</p>
            </div>
          </div>

          <div className="space-y-3">
            {ratingCounts.map((rc) => (
              <div key={rc.star} className="flex items-center gap-3">
                <span className="text-[12px] text-gray-600 w-3">{rc.star}</span>
                <Star size={12} className="text-[#c9973a]" fill="currentColor" />
                <div className="flex-1 h-[6px] bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#c9973a] transition-all duration-500" 
                    style={{ width: `${reviews.length ? (rc.count / reviews.length) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-[12px] text-gray-400 w-6 text-right">{rc.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: LIST & FORM ── */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Form */}
          <div className="bg-[#fdf3e0]/30 p-6 sm:p-8 rounded-2xl border border-[#f5ead4]">
            <h3 className="text-[16px] font-bold text-[#1a0800] mb-6 flex items-center gap-2">
              <MessageSquare size={18} className="text-[#c9973a]" />
              Write a Review
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[12px] uppercase tracking-wider text-gray-500 mb-2 block font-medium">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, rating: s })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star size={24} className={s <= form.rating ? "text-[#c9973a]" : "text-gray-200"} fill={s <= form.rating ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[12px] uppercase tracking-wider text-gray-500 mb-2 block font-medium">Comment</label>
                <textarea
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="Tell us what you think about this saree..."
                  rows={4}
                  className="w-full bg-white border border-[#e8d5b5] rounded-xl p-4 text-[14px] outline-none focus:border-[#c9973a] transition-colors resize-none"
                />
              </div>

              {error && <p className="text-red-500 text-xs flex items-center gap-1.5"><AlertCircle size={14} /> {error}</p>}
              {success && <p className="text-green-600 text-xs flex items-center gap-1.5"><ThumbsUp size={14} /> Review submitted successfully!</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#3d1a00] text-[#e8c46a] text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-3.5 rounded-lg hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                Submit Review
              </button>
            </form>
          </div>

          {/* List */}
          <div className="space-y-8">
            <h3 className="text-[16px] font-bold text-[#1a0800] border-b border-gray-100 pb-4">
              Recent Reviews ({reviews.length})
            </h3>
            
            {reviews.length === 0 ? (
              <p className="text-gray-400 text-[14px] italic">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {reviews.map((r) => (
                  <div key={r._id} className="py-6 first:pt-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-[#1a0800] text-[15px]">{r.user?.name || "Guest User"}</p>
                        <div className="flex text-[#c9973a] gap-0.5 mt-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={12} fill={s <= r.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                      </div>
                      <span className="text-[11px] text-gray-400 uppercase tracking-tighter">
                        {new Date(r.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-[#555] text-[14px] leading-relaxed mt-3">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
