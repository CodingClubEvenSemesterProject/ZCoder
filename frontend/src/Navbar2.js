import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket, faCalendar, faCirclePlus, faCircleUser, faHome, faMessage } from '@fortawesome/free-solid-svg-icons'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons/faCirclePlay'
import { faBookBookmark, faBookmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"




function Navbar2() {
    return (<>
        <div className='navbar-wrapper'>
            
            <div className='flex' style={{ gap: '0.1vw', justifyContent: 'flex-start' }}>
                <Link className='link' style={{ fontSize: '5vh', width: '10vw'}} to='/'><p id="landingpage-heading" style={{ fontSize: '5vh', width: '10vw'}}>ZCoder</p></Link>
                
                <Link className='link' to='/LogIn/:id/Calender'><FontAwesomeIcon icon={faCalendar} style={{ color: 'black', fontSize: '3vh' }} /></Link>
                <Link className='link' to='/LogIn/:id/ChatRoom'><FontAwesomeIcon icon={faMessage} style={{ color: 'black', fontSize: '3vh' }} /></Link>
                <Link className='link' to='/LogIn/:id/fetch'><FontAwesomeIcon icon={faCirclePlus} style={{ color: 'black', fontSize: '3vh' }} /></Link>
            </div>
            <div className="flex" style={{ fontSize: '3vh' ,backgroundColor:'#b7b6b6' ,width: '52vw', height:'5vh', borderRadius:'2vh'}}>
                <input style={{ height: '3vh' , width: '50vw'}}></input>
                <FontAwesomeIcon icon={faMagnifyingGlass}  style={{ padding: '2vh', fontSize: '3vh' }}/>
            </div>
            <div className='flex' style={{ gap: '0.1vw', justifyContent: 'flex-start' }}>
                <Link className='link' to='/LogIn/:id/logout'><FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: 'black', fontSize: '3vh' }} /></Link>
                <Link className='link' to='/LogIn/:id/profile'><FontAwesomeIcon icon={faCircleUser} style={{ color: 'black', fontSize: '3vh' }} /></Link>
            </div>
        </div>
    </>)
}

export default Navbar2