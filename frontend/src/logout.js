import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {Link} from 'react-router-dom'




const logout = () => {
    return (  
        <div className="flex2" style={{height:'100vh'}}>
            <FontAwesomeIcon icon={faCircleCheck} style={{fontSize:'10vh'}}></FontAwesomeIcon>
            <h1>Logged out!</h1>
            <button id="logout-btn"><Link className="link" style={{fontSize:'medium', color:'black'}} to='/'>Return to Home</Link></button>
        </div>
    );
}

export default logout;