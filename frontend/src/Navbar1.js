import { Link } from 'react-router-dom'

function Navbar1() {
    return (<>
        <div className='navbar-wrapper' style={{ justifyContent: 'space-between', padding:'2vh' }}>
        <Link className='link' style={{ fontSize: '5vh', width: '10vw'}} to='/'><p id="landingpage-heading" style={{ fontSize: '4vh', width: '10vw'}}>ZCoder</p></Link>
            <div className='flex' style={{ justifyContent: 'space-between', gap:'2vw' }}><Link className='link' to='/LogIn'>LogIn</Link>
                <Link className='link' to='/SignUp'>SignUp</Link></div>
        </div>
    </>)
}

export default Navbar1