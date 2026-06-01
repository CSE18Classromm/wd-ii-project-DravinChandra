import { useEffect, useState } from "react";

export default function Navbar({
  cartCount,
  navigate,
  searchQuery,
  setSearchQuery,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [placeholder, setPlaceholder] = useState("Search Amazon.in");

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typing placeholder animation
  useEffect(() => {
    const texts = [
      "Search Mobiles",
      "Search Laptops",
      "Search Shoes",
      "Search Headphones",
      "Search Amazon.in",
    ];

    let index = 0;

    const interval = setInterval(() => {
      setPlaceholder(texts[index]);
      index = (index + 1) % texts.length;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header>
      {/* Top bar */}
      <div
        style={{
          background: scrolled ? "#0F1111" : "#131921",
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
          gap: 12,
          flexWrap: "wrap",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          transition: "0.4s ease",
          boxShadow: scrolled
            ? "0 4px 10px rgba(0,0,0,0.4)"
            : "none",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("home")}
          style={{
            cursor: "pointer",
            border: "1px solid transparent",
            borderRadius: 4,
            padding: "4px 6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "white";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <svg
            width="90"
            height="28"
            viewBox="0 0 120 38"
            fill="none"
          >
            <text
              x="0"
              y="26"
              fontFamily="Arial Black, Arial"
              fontSize="28"
              fontWeight="900"
              fill="white"
            >
              amazon
            </text>

            <path
              d="M6 32 Q46 42 90 32"
              stroke="#FF9900"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            <polygon
              points="85,30 93,28 90,35"
              fill="#FF9900"
            />
          </svg>

          <span
            style={{
              color: "#CCC",
              fontSize: 10,
              marginTop: -4,
            }}
          >
            .in
          </span>
        </div>

        {/* Deliver */}
        <div
          style={{
            color: "#CCC",
            fontSize: 12,
            cursor: "pointer",
            minWidth: 80,
            transition: "0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-2px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0px)")
          }
        >
          <div style={{ fontSize: 10 }}>Deliver to</div>

          <div
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            India
          </div>
        </div>

        {/* Search */}
        <div
          style={{
            flex: 1,
            display: "flex",
            minWidth: 200,
            maxWidth: 800,
          }}
        >
          <div
            style={{
              background: "#FF9900",
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              borderRadius: "4px 0 0 4px",
              fontWeight: 600,
            }}
          >
            All ▾
          </div>

          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate("home")
            }
            placeholder={placeholder}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              padding: "10px 14px",
              fontSize: 14,
              transition: "0.3s",
            }}
            onFocus={(e) => {
              e.target.style.boxShadow =
                "0 0 0 3px orange";
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = "none";
            }}
          />

          <button
            onClick={() => navigate("home")}
            style={{
              background: "#FF9900",
              border: "none",
              cursor: "pointer",
              padding: "0 16px",
              borderRadius: "0 4px 4px 0",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "#ffb84d")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "#FF9900")
            }
          >
            🔍
          </button>
        </div>

        {/* Right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginLeft: "auto",
          }}
        >
          <NavItem
            label="Hello, sign in"
            sublabel="Account & Lists"
          />

          <NavItem
            label="Returns"
            sublabel="& Orders"
          />

          {/* Cart */}
          <div
            onClick={() => navigate("cart")}
            style={{
              display: "flex",
              alignItems: "flex-end",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: 2,
              border: "1px solid transparent",
              gap: 4,
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor =
                "white";
              e.currentTarget.style.transform =
                "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                "transparent";
              e.currentTarget.style.transform =
                "scale(1)";
            }}
          >
            <div style={{ position: "relative" }}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 40 40"
                fill="white"
              >
                <path d="M6 4H4V0H2v4H0v2h2v4h2V6h2V4zM8 2H32L30 22H10L8 2z" transform="translate(3,6)" />

                <circle
                  cx="15"
                  cy="34"
                  r="3"
                  fill="white"
                />

                <circle
                  cx="27"
                  cy="34"
                  r="3"
                  fill="white"
                />
              </svg>

              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    background: "#FF9900",
                    color: "#111",
                    borderRadius: "50%",
                    width: 22,
                    height: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    animation:
                      cartCount > 0
                        ? "bounce 0.5s"
                        : "none",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>

            <span
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              Cart
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          background: "#232F3E",
          padding: "8px 16px",
          display: "flex",
          gap: 4,
          overflowX: "auto",
        }}
      >
        {[
          "Today's Deals",
          "Customer Service",
          "Registry",
          "Gift Cards",
          "Sell",
          "Prime",
        ].map((label) => (
          <div
            key={label}
            style={{
              color: "white",
              fontSize: 13,
              padding: "4px 10px",
              cursor: "pointer",
              borderRadius: 2,
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "transparent";
              e.currentTarget.style.transform =
                "translateY(0px)";
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes bounce {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </header>
  );
}

function NavItem({ label, sublabel }) {
  return (
    <div
      style={{
        cursor: "pointer",
        padding: "4px 8px",
        border: "1px solid transparent",
        borderRadius: 2,
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "white";
        e.currentTarget.style.transform =
          "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor =
          "transparent";
        e.currentTarget.style.transform =
          "translateY(0px)";
      }}
    >
      <div style={{ color: "#CCC", fontSize: 11 }}>
        {label}
      </div>

      <div
        style={{
          color: "white",
          fontWeight: 700,
          fontSize: 13,
        }}
      >
        {sublabel}
      </div>
    </div>
  );
}