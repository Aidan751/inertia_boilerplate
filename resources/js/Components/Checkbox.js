import React from 'react';

export default function Checkbox({ name, value }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="txt-orderit rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
        />
    );
}
