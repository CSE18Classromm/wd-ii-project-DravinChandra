import { useState } from "react";

export default function CheckoutPage({ cart, navigate, placeOrder }) {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ name: "", mobile: "", pincode: "", flat: "", area: "", city: "", state: "Delhi" });
  const [payment, setPayment] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 499 ? 0 : 40;
  const total = subtotal + shipping;

  const validateAddress = () => {
    const errs = {};
    if (!address.name.trim()) errs.name = "Full name is required";
    if (!address.mobile.trim() || !/^\d{10}$/.test(address.mobile)) errs.mobile = "Enter valid 10-digit mobile";
    if (!address.pincode.trim() || !/^\d{6}$/.test(address.pincode)) errs.pincode = "Enter valid 6-digit pincode";
    if (!address.flat.trim()) errs.flat = "Required";
    if (!address.area.trim()) errs.area = "Required";
    if (!address.city.trim()) errs.city = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = () => {
    const id = "408-" + Math.floor(Math.random() * 9000000 + 1000000) + "-" + Math.floor(Math.random() * 9000000 + 1000000);
    placeOrder(id);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 24, background: "white", borderRadius: 8, padding: "12px 24px" }}>
        {["Address", "Payment", "Review"].map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: i + 1 < step ? "pointer" : "default" }} onClick={() => i + 1 < step && setStep(i + 1)}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: step > i + 1 ? "#007600" : step === i + 1 ? "#FF9900" : "#DDD",
                color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, flexShrink: 0,
              }}>{step > i + 1 ? "✓" : i + 1}</div>
              <span style={{ fontSize: 14, fontWeight: step === i + 1 ? 700 : 400, color: step === i + 1 ? "#FF9900" : step > i + 1 ? "#007600" : "#888" }}>{s}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? "#007600" : "#EEE", margin: "0 8px" }} />}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 16, alignItems: "start" }}>
        
        {/* Left panel */}
        <div style={{ background: "white", borderRadius: 8, padding: 24 }}>

          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 20px" }}>Delivery Address</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field label="Full Name" value={address.name} onChange={v => setAddress(a => ({...a, name: v}))} error={errors.name} full />
                <Field label="Mobile Number" value={address.mobile} onChange={v => setAddress(a => ({...a, mobile: v}))} error={errors.mobile} placeholder="10-digit mobile number" />
                <Field label="Pincode" value={address.pincode} onChange={v => setAddress(a => ({...a, pincode: v}))} error={errors.pincode} placeholder="6-digit pincode" />
                <Field label="Flat, House no., Apartment" value={address.flat} onChange={v => setAddress(a => ({...a, flat: v}))} error={errors.flat} />
                <Field label="Area, Colony, Street" value={address.area} onChange={v => setAddress(a => ({...a, area: v}))} error={errors.area} full />
                <Field label="Town / City" value={address.city} onChange={v => setAddress(a => ({...a, city: v}))} error={errors.city} />
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>State</label>
                  <select value={address.state} onChange={e => setAddress(a => ({...a, state: e.target.value}))} style={{ width: "100%", padding: "8px 10px", border: "1px solid #DDD", borderRadius: 4, fontSize: 14 }}>
                    {["Delhi","Maharashtra","Karnataka","Tamil Nadu","Uttar Pradesh","West Bengal","Rajasthan","Gujarat","Telangana","Kerala"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={() => { if (validateAddress()) setStep(2); }} style={btnStyle("#FFD814")}>
                Deliver to this address
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 20px" }}>Select Payment Method</h2>
              {[
                { id: "upi", label: "UPI" },
                { id: "card", label: "Credit / Debit / ATM Card" },
                { id: "netbanking", label: "Net Banking" },
                { id: "cod", label: "Cash on Delivery" },
              ].map(opt => (
                <div key={opt.id} style={{ border: `2px solid ${payment === opt.id ? "#FF9900" : "#EEE"}`, borderRadius: 8, padding: 16, marginBottom: 10, cursor: "pointer" }} onClick={() => setPayment(opt.id)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <input type="radio" readOnly checked={payment === opt.id} style={{ accentColor: "#FF9900", width: 16, height: 16 }} />
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{opt.label}</span>
                  </div>
                  {payment === opt.id && opt.id === "upi" && (
                    <div style={{ marginTop: 12, paddingLeft: 26 }}>
                      <input value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="Enter UPI ID (e.g. name@upi)" style={inputStyle} />
                    </div>
                  )}
                  {payment === opt.id && opt.id === "card" && (
                    <div style={{ marginTop: 12, paddingLeft: 26, display: "flex", flexDirection: "column", gap: 10 }}>
                      <input value={card.number} onChange={e => setCard(c => ({...c, number: e.target.value}))} placeholder="Card number" style={inputStyle} maxLength={19} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <input value={card.expiry} onChange={e => setCard(c => ({...c, expiry: e.target.value}))} placeholder="MM/YY" style={inputStyle} maxLength={5} />
                        <input value={card.cvv} onChange={e => setCard(c => ({...c, cvv: e.target.value}))} placeholder="CVV" style={inputStyle} maxLength={3} type="password" />
                      </div>
                      <input value={card.name} onChange={e => setCard(c => ({...c, name: e.target.value}))} placeholder="Name on card" style={inputStyle} />
                    </div>
                  )}
                  {payment === opt.id && opt.id === "netbanking" && (
                    <div style={{ marginTop: 12, paddingLeft: 26, display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["SBI", "HDFC", "ICICI", "Axis", "Kotak"].map(b => (
                        <div key={b} style={{ border: "1px solid #DDD", borderRadius: 4, padding: "6px 14px", fontSize: 13, cursor: "pointer" }}>{b}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button onClick={() => setStep(3)} style={btnStyle("#FFD814")}>Continue</button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 20px" }}>Review your order</h2>

              {/* Delivery info */}
              <div style={{ background: "#f7f8f8", borderRadius: 8, padding: 16, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>Delivering to: {address.name}</div>
                    <div style={{ fontSize: 13, color: "#555" }}>{address.flat}, {address.area}, {address.city}, {address.state} - {address.pincode}</div>
                    <div style={{ fontSize: 13, color: "#555" }}>Mobile: {address.mobile}</div>
                  </div>
                  <span onClick={() => setStep(1)} style={{ fontSize: 13, color: "#007185", cursor: "pointer" }}>Change</span>
                </div>
              </div>

              {/* Items */}
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid #EEE" }}>
                  <img src={item.image} alt={item.name} style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 4 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#007600", marginTop: 2 }}>Arrives: {item.deliveryDate}</div>
                    <div style={{ fontSize: 13, marginTop: 4 }}>Qty: {item.qty}</div>
                  </div>
                  <div style={{ fontWeight: 700 }}>₹{(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))}

              <button onClick={handlePlaceOrder} style={{ ...btnStyle("#FF9900"), marginTop: 20 }}>
                Place your order
              </button>
              <div style={{ fontSize: 12, color: "#555", textAlign: "center", marginTop: 8 }}>
                By placing your order, you agree to Amazon's privacy policy and conditions.
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div style={{ background: "white", borderRadius: 8, padding: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px", paddingBottom: 12, borderBottom: "1px solid #EEE" }}>Order Summary</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
            <Row label={`Items (${cart.reduce((s,i)=>s+i.qty,0)})`} value={`₹${subtotal.toFixed(2)}`} />
            <Row label="Delivery" value={shipping === 0 ? "FREE" : `₹${shipping}`} valueColor={shipping === 0 ? "#007600" : undefined} />
            <div style={{ borderTop: "1px solid #EEE", paddingTop: 10, marginTop: 4, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
              <span>Order Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", gap: 8, marginTop: 12, paddingTop: 8, borderTop: "1px solid #EEE" }}>
              <img src={item.image} alt={item.name} style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 4 }} />
              <div style={{ fontSize: 12, flex: 1, lineHeight: 1.4 }}>{item.name.substring(0, 50)}...</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error, placeholder, full }) {
  return (
    <div style={{ gridColumn: full ? "span 2" : undefined }}>
      <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ ...inputStyle, borderColor: error ? "#CC0C39" : "#DDD" }}
      />
      {error && <div style={{ fontSize: 12, color: "#CC0C39", marginTop: 2 }}>{error}</div>}
    </div>
  );
}

function Row({ label, value, valueColor }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ color: "#555" }}>{label}</span>
      <span style={{ color: valueColor || "#0F1111" }}>{value}</span>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  border: "1px solid #DDD",
  borderRadius: 4,
  fontSize: 14,
  boxSizing: "border-box",
  outline: "none",
};

const btnStyle = (bg) => ({
  background: bg,
  border: "none",
  borderRadius: 20,
  padding: "12px",
  fontSize: 15,
  cursor: "pointer",
  fontWeight: 600,
  width: "100%",
  marginTop: 20,
});
