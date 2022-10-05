import { Image, X } from "lucide-react";

export default function MidoneUpload(props) {
    let accept;
    if(props.accept == null){
        accept = "";
    }else{
        accept = props.accept;
    }

    return (
        <>
            <div className="">
                {/* Label */}
                <label className="form-label mt-2">
                    {props.label}
                </label>
                {/* Image Upload */}
                <div className="border-2 border-dashed rounded-md pt-4">
                    {
                        props.preview &&
                            <>
                            {/* Preview */}
                            <div className="flex flex-wrap px-4">

                                <div className="w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in">
                                    {/* Image */}
                                    <img className="rounded-md" alt="Temp" src={props.preview} />
                                    {/* Delete Button */}
                                    <button type="button" onClick={props.reset} name={props.name} title="Remove this image?" className="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger text-red-900 right-0 top-0 -mr-2 -mt-2">
                                        <X className="w-4 h-4" id={props.name} />
                                    </button>
                                </div>
                            </div>
                            </>
                    }


                    <div className="px-4 pb-4 flex items-center cursor-pointer relative">
                        <Image data-lucide="image" className="w-4 h-4 mr-2" />
                        <span className="text-primary mr-1">Upload a file</span> or drag and drop 
                        <input type="file" accept={accept} name={props.name} onChange={props.change} className="w-full h-full top-0 left-0 absolute opacity-0" />
                    </div>
                </div>
            </div>

        </>
    )
}