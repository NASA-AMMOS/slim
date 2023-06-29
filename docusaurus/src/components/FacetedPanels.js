import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Dropdown, Badge, ListGroup, ListGroupItem, Navbar, Nav, Glyphicon } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Panel = ({ title, tags, lastUpdated, description }) => (
    <Card>
        <Card.Header as="h5">{title}</Card.Header>
        <Card.Body>
            <Card.Text>
                <p>{description}</p>
            </Card.Text>
            <ListGroup>
                <ListGroupItem>Last Updated: <Badge bg="secondary">{lastUpdated}</Badge></ListGroupItem>
                <ListGroupItem>Tags:
                    {tags.map((tag) => (
                        <Badge bg="secondary" className="ms-1">{prettifyTag(tag)}</Badge>
                    ))}
                </ListGroupItem>
            </ListGroup>
        </Card.Body>
    </Card>
);

const FacetedPanels = ({ panelsData }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTags, setSelectedTags] = useState({});
    const [selectedSortOrder, setSelectedSortOrder] = useState('ascending');
    const [panels, setPanels] = useState([]);
    const [tags, setTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);

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

    const handleSortOrderChange = (eventKey) => {
        setSelectedSortOrder(eventKey);
    };

    const handleTagSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = tags.filter((tag) => tag.toLowerCase().includes(searchTerm));
        setFilteredTags(filtered);
    };

    const compareDates = (dateA, dateB) => {
        return selectedSortOrder === 'ascending' ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
    };

    const filteredPanels = panels.filter((panel) => {
        const isTagMatch = Object.entries(selectedTags).every(([tag, isSelected]) => !isSelected || panel.tags.includes(tag));
        return isTagMatch;
    }).sort((panelA, panelB) => compareDates(panelA['last-updated'], panelB['last-updated']));

    return (
        <Container>

            <div className="d-flex justify-content-center">
                <Navbar bg="light" expand="lg" className="mb-4 p-4">
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="mr-auto ps-2">
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="tag-dropdown">
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
                        <Nav className="mr-auto ps-2">
                            <Dropdown onSelect={handleSortOrderChange}>
                                <Dropdown.Toggle variant="primary" id="sort-order-dropdown">
                                    {selectedSortOrder === 'ascending' ? 'Show Newest First' : 'Show Oldest First'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="ascending">Show Newest First</Dropdown.Item>
                                    <Dropdown.Item eventKey="descending">Show Oldest First</Dropdown.Item>
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
                            tags={panel.tags}
                            lastUpdated={panel['last-updated']}
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
