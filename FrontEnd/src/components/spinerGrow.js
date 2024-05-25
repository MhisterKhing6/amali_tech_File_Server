import { Spinner } from "react-bootstrap";

const SpinerGrow = ({text}) => {
    return (

        <div style={{minHeight: "80vh"}} className="w-100 d-flex justify-content-center align-items-center" >
            <Spinner className="d-block spinerGrow" animation="grow"  />
            <div>
                <h3>{text}</h3>
            </div>
        </div>
        
    )
}
export {SpinerGrow}