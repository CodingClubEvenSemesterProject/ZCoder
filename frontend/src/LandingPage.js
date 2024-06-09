import Navbar1 from "./Navbar1";

function LandingPage() {
    return(<>
    <div className="body-wrapper">
        <Navbar1/>
        <div className='landingpage-img-wrapper'>
            <p id="landingpage-heading">ZCoder</p>
            <p id="landingpage-sub-heading">Welcome to your OneStop Solution for Coding Practice</p>
            <img id="landingpage-img"  style={{padding: '10%'}} src="https://media.licdn.com/dms/image/sync/C4D27AQEgTzpguxPjpg/articleshare-shrink_800/0/1710945858603?e=2147483647&v=beta&t=DyJ8YxAcNj5YyoZBOT4MClbJB47zgvrRNAxBn6X8KU8"></img>
        </div>
    </div>
    </>)
}

export default LandingPage;
