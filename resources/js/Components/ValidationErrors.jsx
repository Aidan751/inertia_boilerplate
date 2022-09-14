import { AlertOctagon } from 'lucide-react';
import React from 'react';

export default function ValidationErrors({ errors }) {
    return (
        Object.keys(errors).length > 0 && (
            <div className="mb-4">
                <div className="font-medium text-red-600">Whoops! Something went wrong.</div>

                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                    {Object.keys(errors).map(function (key, index) {
                        return (
                            <>
                                <div key={index} className="alert alert-danger-soft show flex items-center mb-2" role="alert"> 
                                    <AlertOctagon className="w-6 h-6 mr-2" />
                                    {errors[key]}
                                </div>
                            </>
                        );
                    })}
                </ul>
                

            </div>
        )
    );
}
