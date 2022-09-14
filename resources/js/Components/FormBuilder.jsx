import { useEffect, useRef, useState } from "react"; //For react component
import 'jquery-ui-sortable';
window.jQuery = $;
window.$ = $;
import 'formBuilder'
import { useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
 


const formData = [];


export default function CustomFormBuilder() {

    // 
    const fb = useRef();
    
    // Use the useForm hook to create a form state object 
    const [data, setData] = useState("");
    
    // Options for the form builder
    const options = {
        // Method to call when the form is submitted
        onSave: function(event,formData) {
            const currentFormData = formData;
            console.log(currentFormData);
            Inertia.post(route("site-admin.dynamic-forms.store"),{
                form:currentFormData
            });
            // TODO POST TWICE , We using a workaround to get the form data
          },
    }

    // Use the useEffect hook to load the form builder
    useEffect(() => {
        $(fb.current).formBuilder({
            ...options,
        });
    }, []);

    
    return (
        <>
            <div className="bg-zinc-300 p-10" id="fb-editor" ref={fb} />
        </>
    );
  }
  
