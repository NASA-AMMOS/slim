import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--info", styles.heroBanner)}>
      <div className="container">
        <img src="img/logo.svg" height="275" />
        <p style={{ padding: "15px" }}>
          Modernizing software through the automated infusion of best practices.
        </p>
        <p style={{ paddingBottom: "15px" }}>
          🆕 View Our
          <a href={require("@site/docs/about/SLIM-Infographic.pdf").default}>
            {" "}
            Infographic
          </a>{" "}
          for a Quick Overview
        </p>
        <Row className="justify-content-center">
          <Col xs={12} md="auto" className={styles.buttonWrapper}>
            <Link
              className="button button--primary button--lg"
              to="/docs/guides/search"
            >
              📒 Guides
            </Link>
          </Col>
          <Col
            xs={12}
            md="auto"
            className={`${styles.buttonWrapper} mt-3 mt-md-0`}
          >
            <Link
              className="button button--primary button--lg"
              to="/docs/tools"
            >
              🛠️ Tools
            </Link>
          </Col>
          <Col
            xs={12}
            md="auto"
            className={`${styles.buttonWrapper} mt-3 mt-md-0`}
          >
            <Link
              className="button button--secondary button--lg"
              to="/docs/contribute/submit-best-practice"
            >
              ⬆️ Contribute
            </Link>
          </Col>
        </Row>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Software Lifecycle Improvement & Modernization (SLIM)"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
