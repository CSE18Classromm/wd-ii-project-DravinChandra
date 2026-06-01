import Stars from "./Stars";

export default function ProductCard({ product, navigate, addToCart }) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div
      style={{
        background: "white",
        borderRadius: 8,
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
      onClick={() => navigate("product", product)}
    >
      {/* Image */}
      <div style={{ position: "relative", paddingTop: "100%", background: "#f8f8f8" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
          }}
          onError={e => { e.target.src = "https://via.placeholder.com/300x300?text=No+Image"; }}
        />
        {product.badge && (
          <span style={{
            position: "absolute",
            top: 8, left: 8,
            background: product.badge === "Deal of the Day" ? "#CC0C39" : "#CC0C39",
            color: "white",
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 7px",
            borderRadius: 2,
          }}>{product.badge}</span>
        )}
        {product.prime && (
          <div style={{ position: "absolute", bottom: 6, right: 6 }}>
            <PrimeBadge />
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "12px 12px 8px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 14, color: "#0F1111", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {product.name}
        </div>

        <Stars rating={product.rating} count={product.reviews} />

        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 2 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#0F1111" }}>
            ₹{product.price.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
          </span>
          {discount > 0 && (
            <>
              <span style={{ fontSize: 12, color: "#565959", textDecoration: "line-through" }}>
                ₹{product.originalPrice.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
              <span style={{ fontSize: 12, color: "#CC0C39", fontWeight: 600 }}>({discount}% off)</span>
            </>
          )}
        </div>

        <div style={{ fontSize: 12, color: "#007600", marginTop: 2 }}>
          FREE delivery: <strong>{product.deliveryDate}</strong>
        </div>

        <button
          onClick={e => {
            e.stopPropagation();
            addToCart(product);
          }}
          style={{
            marginTop: "auto",
            paddingTop: 8,
            background: "#FFD814",
            border: "1px solid #FCD200",
            borderRadius: 20,
            padding: "8px 12px",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            width: "100%",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function PrimeBadge() {
  return (
    <div style={{
      background: "#00A8E1",
      color: "white",
      fontSize: 10,
      fontWeight: 700,
      padding: "2px 6px",
      borderRadius: 2,
      letterSpacing: 0.5,
    }}>prime</div>
  );
}
