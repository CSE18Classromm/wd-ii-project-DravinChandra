export default function OrderConfirmPage({ orderId, navigate }) {
  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 24 }}>
      <div style={{ background: "white", borderRadius: 8, padding: 40, textAlign: "center" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "#f0faf0", border: "3px solid #007600",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px", fontSize: 36,
        }}>✓</div>
        <div style={{ color: "#007600", fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>ORDER PLACED!</div>
        <h1 style={{ fontSize: 26, fontWeight: 400, color: "#0F1111", margin: "0 0 8px" }}>
          Thank you, your order has been placed.
        </h1>
        <div style={{ fontSize: 14, color: "#555", marginBottom: 24 }}>
          Order #{orderId}
        </div>

        <div style={{ background: "#f7f8f8", borderRadius: 8, padding: 20, marginBottom: 24, textAlign: "left" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>What happens next?</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "📧", title: "Confirmation email sent", desc: "Check your inbox for order details" },
              { icon: "📦", title: "Order being prepared", desc: "Your items are being packed at the warehouse" },
              { icon: "🚚", title: "Out for delivery soon", desc: "Expected by tomorrow, May 28" },
              { icon: "🏠", title: "Delivered to your door", desc: "You'll receive a delivery notification" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ fontSize: 22, width: 32, textAlign: "center" }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: "#555" }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("home")}
            style={{
              background: "#FFD814",
              border: "1px solid #FCD200",
              borderRadius: 20,
              padding: "10px 28px",
              fontSize: 14,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >Continue Shopping</button>
          <button
            style={{
              background: "white",
              border: "1px solid #DDD",
              borderRadius: 20,
              padding: "10px 28px",
              fontSize: 14,
              cursor: "pointer",
            }}
          >Track Order</button>
        </div>
      </div>
    </div>
  );
}
