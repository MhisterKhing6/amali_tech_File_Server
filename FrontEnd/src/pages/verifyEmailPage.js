import { VerifyEmail } from "../components/verifyEmail"
import { useLocation } from "react-router-dom"

const VerifyEmailPage = () => {
    const location = useLocation()
    return (<VerifyEmail redirectUrl={location.state.redirectUrl} vUrl={location.state.vUrl} email={location.state.email} urlMe={location.state.url} verificationId={location.state.verificationId}/>)
}

export {VerifyEmailPage}