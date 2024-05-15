---
sidebar_position: 1
---

import FacetedPanels from '@site/src/components/FacetedPanels';
import registryJSON from '@site/static/data/slim-registry.json';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

# 🔍 Explore Our Guides

Explore our guides via the categories below or the left-hand navigation. You may also search our guides.

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
  <Link to="/slim/docs/category/-software-lifecycle" style={{ width: '18rem', textDecoration: 'none' }}>
    <Card style={{ flex: '1 0 auto', cursor: 'pointer' }}>
      <Card.Body style={{ textAlign: 'center' }}>
        <img src="/slim/img/lifecycle.svg" alt="Software Lifecycle" style={{ maxHeight: '200px' }}></img>
        <Card.Title>Software Lifecycle</Card.Title>
        <Card.Text>
          Covers the entire process of software development: from code development, testing, building, security to deployment and delivery.
        </Card.Text>
      </Card.Body>
    </Card>
  </Link>

  <Link to="/slim/docs/category/-governance" style={{ width: '18rem', textDecoration: 'none' }}>
    <Card style={{ flex: '1 0 auto', cursor: 'pointer' }}>
      <Card.Body style={{ textAlign: 'center' }}>
        <img src="/slim/img/governance.svg" alt="Governance" style={{ maxHeight: '200px' }}></img>
        <Card.Title>Governance</Card.Title>
        <Card.Text>
          Covers governance topics like governance frameworks, standards for contributions, triaging and other ideas.
        </Card.Text>
      </Card.Body>
    </Card>
  </Link>

  <Link to="/slim/docs/category/-information-sharing" style={{ width: '18rem', textDecoration: 'none' }}>
    <Card style={{ flex: '1 0 auto', cursor: 'pointer' }}>
      <Card.Body style={{ textAlign: 'center' }}>
        <img src="/slim/img/documentation.svg" alt="Information Sharing" style={{ maxHeight: '200px' }}></img>
        <Card.Title>Information Sharing</Card.Title>
        <Card.Text>
          Focuses on project information sharing best practices, including documentation, communication channels, and other topics. 
        </Card.Text>
      </Card.Body>
    </Card>
  </Link>
</div>

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px', justifyContent: 'center', width: '100%' }}>
  <Link to="/slim/docs/guides/checklist" style={{ textDecoration: 'none', width: '100%' }}>
    <Card style={{ flex: '1 0 auto', cursor: 'pointer', width: '100%' }}>
      <Card.Body style={{ textAlign: 'center' }}>
        <Card.Title>Getting Started</Card.Title>
        <Card.Text>
          Not sure where to begin? Start here with our checklist.
        </Card.Text>
      </Card.Body>
    </Card>
  </Link>  
</div>


<hr/><br/>

## Search

<FacetedPanels panelsData={ registryJSON } />

