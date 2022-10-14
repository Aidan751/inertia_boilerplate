
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from '@inertiajs/inertia-react';
import { Search,CheckSquare, ChevronRight ,ChevronsRight, ChevronsLeft, XCircle,Trash2,ChevronLeft, Eye} from "lucide-react";
import { useForm } from '@inertiajs/inertia-react'
import { useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Inertia } from "@inertiajs/inertia";
import { TomSelect, ClassicEditor, Lucide, Tippy, Alert } from "@/base-components";
import ValidationSuccess from "@/Components/ValidationSuccess";
import Button from "@/Components/Button";
import ProductGrid from "@/Components/ProductGrid";


export default function Details(props){
    console.log(props);
    const { data, setData, get, processing, errors } = useForm({

    })


    /**
     * Handle search form submission
     * @param {Event} e
    */
    function handleSearch(e) {
        e.preventDefault();
        Inertia.get(route('restaurant.orders.index', {id:props.user.id}), data);
    }

    const paginate = (e) => {
        e.preventDefault();
        Inertia.get(route('restaurant.orders.index', {id: props.user.id}), {
            perPage: e.target.value,
            search: props.search
        });
    }

    // handle status filter
    const handleStatusFilter = (e) => {
        e.preventDefault();
        Inertia.get(route('restaurant.orders.index', {id:props.user.id}), {
            status: e.target.value,
            from: data.from,
            to: data.to,
        });
    }


         // handle from change
          const handleFromChange = (e) => {
            e.preventDefault();
            Inertia.get(route('restaurant.orders.index', {id:props.user.id}), {
                    from: e.target.value,
                    to: data.to
                });
          }

          // handle to change
          const handleToChange = (e) => {
            e.preventDefault();
            Inertia.get(route('restaurant.orders.index', {id:props.user.id}), {
                    from: data.from,
                    to: e.target.value
                });
          }

        /**
           * Handle search form submission
           * @param {Event} e
           * @returns
           * @memberof Index
           *  */
          const submitDateFilterForm = (e) => {
              e.preventDefault();
              get(route('restaurant.orders.index', {id: props.auth.user.id}), {
                  preserveState: false,
              });
          }

    return (
        <>
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                activeGroup={16}
            >

                {/* Define Page Title */}
                <Head title="Order Details" />


                {/* Page Content */}
             <ProductGrid
                restaurant={props.restaurant}
            />

            </Authenticated>
        </>
    )
}
