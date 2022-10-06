
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import ValidationSuccess from "@/Components/ValidationSuccess";
import Button from "@/Components/Button";


export default function Index(props){
    console.log(props);
    const { data, setData, get, processing, errors } = useForm({
        perPage: props.perPage,
        search: props.search,
        filter: props.filter,
    })


    const from = props.items.from;

    const to = props.items.to;

    const total = props.items.total;

    const first_page_url = props.items.first_page_url;

    const last_page_url = props.items.last_page_url;

    const links = props.items.links;


    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);


    /**
     * Handle search form submission
     * @param {Event} e
    */
    function handleSearch(e) {
        e.preventDefault();
        Inertia.get(route('restaurant.menu.items.index'), data);
    }

    const filterBySearch = (event) => {
        event.preventDefault();
        Inertia.get(route('restaurant.menu.items.index'), {
            filter: event.target.value,
            search: data.search,
        });
      };

    const setDeleteConfirmationModal = (e) => {
          // Prevent Default Behaviour
          e.preventDefault();
          // Set the current selected role to the role id
          setDeleteId(e.target.id);
          // Show the delete confirmation modal
          setDeleteModal(true);
    }

    const deleteRecord = (e) => {
        Inertia.delete(route('restaurant.menu.items.destroy',{id:deleteId}),{
            preserveState: false,
            onSuccess: () => {
            }
        });
    }

    const paginate = (e) => {
        e.preventDefault();
        Inertia.get(route('restaurant.menu.items.index'), {
            perPage: e.target.value,
            filter: props.filter,
            search: props.search
        });
    }

      // Show the state of the search dropdown menu
      const [searchDropdown, setSearchDropdown] = useState(false);
      const showSearchDropdown = () => {
          setSearchDropdown(true);
      };
      const hideSearchDropdown = () => {
          setSearchDropdown(false);
      };


    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                activeGroup={10}
                activeItem={4}
            >

                {/* Define Page Title */}
                <Head title="Manage Products" />


                {/* Page Content */}
                <main className="col-span-12">

                    {/* Page Header */}
                    <h2 className="intro-y text-lg font-medium mt-10">Manage Products</h2>

                    {/* Show Success Validation Component */}
                    {
                        props.success &&
                        <ValidationSuccess message={props.success} />
                    }

                    {/*  */}
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">

                            {/* Pagination Information */}
                            <div className="hidden md:block mx-auto text-slate-500">
                                Showing {from} to {to} of {total} entries
                            </div>

                            {/* start: Search Form */}
                            <form className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0" onSubmit={handleSearch}>
                                <div className="w-56 relative text-slate-500">
                                    <div style={{width: '30vw', height: '2.5rem'}} className="flex justify-start">
                                        <input
                                        type="text"
                                        className="search__input text-sm text-gray-700 bitem rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        placeholder="Search..."
                                        value={data.search}
                                        onChange={e => setData('search', e.target.value)}
                                        style={{width: '30vw', height: '2.5rem'}}
                                        />
                                    <Button type="submit" className="search__button ml-3 flex items-center justify-center text-gray-700">
                                        Search
                                    </Button>
                                    </div>
                                </div>
                            </form>
                            {/* end: Search Form */}
                        </div>
                            {/* Start: filter by menu category */}
                            <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                                <div className="w-56 relative text-slate-500">
                                    <h4 className="intro-y text-sm font-medium mb-5">Filter by menu category</h4>
                                    <div style={{width: '30vw', height: '2.5rem'}}>
                                        <select
                                            className="search__input text-sm text-gray-700 shadow appearance-none focus:outline-none focus:shadow-outline"
                                            value={data.filter}
                                            onChange={filterBySearch}
                                            style={{width: '30vw', height: '2.5rem'}}
                                        >
                                            <option value="">Filter</option>
                                            {
                                                props.menuCategories.map((category) => (
                                                    <option value={category.id}>{category.title}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        {/* BEGIN: Data List */}
                        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report -mt-2">
                            <thead>
                            <tr>
                                <th className="text-left whitespace-nowrap">Product</th>
                                <th className="text-left whitespace-nowrap">Category</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            { props.items.data.map((item, key) => (

                                <tr key={key} className="intro-x">

                                    {/* Menu Item Title */}
                                    <td className="text-left">
                                            {item.title}
                                    </td>

                                    {/* Menu Item Category */}
                                    <td className="text-left">
                                        {item.category.title}
                                    </td>

                                     {/* Actions */}
                                     <td className="table-report__action w-56">
                                        <div className="flex justify-center items-center">
                                            {/* Edit Link */}
                                            <Link className="flex items-center mr-3" href={route("restaurant.menu.items.edit",{id:item.id})}>
                                                <CheckSquare className="w-4 h-4 mr-1" />{" "}
                                                Edit
                                            </Link>

                                            {/* Delete Link */}
                                            <button
                                                className="flex items-center text-danger"
                                                type="button"
                                                onClick={setDeleteConfirmationModal}
                                                id={item.id}
                                            >
                                                <Trash2 id={item.id} className="w-4 h-4 mr-1" /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                        {/* END: Data List */}
                        {/* BEGIN: Pagination */}
                        <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                        <nav className="w-full sm:w-auto sm:mr-auto">
                            <ul className="pagination">
                                <li className="page-item">
                                    <Link className="page-link" href={first_page_url}>
                                        <ChevronsLeft className="w-4 h-4" />
                                    </Link>
                                </li>
                                {
                                links &&
                                links.map(link => {
                                        return (
                                            <>
                                                {
                                                    link.label == "&laquo; Previous" &&
                                                        <li key={link.label} className="page-item">
                                                            <Link className="page-link" href={link.url}>
                                                                <ChevronLeft className="w-4 h-4" />
                                                            </Link>
                                                        </li>
                                                }
                                                {
                                                    link.label == "Next &raquo;" &&
                                                        <li key={link.label} className="page-item">
                                                            <Link className="page-link" href={link.url}>
                                                                <ChevronRight className="w-4 h-4" />
                                                            </Link>
                                                        </li>
                                                }
                                                {
                                                    link.label != "&laquo; Previous" && link.label != "Next &raquo;" &&
                                                        <li key={link.label} className={ link.active == true ? "page-item active" : "page-item"
                                                    }>
                                                            <Link
                                                                className="page-link"
                                                                href={link.url}>
                                                                {link.label}
                                                            </Link>
                                                        </li>
                                                }
                                            </>
                                        )
                                            })
                                        }




                                <li className="page-item">
                                    <Link className="page-link" href={last_page_url}>
                                        <ChevronsRight className="w-4 h-4" />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <select className="w-20 form-select box mt-3 sm:mt-0" onChange={paginate} value={data.perPage}>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={35}>35</option>
                            <option value={50}>50</option>
                        </select>
                        </div>
                        {/* END: Pagination */}
                    </div>
                    {/* BEGIN: Delete Confirmation Modal */}
                    <Modal
                        show={deleteModal}
                        onHidden={() => {
                            setDeleteConfirmationModal(false);
                        }}
                        title="Delete Confirmation"
                        >
                        <ModalBody className="p-0">
                        <div className="p-5 text-center">
                            <XCircle
                            className="w-16 h-16 text-danger mx-auto mt-3"
                            />
                            <div className="text-3xl mt-5">Are you sure?</div>
                            <div className="text-slate-500 mt-2">
                            Do you really want to delete these records? <br />
                            This process cannot be undone.
                            </div>
                        </div>
                        <div className="px-5 pb-8 text-center">
                        <button
                            type="button"
                            data-dismiss="modal"
                            onClick={e => setDeleteModal(false)}
                            className="btn btn-outline-secondary w-24 mr-3">
                            Cancel
                            </button>
                            <button type="button" onClick={deleteRecord} className="btn btn-danger w-24">Delete</button>
                        </div>
                        </ModalBody>
                    </Modal>
                    {/* END: Delete Confirmation Modal */}

                </main>

            </Authenticated>
        </>
    )
}
