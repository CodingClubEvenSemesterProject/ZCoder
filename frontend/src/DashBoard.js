import { faBookBookmark, faBookmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import Navbar2 from "./Navbar2"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



function DashBoard() {
    return (<>
        <Navbar2 />
        <div className="d-wrapper">
            
            <div className="ques-wrapper">
                <div className="flex ques" style={{ justifyContent: 'space-between' }}>
                    <p className="ques-tag">23A</p>
                    <p>Lorem wef ret uyuui oirf pod fuvk guk lob booooorr sjo...</p>
                    <FontAwesomeIcon icon={faBookmark} style={{ color: '#90FF69', fontSize: '4vh' }} />
                </div>
            </div>
        </div>
    </>)
}

export default DashBoard