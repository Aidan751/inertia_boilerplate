import { XCircle } from "lucide-react";

export default function DeleteModal(props){

    return (
        <>
                

                {/* BEGIN: Modal Content */}
                <div id="delete-modal-preview" className="modal overflow-y-auto show z-50" tabIndex={-1} >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body p-0">
                                <div className="p-5 text-center">
                                    
                                    <XCircle className="w-16 h-16 text-danger mx-auto mt-3" /> 
                                    
                                    <div className="text-3xl mt-5">
                                        Are you sure?
                                    </div>
                                    
                                    <div className="text-slate-500 mt-2">
                                        Do you really want to delete these records? <br />This process cannot be undone.
                                    </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="px-5 pb-8 text-center">
                                    
                                    <button type="button" data-tw-dismiss="modal" className="btn btn-outline-secondary w-24 mr-1">
                                        Cancel
                                    </button>
                                    
                                    <button type="button" className="btn btn-danger w-24">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> {/* END: Modal Content */}

        </>
    )
}