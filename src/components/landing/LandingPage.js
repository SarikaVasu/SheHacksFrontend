import '../../css/LandingPage.css'
import { Link } from 'react-router-dom';


const LandingPage = () => {
    const content = (<div className='landingPage'>
        <nav className="lpNavbar" style={{height:'4.5rem'}}>
            <article>
                <ul className="navItems">
                    <li className=''>
                        <button className='signupButton'>
                            <Link to="/signup" className='navLink'>Sign Up</Link>
                        </button>
                    </li>
                    <li>
                        <button className='signinButton'>
                            <Link to='/signin' className='navLink'>Sign In</Link>
                        </button> 
                    </li>
                </ul>
            </article>
        </nav>
        <article className='lpMain'>
            <article className='lpContent'>
                <h1 className='appName'>Electoral Voting App</h1>
                <p className='content'>Vote from Home</p>
            </article>
        </article>
    </div>
    )
    return content;
}

export default LandingPage;