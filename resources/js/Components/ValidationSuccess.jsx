import { AlertTriangle } from "lucide-react";

export default function ValidationSuccess(props){

    return (
        <>
            <div class="alert alert-success-soft show flex items-center mb-2" role="alert">
                <AlertTriangle data-lucide="alert-triangle" class="w-6 h-6 mr-2" />
                {props.message}
            </div>
        </>
    )
}