import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--info', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p>A shared resource for discussing, iterating and referencing best practices in software lifecycle process improvements.</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={styles.buttonWrapper}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              See our Best Practice Guides
            </Link>
          </div>
          <div className={styles.buttonWrapper}>
            <Link className="button button--secondary button--lg" to="/docs/intro" style={{ marginLeft: '10px' }}>
              Submit a Best Practice Guide
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
