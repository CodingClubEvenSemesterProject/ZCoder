import Navbar2 from "./Navbar2";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Fetch = () => {
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [username, setUsername] = useState('');

    const handleChange = (event) => {
        setSelectedPlatform(event.target.value);
    };
    return (<>
        <div className='body-wrapper'>

            {/* <Navbar1 /> */}

            <div className='login-form-wrapper'>
                <p class="heading">Add Question</p>
                <form className="flex2" style={{ alignItems: 'flex-start', rowGap: '1vh' }}>
                    <p style={{ fontSize: '2.7vh' }}>Choose a platform:</p>
                    <div className="flex">
                        <input
                            type="radio"
                            name="platform"
                            value="codeforces"
                            checked={selectedPlatform === 'codeforces'}
                            onChange={handleChange}
                            style={{ height: '3vh', width: '2vw' }}
                        />
                        <label htmlFor="codeforces">Codeforces</label>
                    </div>
                    <div className="flex">
                        <input
                            type="radio"
                            name="platform"
                            value="codechef"
                            checked={selectedPlatform === 'codechef'}
                            onChange={handleChange}
                            style={{ height: '3vh', width: '2vw' }}
                        />
                        <label htmlFor="codechef">CodeChef</label>
                    </div>
                    <div className="flex">
                        <input
                            type="radio"
                            name="platform"
                            value="leetcode"
                            checked={selectedPlatform === 'leetcode'}
                            onChange={handleChange}
                            style={{ height: '3vh', width: '2vw' }}
                        />
                        <label htmlFor="leetcode">LeetCode</label>
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            onChange={(e) => setUsername(e.target.value)} required
                            style={{ height: '3vh', width: '20vw' }}
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass}  style={{ padding: '2vh', fontSize: '3vh' }}/>
                    </div>
                    <div className="search-results">
                    
                </div>
                <input className='login-submit' style={{width:'25vw'}} type='submit' value="Add Question" />
                </form>
            </div>
        </div>
    </>
    );
}
export default Fetch;