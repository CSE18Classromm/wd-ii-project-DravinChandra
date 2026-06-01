import { useEffect, useState } from "react";

export default function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const sectionStyle = {
    margin: "20px",
    minWidth: "180px",
    transition: "0.5s",
    cursor: "pointer",
  };

  const textStyle = {
    margin: "8px 0",
    color: "#DDD",
    transition: "0.3s",
  };

  return (
    <>
    <footer
      style={{
        backgroundColor: "#131A22",
        color: "white",
        marginTop: "40px",
        paddingTop: "30px",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Top Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          padding: "20px",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0px)"
            : "translateY(50px)",
          transition: "all 1s ease",
        }}
      >
        {/* Column 1 */}
        <div
          style={sectionStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          <h3>Get to Know Us</h3>
          <p style={textStyle}>About Us</p>
          <p style={textStyle}>Careers</p>
          <p style={textStyle}>Press Releases</p>
          <p style={textStyle}>Amazon Science</p>
        </div>

        {/* Column 2 */}
        <div
          style={sectionStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          <h3>Connect with Us</h3>
          <p style={textStyle}>Facebook</p>
          <p style={textStyle}>Twitter</p>
          <p style={textStyle}>Instagram</p>
        </div>

        {/* Column 3 */}
        <div
          style={sectionStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          <h3>Make Money with Us</h3>
          <p style={textStyle}>Sell on Amazon</p>
          <p style={textStyle}>Affiliate Program</p>
          <p style={textStyle}>Advertise Products</p>
          <p style={textStyle}>Amazon Pay</p>
        </div>

        {/* Column 4 */}
        <div
          style={sectionStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          <h3>Let Us Help You</h3>
          <p style={textStyle}>Your Account</p>
          <p style={textStyle}>Returns Centre</p>
          <p style={textStyle}>Help</p>
          <p style={textStyle}>100% Purchase Protection</p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        style={{
          borderTop: "1px solid #3a4553",
          textAlign: "center",
          padding: "15px",
          marginTop: "20px",
          fontSize: "14px",
          color: "#DDD",
          animation: "fadeIn 2s ease",
        }}
      >
        © 2026 Amazon Clone | All Rights Reserved
      </div>
    </footer>
    </>
  );
}