export default function MidoneTextArea(props){

    return (
        <>
            <div className="mt-3">
                
                <label htmlFor="crud-form-3" className="form-label">{props.label}</label>
                
                <div className="input-group">
                    <textarea rows={6}  type="text" className="form-control" name={props.name} value={props.value} onChange={props.change} placeholder={props.placeholder}>
                    </textarea>
                </div>
            </div>
        </>
    )
}