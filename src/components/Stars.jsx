export default function Stars({ rating, count }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ display: "flex" }}>
        {[1,2,3,4,5].map(i => (
          <span key={i} style={{ fontSize: 15, color: i <= full ? "#FF9900" : half && i === full + 1 ? "#FF9900" : "#DDD" }}>
            {i <= full ? "★" : half && i === full + 1 ? "⯨" : "☆"}
          </span>
        ))}
      </div>
      {count != null && (
        <span style={{ color: "#007185", fontSize: 13, cursor: "pointer" }}>
          {count.toLocaleString()}
        </span>
      )}
    </div>
  );
}
