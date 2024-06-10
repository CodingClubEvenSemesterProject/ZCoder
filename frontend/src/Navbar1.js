import {Link} from 'react-router-dom'

function Navbar1(){
    return(<>
    <div className='navbar-wrapper' style={{justifyContent:'space-around'}}>
        <Link className='link' to='/LogIn'>LogIn</Link>
        <Link className='link' to='/SignUp'>SignUp</Link>
        <Link className='link' to='/CodeEditor'>CodeEditor</Link>
    </div>
    </>)
}

export default Navbar1