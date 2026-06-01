export default function CartPage({ cart, navigate, removeFromCart, updateQty }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const savings = cart.reduce((s, i) => s + (i.originalPrice - i.price) * i.qty, 0);

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: 1000, margin: "40px auto", padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
        <h2 style={{ fontSize: 24, color: "#0F1111", marginBottom: 8 }}>Your Amazon Cart is empty</h2>
        <p style={{ color: "#555", marginBottom: 24 }}>Shop today's deals and fill it up!</p>
        <button onClick={() => navigate("home")} style={{
          background: "#FFD814",
          border: "none",
          borderRadius: 4,
          padding: "10px 24px",
          fontSize: 15,
          cursor: "pointer",
          fontWeight: 600,
        }}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 16, alignItems: "start" }}>
        
        {/* Cart items */}
        <div style={{ background: "white", borderRadius: 8, padding: 20 }}>
          <h1 style={{ fontSize: 24, fontWeight: 400, margin: "0 0 16px", paddingBottom: 16, borderBottom: "1px solid #EEE" }}>
            Shopping Cart
          </h1>

          {cart.map((item, idx) => (
            <div key={item.id} style={{
              display: "grid",
              gridTemplateColumns: "100px minmax(0,1fr)",
              gap: 16,
              paddingBottom: 16,
              marginBottom: 16,
              borderBottom: idx < cart.length - 1 ? "1px solid #EEE" : "none",
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: 4, cursor: "pointer", border: "1px solid #EEE" }}
                onClick={() => navigate("product", item)}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div
                  style={{ fontSize: 16, color: "#007185", cursor: "pointer", lineHeight: 1.4 }}
                  onClick={() => navigate("product", item)}
                >{item.name}</div>

                <div style={{ fontSize: 12, color: "#007600", fontWeight: 700 }}>In Stock</div>

                {item.prime && (
                  <span style={{ background: "#00A8E1", color: "white", fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 2, width: "fit-content" }}>prime</span>
                )}

                <div style={{ fontSize: 12, color: "#007600" }}>FREE Delivery: {item.deliveryDate}</div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
                  {/* Qty */}
                  <div style={{ display: "flex", border: "1px solid #DDD", borderRadius: 4, overflow: "hidden" }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ padding: "4px 10px", border: "none", background: "#f7f8f8", cursor: "pointer", fontSize: 16 }}>−</button>
                    <span style={{ padding: "4px 12px", borderLeft: "1px solid #DDD", borderRight: "1px solid #DDD", fontSize: 14, display: "flex", alignItems: "center" }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ padding: "4px 10px", border: "none", background: "#f7f8f8", cursor: "pointer", fontSize: 16 }}>+</button>
                  </div>

                  <span style={{ color: "#DDD" }}>|</span>
                  <span
                    onClick={() => removeFromCart(item.id)}
                    style={{ fontSize: 13, color: "#007185", cursor: "pointer" }}
                  >Delete</span>
                  <span style={{ color: "#DDD" }}>|</span>
                  <span style={{ fontSize: 13, color: "#007185", cursor: "pointer" }}>Save for later</span>
                </div>
              </div>

              <div style={{ gridColumn: "2", textAlign: "right" }}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>
                  ₹{(item.price * item.qty).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
                {item.qty > 1 && (
                  <div style={{ fontSize: 12, color: "#555" }}>₹{item.price.toFixed(2)} each</div>
                )}
              </div>
            </div>
          ))}

          <div style={{ textAlign: "right", fontSize: 18, borderTop: "1px solid #EEE", paddingTop: 16 }}>
            Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items):{" "}
            <strong>₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</strong>
          </div>
        </div>

        {/* Order summary */}
        <div>
          <div style={{ background: "white", borderRadius: 8, padding: 20 }}>
            {savings > 0 && (
              <div style={{ color: "#CC0C39", fontSize: 14, marginBottom: 12 }}>
                Your order is eligible for <strong>FREE Delivery</strong>
              </div>
            )}
            <div style={{ fontSize: 18, marginBottom: 16 }}>
              Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items):{" "}
              <strong>₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</strong>
            </div>
            {savings > 0 && (
              <div style={{ fontSize: 14, color: "#CC0C39", marginBottom: 16 }}>
                ✓ Your order saves: <strong>₹{savings.toFixed(2)}</strong>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <input type="checkbox" id="gift" />
              <label htmlFor="gift" style={{ fontSize: 13, cursor: "pointer" }}>This order contains a gift</label>
            </div>
            <button
              onClick={() => navigate("checkout")}
              style={{
                background: "#FFD814",
                border: "1px solid #FCD200",
                borderRadius: 20,
                padding: "12px",
                fontSize: 15,
                cursor: "pointer",
                fontWeight: 600,
                width: "100%",
              }}
            >Proceed to Buy</button>

            <button
              onClick={() => navigate("home")}
              style={{
                background: "white",
                border: "1px solid #DDD",
                borderRadius: 20,
                padding: "10px",
                fontSize: 14,
                cursor: "pointer",
                width: "100%",
                marginTop: 8,
              }}
            >Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  );
}
