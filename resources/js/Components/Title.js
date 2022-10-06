import React from 'react'

export default function Title({ title, subtitle }) {
    return (
        <>
        <div className="intro-y flex items-center mt-8">
            <h2 className="text-lg font-medium mr-auto">{ title }</h2>
          </div>
          <div className="intro-y flex items-center mt-6">
            <p className="text-gray-600">
                { subtitle }
            </p>
          </div>
        </>

    )
}
