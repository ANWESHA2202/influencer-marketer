"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [animationClass, setAnimationClass] = useState("");

  // Get animation class based on route
  const getAnimationClass = (path: string) => {
    if (path.includes("/campaigns")) return "page-enter-campaigns";
    if (path.includes("/dashboard")) return "page-enter-dashboard";
    if (path.includes("/profile")) return "page-enter-profile";
    return "page-enter";
  };

  useEffect(() => {
    // Start transition
    setIsTransitioning(true);

    // Update content and animation after fade out
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setAnimationClass(getAnimationClass(pathname));
      setIsTransitioning(false);
    }, 150); // Half of the transition duration

    // Clear animation class after animation completes
    const clearAnimationTimer = setTimeout(() => {
      setAnimationClass("");
    }, 550); // Total animation duration

    return () => {
      clearTimeout(timer);
      clearTimeout(clearAnimationTimer);
    };
  }, [pathname, children]);

  return (
    <div className="page-transition-container">
      <div
        className={`page-transition-content ${
          isTransitioning ? "transitioning" : ""
        } ${animationClass}`}
        style={{
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {displayChildren}
      </div>
    </div>
  );
};

export default PageTransition;
