import React, { useEffect, useRef } from 'react';

export default function Input({
    type = 'text',
    name,
    value,
    className,
    autoComplete,
    placeholder,
    required,
    isFocused,
    setData,
    error
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start mt-2">
            <input
                type={type}
                name={name}
                value={value}
                className={
                    `w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                placeholder={placeholder}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => setData(e.target.name, e.target.value)}
            />
            {error && <div className="text-theme-6 mt-2">{error}</div>}
        </div>
    );
}
