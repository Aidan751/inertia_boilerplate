import { ClassicEditor, TomSelect } from "@/base-components";
import Button from "@/components/Button";
import { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";


function Create(props) {
  const [categories, setCategories] = useState([1, 3]);
  const editorConfig = {
    toolbar: {
      items: ["bold", "italic", "link"],
    },
  };
  const [editorData, setEditorData] = useState("<p>Content of the editor.</p>");

  return (
    <>
        <Authenticated
            auth={props.auth}
            errors={props.errors}

        >

    <div className="col-span-12">
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Add new admin user</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          {/* BEGIN: Form Layout */}

         {/* TODO: ask michael about csrf */}
          <form className="intro-y box p-5" action={route('admin-user.store')} method="post">
            <div>
              <label htmlFor="crud-form-1" className="form-label">
                Name
              </label>
              <input
                id="crud-form-1"
                type="text"
                className="form-control w-full"
                placeholder="Full name..."
              />
            </div>
            <div className="mt-3">
              <label htmlFor="crud-form-2" className="form-label">
                Email address
              </label>
                <input
                    id="crud-form-2"
                    type="text"
                    className="form-control w-full"
                    placeholder="Email address..."
                />
            </div>
            <div className="mt-3">
                <label htmlFor="crud-form-3" className="form-label">
                    Password
                </label>
                <input
                    id="crud-form-3"
                    type="password"
                    className="form-control w-full"
                    placeholder="Password..."
                />

                <input
                    id="crud-form-4"
                    type="password"
                    className="form-control w-full mt-3"
                    placeholder="Repeat password..."
                />
              </div>
            <div className="mt-3 pt-3">
                <input type="checkbox" className="input border mr-2" id="input-1" />
                <span className="text-black-600 ml-2">Email password to new admin user?</span>
            </div>
            <div className="text-right mt-5">
              <Button type="submit" className="w-30">
                Add new Admin User
              </Button>
            </div>
          </form>
          {/* END: Form Layout */}
          </div>
        </div>
    </div>
    </Authenticated>
    </>
  );
}

export default Create;
