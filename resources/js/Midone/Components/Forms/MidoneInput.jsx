export default function MidoneInput(props){

    return (
        <>
            <div className="mb-3">
                <label htmlFor="crud-form-1" className="form-label">{props.label}</label>
                <input type={props.type} className="form-control w-full" placeholder={props.placeholder} name={props.name} onChange={props.changeFunc} value={props.value}/>
            </div>
        </>
    )
}