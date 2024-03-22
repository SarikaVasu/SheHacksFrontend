import { Link } from 'react-router-dom';
import useTitle from '../../hooks/useTitle'
import '../../css/voting/Voting.css'


const Voting = () => {
  useTitle('Voting Page')

  const date = new Date() 
  const today = new Intl.DateTimeFormat('en-US', {dateStyle: 'full', timeStyle: 'long' }).format(date)

  return (
    <div className='VotingContainer'>
      <nav className='navBar'>
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
        <li>

        </li>
        <button className='SignOutButton'>
          <Link title='SignOut' className='navLink'>Sign out</Link>
        </button>
      </nav>
      <div className='voteMain'>
        <article className='voteContent'>
          <p>{today}</p>
          <h1>Welcome</h1>
           
        </article>
      </div>
    </div>
  )
}

export default Voting;