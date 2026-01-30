import React, { useEffect } from "react";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import styles from "@site/src/pages/index.module.css";
import { useBrandingConfig } from "../hooks/useBrandingConfig";

function HubHero({ searchTerm, setSearchTerm, isSearchActive, setIsSearchActive }) {
  // Get branding configuration
  const branding = useBrandingConfig();

  const scrollToHub = () => {
    setIsSearchActive(true);
    const hubSection = document.getElementById("hub-content");
    if (hubSection) {
      hubSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Hide scroll button on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSearchActive(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsSearchActive]);

  const scrollToSearchBox = () => {
    // Scroll to position search box at the top of viewport
    const searchContainer = document.getElementById("hero-search-container");
    if (searchContainer) {
      const offset = 20; // Small padding from top
      const elementPosition = searchContainer.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  const handleSearchFocus = () => {
    // Mark search as active and scroll to position search box at top when user clicks
    setIsSearchActive(true);
    scrollToSearchBox();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Auto-scroll when user starts typing
    if (e.target.value) {
      setIsSearchActive(true);
      scrollToSearchBox();
    }
  };

  // Get corner features from branding configuration
  const shouldShowCorners = branding.shouldShowCorners();
  const cornerFeatures = branding.getCornerFeatures();

  return (
    <div className={clsx("hero hero--info", styles.heroBanner, "hub-hero")}>
      {/* Corner features - conditionally rendered based on config */}
      {shouldShowCorners && cornerFeatures.map((feature, idx) => (
        <div key={idx} className={`corner-feature corner-${feature.position}`}>
          <img src={useBaseUrl(`img/${feature.icon}`)} alt="" />
          <p>{feature.text}</p>
        </div>
      ))}

      {/* Center content */}
      <div className="container hub-hero-center">
        {/* Logo - dynamic path from config */}
        <img
          src={useBaseUrl(branding.getLogoPath())}
          height="275"
          alt={`${branding.getProjectName()} Logo`}
        />

        {/* Tagline - dynamic content from config */}
        <p style={{ padding: "15px", fontSize: "1.1rem", paddingBottom: "30px" }}>
          {branding.getTagline()}
        </p>

        {/* Three action buttons */}
        <Row className="justify-content-center">
          <Col xs={12} md="auto" className={styles.buttonWrapper}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/contribute/submit-ai-plugin"
            >
              ⬆️ Contribute
            </Link>
          </Col>
          <Col
            xs={12}
            md="auto"
            className={`${styles.buttonWrapper} mt-3 mt-md-0`}
          >
            <Link
              className="button button--primary button--lg"
              to="/docs/faq"
            >
              ❓ FAQ
            </Link>
          </Col>
          <Col
            xs={12}
            md="auto"
            className={`${styles.buttonWrapper} mt-3 mt-md-0`}
          >
            <Link
              className="button button--primary button--lg"
              to="/docs/about"
            >
              ℹ️ About
            </Link>
          </Col>
        </Row>

        {/* Search box */}
        <div
          id="hero-search-container"
          style={{
            marginTop: "40px",
            marginBottom: isSearchActive ? "0px" : "15px",
            width: "100%",
            maxWidth: "900px",
            margin: isSearchActive ? "40px auto 0px" : "40px auto 15px",
            padding: "0 20px"
          }}
        >
          <InputGroup size="lg">
            <Form.Control
              type="text"
              placeholder="Search best practices by name, description, or tags..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              style={{
                fontSize: "1.1rem",
                padding: "12px 16px",
                borderRadius: "8px 0 0 8px",
                border: "2px solid var(--ifm-color-primary)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <Button
              variant="primary"
              onClick={scrollToHub}
              style={{
                fontSize: "1.1rem",
                padding: "12px 24px",
                borderRadius: "0 8px 8px 0",
                fontWeight: "600",
                whiteSpace: "nowrap",
              }}
            >
              Search
            </Button>
          </InputGroup>
        </div>
      </div>
    </div>
  );
}

export default HubHero;
