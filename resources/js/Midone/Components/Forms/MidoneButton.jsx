export default function MidoneButton(props){

    return (
        <>
            <div className="text-right mt-5">
                <button type={props.type} className="btn btn-primary w-24" processing={props.processing}>{props.title}</button>
            </div>
        </>
    )
}