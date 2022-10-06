import React from 'react'
import Button from '@/Components/Button'

export default function OrderItSearch({handleSearch, data, setData}) {
    return (
            <div className="w-56 text-slate-500 absolute right-0 top-0">
                <form className="flex justify-end w-full sm:w-auto sm:mt-0 sm:ml-auto md:ml-0" onSubmit={handleSearch}>
                     <input
                     type="text"
                     className="search__input text-sm text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                     placeholder="Search..."
                     value={data.search}
                     onChange={e => setData('search', e.target.value)}
                     />
                     <Button type="submit" className="ml-3">
                         Search
                     </Button>
                </form>
            </div>
        )
}
