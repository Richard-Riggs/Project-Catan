import React from 'react';

export default function ResourceItem({name, count}) {
    return (
        <div>
            <label>{name}: </label>
            <span>{count || 0}</span>
        </div>
    )
}
