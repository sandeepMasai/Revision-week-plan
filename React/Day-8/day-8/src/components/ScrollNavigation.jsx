import { useEffect, useRef, useState } from "react";

const sections = ["about", "services", "portfolio", "contact"];

export default function ScrollNavigation() {
  const sectionRefs = useRef({});
  const activeSectionRef = useRef("about");
  const [active, setActive] = useState("about");

  const scrollToSection = (id) => {
    sectionRefs.current[id].scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (let id of sections) {
        const section = sectionRefs.current[id];
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          if (activeSectionRef.current !== id) {
            activeSectionRef.current = id;
            setActive(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav style={navStyle}>
        {sections.map((sec) => (
          <button
            key={sec}
            onClick={() => scrollToSection(sec)}
            style={{
              ...navButton,
              color: active === sec ? "blue" : "black",
              fontWeight: active === sec ? "bold" : "normal",
            }}
          >
            {sec.toUpperCase()}
          </button>
        ))}
      </nav>

      {/* Sections */}
      {sections.map((sec) => (
        <section
          key={sec}
          ref={(el) => (sectionRefs.current[sec] = el)}
          style={sectionStyle}
        >
          <h1>{sec.toUpperCase()}</h1>
          <p>Content for {sec} section</p>
        </section>
      ))}
    </>
  );
}

/* Styles */
const navStyle = {
  position: "fixed",
  top: 0,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  padding: "10px",
  background: "#fff",
  zIndex: 1000,
};

const navButton = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
};

const sectionStyle = {
  height: "100vh",
  paddingTop: "80px",
  textAlign: "center",
};
