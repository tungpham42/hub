import React, { useState, useEffect } from "react";
import { FloatButton } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
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
      icon={<VerticalAlignTopOutlined />}
      onClick={scrollToTop}
      style={{
        right: 24,
        bottom: 24,
      }}
      tooltip="Back to Top"
    />
  );
};

export default BackToTop;
