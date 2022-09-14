import DropdownEditMenu from '@/Components/DropdownEditMenu';
import { Link } from '@inertiajs/inertia-react';
import React, {  useState } from 'react';



function FeedEvents({userImage,userName,organization,event}) {

  return (
    <>

      {/* Post 2 */}
      <div key={event.id} className="bg-white shadow-md rounded border border-slate-200 p-5">
        {/* Header */}
        <header className="flex justify-between items-start space-x-3 mb-3">
          {/* User */}
          <div className="flex items-start space-x-3">
            <img className="rounded-full shrink-0" src={userImage ?? ""} width="40" height="40" />
            <div>
              <div className="leading-tight">
                <a className="text-sm font-semibold text-slate-800" href="#0">
                  {userName}
                </a>
              </div>
              <div className="inline-flex items-center">
                <div className="text-xs text-slate-500">{organization ?? ""}</div>
              </div>
            </div>
          </div>
          {/* Menu button */}
          <DropdownEditMenu align="right" className="relative inline-flex shrink-0">
            <li>
              <Link
                href={"/admin/"+event.group+"/"+event.page+"/delete/"+event.id}
                className="font-medium w-full text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3">
                Edit
              </Link>
            </li>
            
            <li>
              <Link as='button' method='DELETE' action={"/admin/"+event.group+"/"+event.page+"/delete/"+event.id} 
                href={"/admin/"+event.group+"/"+event.page+"/delete/"+event.id}
              className="font-medium w-full text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" >
                Delete
              </Link>
            </li>
          </DropdownEditMenu>
        </header>
        {/* Body */}
        <div className="text-sm text-slate-800 space-y-2 mb-5">
            <span className='font-sans font-semibold text-base'>{event.title} - {event.title_01}</span>
            <span className='font-sans font-semibold text-base'>{event.location ?? ""}</span>
            
            <div className="relative">
                <p className="mb-0">
                    <b>Event Description:</b>
                    <br />{event.description}
                </p>
            </div>
        </div>
        
      </div>
    </>
  );
}

export default FeedEvents;
