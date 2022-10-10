import React from 'react';

export default function Label({ forInput, value, className, children }) {
    return (
        <label htmlFor={forInput} className={`block font-medium text-md text-gray-700` + className}>
            {value ? value.charAt(0).toUpperCase() + value.slice(1) : children}
        </label>
    );
}
