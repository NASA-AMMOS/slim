---
sidebar_position: 1
---

import FacetedPanels from '@site/src/components/FacetedPanels';
import registryJSON from '@site/static/data/slim-registry.json';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

# Guides

Explore our guides via the categories below or the left-hand navigation. You may also search our guides.

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '20px', justifyContent: 'center' }}>
  <Link to="/slim/docs/category/software-lifecycle" style={{ width: '18rem', textDecoration: 'none' }}>
    <Card style={{ flex: '1 0 auto', cursor: 'pointer' }}>
      <Card.Body style={{ textAlign: 'center' }}>
        <img src="/slim/img/lifecycle.svg" alt="Software Lifecycle"></img>
        <Card.Title>Software Lifecycle</Card.Title>
        <Card.Text>
          Covers the entire process of software development, continuous pipelines, application kits, testing, and security.
        </Card.Text>
      </Card.Body>
    </Card>
  </Link>

  <Link to="/slim/docs/category/governance" style={{ width: '18rem', textDecoration: 'none' }}>
    <Card style={{ flex: '1 0 auto', cursor: 'pointer' }}>
      <Card.Body style={{ textAlign: 'center' }}>
        <img src="/slim/img/governance.svg" alt="Governance"></img>
        <Card.Title>Governance</Card.Title>
        <Card.Text>
          Dedicated to establishing robust governance frameworks, with standards for contributions and governance models.
        </Card.Text>
      </Card.Body>
    </Card>
  </Link>

  <Link to="/slim/docs/category/documentation" style={{ width: '18rem', textDecoration: 'none' }}>
    <Card style={{ flex: '1 0 auto', cursor: 'pointer' }}>
      <Card.Body style={{ textAlign: 'center' }}>
        <img src="/slim/img/documentation.svg" alt="Documentation"></img>
        <Card.Title>Documentation</Card.Title>
        <Card.Text>
          Focuses on creating effective project documentation, including Change Logs, Documentation Hosts, and README templates.
        </Card.Text>
      </Card.Body>
    </Card>
  </Link>
</div>

<hr/><br/>

## Search

<FacetedPanels panelsData={ registryJSON } />

