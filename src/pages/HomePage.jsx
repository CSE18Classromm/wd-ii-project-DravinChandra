import { useState } from "react";
import { products, categories, dealProducts } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function HomePage({ navigate, searchQuery, addToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = products.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Hero Banner */}
      {!searchQuery && (
        <div style={{
          background: "linear-gradient(135deg, #131921 0%, #232F3E 50%, #37475A 100%)",
          padding: "40px 24px",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: 12 }} />
          <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
            <div style={{ fontSize: 13, color: "#FF9900", fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>GREAT INDIAN SALE</div>
            <h1 style={{ fontSize: 36, fontWeight: 900, margin: "0 0 12px", lineHeight: 1.2 }}>
              Deals You <span style={{ color: "#FF9900" }}>Can't Miss</span>
            </h1>
            <p style={{ fontSize: 16, color: "#CCC", margin: "0 0 24px" }}>
              Up to 70% off on top brands — Electronics, Fashion, Home & more
            </p>
            <button style={{
              background: "#FF9900",
              border: "none",
              borderRadius: 4,
              padding: "12px 32px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              color: "#111",
            }}>Shop Now</button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "16px" }}>

        {/* Today's Deals */}
        {!searchQuery && (
          <section style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0F1111", margin: 0 }}>Today's Deals</h2>
              <span style={{ color: "#007185", fontSize: 14, cursor: "pointer" }}>See all deals</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              {dealProducts.map(p => (
                <div key={p.id} onClick={() => navigate("product", p)} style={{
                  background: "white",
                  borderRadius: 8,
                  padding: 16,
                  cursor: "pointer",
                  border: "1px solid #DDD",
                  textAlign: "center",
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                >
                  <img src={p.image} alt={p.name} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ fontSize: 12, color: "#CC0C39", fontWeight: 700 }}>
                    -{Math.round((1 - p.price / p.originalPrice) * 100)}% off
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#0F1111", marginTop: 4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                    {p.name}
                  </div>
                  <div style={{ background: "#CC0C39", height: 6, borderRadius: 3, marginTop: 8 }}>
                    <div style={{ background: "#FF9900", width: "65%", height: "100%", borderRadius: 3 }} />
                  </div>
                  <div style={{ fontSize: 11, color: "#CC0C39", marginTop: 4 }}>65% claimed</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Category Filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "6px 16px",
                borderRadius: 20,
                border: "1px solid",
                borderColor: activeCategory === cat ? "#FF9900" : "#DDD",
                background: activeCategory === cat ? "#FF9900" : "white",
                color: activeCategory === cat ? "#111" : "#555",
                fontSize: 13,
                fontWeight: activeCategory === cat ? 700 : 400,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >{cat}</button>
          ))}
        </div>

        {/* Search results header */}
        {searchQuery && (
          <div style={{ marginBottom: 16, fontSize: 18, color: "#0F1111" }}>
            {filtered.length > 0
              ? <span>Showing <strong>{filtered.length}</strong> results for "<em>{searchQuery}</em>"</span>
              : <span>No results for "<em>{searchQuery}</em>"</span>
            }
          </div>
        )}

        {/* Product Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} navigate={navigate} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}
