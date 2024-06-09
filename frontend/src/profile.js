import { faBookBookmark, faBookmark, faCheck, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import Navbar2 from "./Navbar2"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";


const profile = () => {
    return (  
        <><Navbar2 />
        <div className="d-wrapper">
            <div className="flex" style={{ gap:'5vw', justifyContent:'flex-start'}}>
                <img src="" style={{height: '30vh' , width: '30vh' , border: '2px solid black', borderRadius: '15vh'}}/>
                <div>
                    <h4>Username:</h4>
                    <h4>Preferred Tech Stack:</h4>
                    <h4>Preferred Programming Language:</h4>
                    <h4>Rating on platforms: 
                        <div> 
                            <h5>Leetcode-</h5>
                            <h5>Codeforces-</h5>
                            <h5>COdechef-</h5>
                        </div>
                    </h4>
                </div>
            </div>
            <div className="flex" style={{ gap:'2vw', justifyContent:'flex-start'}}>
            <div className="ques-wrapper" style={{ width:'45vw'}}>
                <div className="flex ques" style={{ justifyContent: 'space-between' }}>
                    <p className="ques-tag">23A</p>
                    <p>Lorem wef ret uyuui oirf pod fuvk guk lob booooorr sjo...</p>
                    <FontAwesomeIcon icon={faBookmark} style={{ color: '#90FF69', fontSize: '4vh' }} />
                </div>
            </div>
            <div className="ques-wrapper" style={{ width:'45vw'}}>
                <div className="flex ques" style={{ justifyContent: 'space-between' }}>
                    <p className="ques-tag">23A</p>
                    <p>Lorem wef ret uyuui oirf pod fuvk guk lob booooorr sjo...</p>
                    <FontAwesomeIcon icon={faCheck} style={{ color: 'black', fontSize: '4vh' }} />
                    <FontAwesomeIcon icon={faTrash} style={{ color: 'red', fontSize: '4vh' }} />
                </div>
            </div>
            </div>
        </div>
        </>
    );
}

export default profile;