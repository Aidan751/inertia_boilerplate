import React from 'react';

export default function Button({ type = 'submit', className = '', processing, children, click }) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-purple border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
            style={{backgroundColor: 'rgb(183, 38, 126)'}}
            onClick={click}
        >
            {children}
        </button>
    );
}
