import React, { ReactElement, useEffect, useRef, useState } from "react";

interface IAnimateProps {
  delay?: number;
  animation: string;
  children: ReactElement;
  animationScroll?: boolean;
}

export default function Animate(props: IAnimateProps) {
  const { children, animation, delay = 0, animationScroll = false } = props;

  const [isVisible, setIsVisible] = useState(!animationScroll);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (animationScroll && ref.current) {
      const element = ref.current;
      element.style.visibility = "hidden";

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
              element.style.visibility = "visible";
              element.style.animationDelay = `${delay}ms`;
              setIsVisible(true);
              observer.unobserve(element);
            } else {
              element.style.visibility = "hidden";
              setIsVisible(false);
            }
          });
        },
        {
          threshold: 0.25,
          root: null,
          rootMargin: "0px",
        }
      );

      observer.observe(element);

      return () => observer.disconnect();
    } else {
      setIsVisible(true);
    }
  }, [animationScroll, delay]);

  const currentClass = children.props.className || "";
  const animationClass = isVisible ? `animate__animated ${animation}` : "";

  return React.cloneElement(children, {
    ref,
    className: `${currentClass} ${animationClass}`.trim(),
    style: {
      ...children.props.style,
      animationDelay: isVisible ? `${delay}ms` : undefined,
    },
  });
}
