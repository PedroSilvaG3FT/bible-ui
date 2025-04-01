import { useState, useEffect } from "react";

export default function useWindowScroll(threshold = 100) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (window.scrollY > threshold) setScrolled(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return scrolled;
}
