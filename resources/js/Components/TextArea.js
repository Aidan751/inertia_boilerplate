import React, { useEffect, useRef } from 'react';

export default function TextArea({
    type = 'text',
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    setData
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start mt-2">
            <textarea
                type={type}
                name={name}
                value={value}
                className={
                    `w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => setData(e.target.name, e.target.value)}
            />
        </div>
    );
}
