import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignupMutation } from '../auth/AuthApiSlice';
import useTitle from '../../hooks/useTitle';
import PulseLoader from 'react-spinners/PulseLoader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import '../../css/signup/SignUp.css';  //css

const USER_REGEX = /^[A-z0-9]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const SignUp = () => {
  useTitle('Signup');

  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();

  const [Signup, { 
      isLoading,
      isSuccess,
      isError
  }] = useSignupMutation();

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username])

  useEffect(() => {
      setValidPassword(PWD_REGEX.test(password));
  }, [password])

  useEffect(() => {
      setErrMsg('');
  }, [username, password])

  useEffect(() => {
    if (isSuccess) {
        setUsername('');
        setPassword('');
        navigate('/signin');
    }
  }, [isSuccess, navigate])

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    try {
      const { message } = await Signup({ username, password }).unwrap()
      alert(message)
    } catch (err) {
        if (!err.status) {
            setErrMsg('No Server Response');
        } else if (err.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.status === 401) {
            setErrMsg('Unauthorized');
        } else if (err.status === 409) {
            setErrMsg('Conflict, try another username');
      } else {
            setErrMsg(err?.data?.message);
        }
        errRef.current.focus();
    }
  }

  let canSave
  if (password) {
      canSave = [validUsername, validPassword].every(Boolean) && !isLoading
  } else {
      canSave = [validUsername].every(Boolean) && !isLoading
  }

  const errClass = (isError) ? "errmsg" : "offscreen"
  const validUserClass = !validUsername ? 'form__input--incomplete' : ''
  const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''

  if (isLoading) return <PulseLoader color={"#FFF"} />

  return (
    <div className='SignupContainer'>
      <header className="SignupHeader">
        Back to
        <Link to='/'>  
          <FontAwesomeIcon icon={faHouse} style={{color:'white', paddingLeft:'1rem'}}/>
        </Link>
      </header>
      <article className="SignupBg">
        <form action="POST" className='SignupForm' id='SignupForm'>
          <table className='signupTable'>
            <thead className='SignupHead'>
              <tr>
                <td colSpan={2}>Sign Up</td>
              </tr>
            </thead>
            <tbody className='SignupBody'>
              <tr>
                <td colSpan={2}>
                  <p ref={errRef} className={errClass} aria-live="assertive" style={{textAlign:"center", color:"red"}}>
                    {errMsg}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="username">Username</label>
                </td>
                <td>
                  <input 
                      type="text" 
                      
                      id='username'
                      ref={userRef}
                      value={username}className={`Username ${validUserClass}`}
                      onChange={handleUserInput}
                      autoComplete='off'
                      placeholder='Username'
                      required/>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="password">Password</label>
                </td>
                <td>
                  <input 
                      type="password" 
                      className={`Password ${validPwdClass}`}
                      id='password'
                      value={password}
                      onChange={handlePwdInput}
                      placeholder='Password'
                      required/>
                </td>
              </tr>
            </tbody>
          </table>
          <article>
            <Link>
              <button 
                  className='SignupButton'
                  type='submit'
                  onClick={onSaveUserClicked}
                  disabled={!canSave}>
                    Sign Up
              </button>
            </Link>
          </article>
          <article>
            <p>
            Already have an account?<Link to='/signin' style={{'textDecoration': 'underline'}}>Sign in</Link>
            </p>
          </article>
        </form>
      </article>
    </div>
  )
}

export default SignUp;