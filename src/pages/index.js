import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--info', styles.heroBanner)}>
      <div className="container">
        <img src="img/logo.svg" height="275"/>
        <p style={{ padding: '15px' }}>A community-resource for exchanging and implementing best practices in software lifecycle improvements.</p>
        <Row className="justify-content-center">
          <Col xs={12} md="auto" className={styles.buttonWrapper}>
            <Link className="button button--primary button--lg" to="/docs/guides/search">
              See our Best Practice Guides
            </Link>
          </Col>
          <Col xs={12} md="auto" className={`${styles.buttonWrapper} mt-3 mt-md-0`}>
            <Link className="button button--secondary button--lg" to="/docs/contribute/submit-best-practice">
              Submit a Best Practice Guide
            </Link>
          </Col>
          <Col xs={12} md="auto" className={`${styles.buttonWrapper} mt-3 mt-md-0`}>
            <Link className="button button--primary button--lg" to="/docs/tools">
              Use our Tools
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
      description="Software Lifecycle Improvement & Modernization (SLIM)">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
