import { useState } from "react";
import Stars from "../components/Stars";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function ProductPage({ product, navigate, addToCart, cart }) {
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.color[0]);
  const [added, setAdded] = useState(false);

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const inCart = cart.some(i => i.id === product.id);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: 16 }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: "#007185", marginBottom: 12, display: "flex", gap: 4, flexWrap: "wrap" }}>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("home")}>Home</span>
        <span style={{ color: "#555" }}>›</span>
        <span style={{ cursor: "pointer" }}>{product.category}</span>
        <span style={{ color: "#555" }}>›</span>
        <span style={{ color: "#0F1111" }}>{product.name.substring(0, 50)}...</span>
      </div>

      {/* Main product area */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,2fr) minmax(0,1fr)", gap: 24, background: "white", borderRadius: 8, padding: 24 }}>

        {/* Image */}
        <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
          <div style={{ border: "1px solid #DDD", borderRadius: 8, overflow: "hidden", aspectRatio: "1/1", background: "#f8f8f8" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 60, height: 60, border: "1px solid #DDD", borderRadius: 4, overflow: "hidden", cursor: "pointer" }}>
                <img src={product.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <div style={{ fontSize: 11, color: "#565959", marginBottom: 4 }}>{product.brand}</div>
          <h1 style={{ fontSize: 22, fontWeight: 400, color: "#0F1111", lineHeight: 1.4, margin: "0 0 8px" }}>{product.name}</h1>

          <Stars rating={product.rating} count={product.reviews} />

          <div style={{ borderTop: "1px solid #EEE", marginTop: 12, paddingTop: 12 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#CC0C39" }}>-{discount}%</span>
              <span style={{ fontSize: 28, fontWeight: 400, color: "#0F1111" }}>
                ₹<strong>{Math.floor(product.price).toLocaleString("en-IN")}</strong>
                <span style={{ fontSize: 16 }}>.{String(product.price.toFixed(2)).split(".")[1]}</span>
              </span>
            </div>
            <div style={{ fontSize: 12, color: "#565959", marginTop: 2 }}>
              M.R.P.: <s>₹{product.originalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</s>
            </div>
          </div>

          {/* Color select */}
          {product.color.length > 1 && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 13, marginBottom: 6 }}><strong>Color:</strong> {selectedColor}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {product.color.map(c => (
                  <button key={c} onClick={() => setSelectedColor(c)} style={{
                    padding: "6px 14px",
                    border: selectedColor === c ? "2px solid #FF9900" : "1px solid #888",
                    borderRadius: 4,
                    background: "white",
                    cursor: "pointer",
                    fontSize: 13,
                  }}>{c}</button>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div style={{ marginTop: 16, fontSize: 14, color: "#333", lineHeight: 1.6 }}>
            {product.description}
          </div>

          {/* Features */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>About this item</div>
            <ul style={{ paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {product.features.map((f, i) => (
                <li key={i} style={{ fontSize: 14, color: "#333", lineHeight: 1.5 }}>{f}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Buy box */}
        <div style={{ position: "sticky", top: 80, alignSelf: "start" }}>
          <div style={{ border: "1px solid #DDD", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 22, color: "#0F1111", fontWeight: 400 }}>
              ₹{product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </div>

            <div style={{ fontSize: 13, color: "#007600" }}>
              FREE Delivery <strong>{product.deliveryDate}</strong>
            </div>

            <div style={{ fontSize: 13, color: "#007600", fontWeight: 700 }}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            {/* Qty */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <label style={{ fontSize: 13, color: "#333" }}>Qty:</label>
              <select value={qty} onChange={e => setQty(Number(e.target.value))} style={{
                border: "1px solid #DDD",
                borderRadius: 4,
                padding: "4px 8px",
                fontSize: 14,
                background: "#f7f8f8",
              }}>
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <button onClick={handleAdd} style={{
              background: "#FFD814",
              border: "1px solid #FCD200",
              borderRadius: 20,
              padding: "10px",
              fontSize: 14,
              cursor: "pointer",
              fontWeight: 500,
            }}>
              {added ? "✓ Added to Cart!" : "Add to Cart"}
            </button>

            <button onClick={() => { addToCart(product, qty); navigate("checkout"); }} style={{
              background: "#FF9900",
              border: "1px solid #FF8F00",
              borderRadius: 20,
              padding: "10px",
              fontSize: 14,
              cursor: "pointer",
              fontWeight: 500,
            }}>
              Buy Now
            </button>

            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>
              <div>Ships from <span style={{ color: "#0F1111" }}>Amazon</span></div>
              <div>Sold by <span style={{ color: "#007185" }}>{product.brand}</span></div>
            </div>

            {inCart && (
              <div
                onClick={() => navigate("cart")}
                style={{ fontSize: 13, color: "#007185", cursor: "pointer", textAlign: "center" }}
              >View in cart →</div>
            )}
          </div>

          {/* Prime box */}
          <div style={{ border: "1px solid #DDD", borderRadius: 8, padding: 12, marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ background: "#00A8E1", color: "white", fontSize: 11, fontWeight: 700, padding: "2px 6px", borderRadius: 2 }}>prime</span>
              <span style={{ fontSize: 13, color: "#007185" }}>Try Prime FREE 30 days</span>
            </div>
            <div style={{ fontSize: 12, color: "#555" }}>Get FREE delivery with Amazon Prime</div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 16px" }}>Customers also viewed</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {related.map(p => (
              <ProductCard key={p.id} product={p} navigate={navigate} addToCart={addToCart} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
