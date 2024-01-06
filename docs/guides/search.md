---
sidebar_position: 1
---

import FacetedPanels from '@site/src/components/FacetedPanels';
import registryJSON from '@site/static/data/slim-registry.json';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

# Guides

Welcome to our best practice guide resources! 

Here's how to get started using our resources:
- Use the below section links or left-navigation sidebar to explore our best practice guides
- Use the faceted search below to find exactly the type of best practice you're looking for

## Sections

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

