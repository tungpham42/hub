import React, { useState, useEffect } from "react";
import { FloatButton } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <FloatButton
      type="primary"
      icon={<ArrowUpOutlined />}
      onClick={scrollToTop}
      style={{
        right: 24,
        bottom: 24,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #FF6B6B 0%, #FFA726 100%)",
        border: "none",
        boxShadow: "0 4px 20px rgba(255, 107, 107, 0.3)",
        transition: "all 0.3s ease",
      }}
      tooltip={
        <span style={{ color: "var(--warm-secondary)" }}>Back to Top</span>
      }
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.transform = "scale(1.1)";
        target.style.boxShadow = "0 6px 24px rgba(255, 107, 107, 0.4)";
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.transform = "scale(1)";
        target.style.boxShadow = "0 4px 20px rgba(255, 107, 107, 0.3)";
      }}
    />
  );
};

export default BackToTop;
