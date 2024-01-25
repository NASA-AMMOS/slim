import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Dropdown, Badge, Button, ListGroup, ListGroupItem, Navbar, Nav, Glyphicon } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Panel = ({ title, uri, tags, description }) => (
    <Card>
        <Card.Header as="h5">{title}</Card.Header>
        <Card.Body>
            <Card.Text>
                <p>{description}</p>
            </Card.Text>
            <ListGroup>
                <ListGroupItem>Tags:
                    {tags.map((tag) => (
                        <Badge bg="secondary" className="ms-1">{prettifyTag(tag)}</Badge>
                    ))}
                </ListGroupItem>
            </ListGroup>
                <a href={uri} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" className="mt-3" size="md">
                        View
                    </Button> 
                </a>
        </Card.Body>
    </Card>
);

const FacetedPanels = ({ panelsData }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTags, setSelectedTags] = useState({});
    const [panels, setPanels] = useState([]);
    const [tags, setTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Step 1: Add a new state for the search term

    useEffect(() => {
        setPanels(panelsData);

        const uniqueTags = [...new Set(panelsData.flatMap((panel) => panel.tags))];
        setTags(uniqueTags);
        setFilteredTags(uniqueTags);
    }, []);

    const handleCategoryChange = (eventKey) => {
        setSelectedCategory(eventKey);
    };

    const handleTagChange = (tag) => {
        setSelectedTags((prevSelectedTags) => {
            const updatedTags = { ...prevSelectedTags };
            updatedTags[tag] = !updatedTags[tag]; // Toggle the selected state
            return updatedTags;
        });
    };

    const handleTagSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = tags.filter((tag) => tag.toLowerCase().includes(searchTerm));
        setFilteredTags(filtered);
    };

    const handlePanelSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPanels = panels.filter((panel) => {
        const isTagMatch = Object.entries(selectedTags).every(([tag, isSelected]) => !isSelected || panel.tags.includes(tag));
        return isTagMatch && (panel.title.toLowerCase().includes(searchTerm.toLowerCase()) || panel.description.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    return (
        <Container>
            <div className="d-flex justify-content-center">
                <Navbar bg="light" expand="lg" className="mb-4 p-4">
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="mr-auto ps-2">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handlePanelSearch}
                            />
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="tag-dropdown" className="ms-2">
                                    {Object.values(selectedTags).some((isSelected) => isSelected)
                                        ? `${Object.keys(selectedTags).filter((tag) => selectedTags[tag]).length} tags selected`
                                        : 'Select Tags'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="p-3" style={{ minWidth: '250px', maxHeight: '400px', overflowY: 'auto' }}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search Tags"
                                        className="mb-2"
                                        onChange={handleTagSearch}
                                    />
                                    {filteredTags
                                        .sort((tagA, tagB) => tagA.localeCompare(tagB)) // tags should appear in alphabetical order
                                        .map((tag, index) => (
                                            <Form.Check
                                                key={index}
                                                type="checkbox"
                                                label={prettifyTag(tag)}
                                                id={`tag-checkbox-${index}`}
                                                checked={selectedTags[tag] || false}
                                                onChange={() => handleTagChange(tag)}
                                            />
                                        ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <Row>
                {filteredPanels.map((panel, index) => (
                    <Col key={index} sm={12} className="mb-4">
                        <Panel
                            title={panel.title}
                            uri={panel.uri}
                            tags={panel.tags}
                            description={panel.description}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

function prettifyTag(tag) {
    // Tokenize the string using the dash delimiter
    const tokens = tag.split('-');

    // Capitalize each token word
    const capitalizedTokens = tokens.map(token => token.charAt(0).toUpperCase() + token.slice(1));

    // Combine the capitalized tokens into a new aggregated string
    const transformedTag = capitalizedTokens.join(' ');

    return transformedTag;
}

export default FacetedPanels;
