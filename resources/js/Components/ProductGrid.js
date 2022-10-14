import {
    Lucide,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownContent,
    DropdownItem,
    Modal,
    ModalBody,
  } from "@/base-components";
  import { useState } from "react";

 export default function ProductGrid({ restaurant }) {
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

    return (
      <div className="col-span-12">
        <h2 className="intro-y text-lg font-medium mt-10">Product Grid</h2>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <button className="btn btn-primary shadow-md mr-2">
              Add New Product
            </button>
            <Dropdown>
              <DropdownToggle className="btn px-2 box">
                <span className="w-5 h-5 flex items-center justify-center">
                  <Lucide icon="Plus" className="w-4 h-4" />
                </span>
              </DropdownToggle>
              <DropdownMenu className="w-40">
                <DropdownContent>
                  <DropdownItem>
                    <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
                  </DropdownItem>
                  <DropdownItem>
                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                    Excel
                  </DropdownItem>
                  <DropdownItem>
                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                    PDF
                  </DropdownItem>
                </DropdownContent>
              </DropdownMenu>
            </Dropdown>
            <div className="hidden md:block mx-auto text-slate-500">
              Showing 1 to 10 of 150 entries
            </div>
            <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
              <div className="w-56 relative text-slate-500">
                <input
                  type="text"
                  className="form-control w-56 box pr-10"
                  placeholder="Search..."
                />
                <Lucide
                  icon="Search"
                  className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
                />
              </div>
            </div>
          </div>
          {/* BEGIN: Restaurant Layout */}
            <div
              className="intro-y col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            >
              <div className="box">
                <div className="p-5">
                  <div className="h-40 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                    <img
                      alt="Midone - HTML Admin Template"
                      className="rounded-md"
                      src="https://i.imgur.com/6t3kMnX.jpg"
                    />

                      <span className="absolute top-0 bg-pending/80 text-white text-xs m-5 px-2 py-1 rounded z-10">
                        Featured
                      </span>

                    <div className="absolute bottom-0 text-white px-5 pb-6 z-10">
                      <a href="" className="block font-medium text-base">
                       product name here
                      </a>
                      <span className="text-white/90 text-xs mt-3">
                        product category here
                      </span>
                    </div>
                  </div>
                  <div className="text-slate-600 dark:text-slate-500 mt-5">
                    <div className="flex items-center">
                      <Lucide icon="Link" className="w-4 h-4 mr-2" /> Price: $
                     totals
                    </div>
                    <div className="flex items-center mt-2">
                      <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Remaining
                      Stock:
                        stocks here
                    </div>
                    <div className="flex items-center mt-2">
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />{" "}
                      Status:
                      info here
                    </div>
                  </div>
                </div>
                <div className="flex justify-center lg:justify-end items-center p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                  <a className="flex items-center text-primary mr-auto" href="#">
                    <Lucide icon="Eye" className="w-4 h-4 mr-1" /> Preview
                  </a>
                  <a className="flex items-center mr-3" href="#">
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" /> Edit
                  </a>
                  <a
                    className="flex items-center text-danger"
                    href="#"
                    onClick={() => {
                      setDeleteConfirmationModal(true);
                    }}
                  >
                    <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                  </a>
                </div>
              </div>
            </div>
          {/* END: Restaurant Layout */}
    </div>
      </div>
    );
  }

