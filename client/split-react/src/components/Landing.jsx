import axios from "axios";
import { useNavigate } from "react-router";

function Landing(){
    const navigate = useNavigate();
    return(
        <div className="container-landing">
            <h1 className="heading">PayPanku</h1>
            <h3>Start by creating group</h3>
            <button className="button-landing" onClick={() => navigate("/groups")}>Click here to start using</button>
        </div>
    )
}
export default Landing;