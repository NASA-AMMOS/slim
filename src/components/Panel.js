import React from 'react';

export default function Panel ({ title, category }) {

    return (
        <div className="panel">
            <h3>{title}</h3>
            <p>Category: {category}</p>
        </div>
    );
    }