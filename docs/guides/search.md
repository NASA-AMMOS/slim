---
sidebar_position: 1
---

import FacetedPanels from '@site/src/components/FacetedPanels';
import registryJSON from '@site/static/data/slim-registry.json';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

# Guides

Explore our guides via the categories below or the left-hand navigation. You may also search our guides.

<div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px' }}>
  <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>Software Lifecycle</Card.Title>
      <Card.Text>
        Covers the entire process of software development, continuous pipelines, application kits, testing, and security.
      </Card.Text>
      <Button variant="primary" href="/slim/docs/category/software-lifecycle">Explore</Button>
    </Card.Body>
  </Card>

  <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>Governance</Card.Title>
      <Card.Text>
        Dedicated to establishing robust governance frameworks, with standards for contributions and governance models.
      </Card.Text>
      <Button variant="primary" href="/slim/docs/category/governance">Explore</Button>
    </Card.Body>
  </Card>

  <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>Documentation</Card.Title>
      <Card.Text>
        Focuses on creating effective project documentation, including Change Logs, Documentation Hosts, and README templates.
      </Card.Text>
      <Button variant="primary" href="/slim/docs/category/documentation">Explore</Button>
    </Card.Body>
  </Card>
</div>

<hr/><br/>

## Search

<FacetedPanels panelsData={ registryJSON } />

