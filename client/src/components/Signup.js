import { useState} from 'react';
import { Link } from 'react';
import { useMutation } from 'react';
import { ADD_USER } from '../graphql/mutations'
import Auth from '../services/auth'
import axios from '../services/api'

const Signup = () => {
    const [formState, setFormState] = useState({
      username: '',
      email: '',
      password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
  
      try {
        const { data } = await addUser({
          variables: { ...formState },
        });
  
        Auth.login(data.addUser.token);
      } catch (e) {
        console.error(e);
      }
    };
  
    return (
      <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10">
          <div className="card">
            <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
            <div className="card-body">
              {data ? (
                <p>
                  Success! You may now head{' '}
                  <Link to="/">back to the homepage.</Link>
                </p>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <input
                    className="form-input"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <button
                    className="btn btn-block btn-primary"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              )}
  
              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  };

// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}/;
// const SIGNUP_URL = '/signup';

// const Signup = () => {
//     const userRef = useRef();
//     const errRef = useRef();

//     const [user, setUser] = useState('');
//     const [validName, setValidName] = useState('false');
//     const [userFocus, setUserFocus] = useState('false');

//     const [pwd, setPwd] = useState('');
//     const [validPwd, setValidPwd] = useState('false');
//     const [pwdFocus, setPwdFocus] = useState('false');

//     const [matchPwd, setMatchPwd] = useState('');
//     const [validMatch, setValidMatch] = useState('false');
//     const [matchFocus, setMatchFocus] = useState('false');

//     const [errMsg, setErrMsg] = useState('');
//     const [sucess, setSuccess] = useState('false');
    
//     useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     useEffect(() => {
//         const result = USER_REGEX.test(user);
//         console.log(result);
//         console.log(user);
//         setValidName(result);
    
//     }, [user])

//     useEffect(() => {
//         const result = PWD_REGEX.test(pwd);
//         console.log(result);
//         console.log(pwd);
//         setValidPwd(result);
//         const match = pwd === matchPwd;
//         setValidMatch(match);
    
//     }, [pwd, matchPwd])


//     useEffect(() => {
//        setErrMsg('');
//     }, [user, pwd, matchPwd])

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         //if button enabled with JS hack
//         const v1 = USER_REGEX.test(user);
//         const v2 = PWD_REGEX.test(pwd);
//         if (!v1 || !v2) {
//             setErrMsg("Invalid entry");
//             return;
//         }
//         try {
//             const response = await axios.post(SIGNUP_URL, JSON.stringify({user, pwd}),
//             {
//                 headers: {'Content-Type': 'application/json'},
//                 withCredentials: true
//             }
//             );
//         console.log(response.data);
//         console.log(response.accessToken);
//         console.log(JSON.stringify(response));
//         setSuccess(true);
//         //clear input fields
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('No server response');
//             } else if ( err.response?.status === 409) {
//                 setErrMsg('Username taken');
//             } else {
//                 setErrMsg('Registration failed')
//             }
//             errRef.current.focus();
//         }
        
//     }

//     return (
//         <>
//             {sucess ? (
//                 <section>
//                     <h1>Sucess!</h1>
//                     <p>
//                         <a href="#">Sign Up</a>
//                     </p>
//                 </section>
//             ) : (
//             <section>
//                 <p ref= {errRef} classname={errMsg ? "errmsg" :
//                 "offscreen"} aria-live="assertive">{errMsg}</p>
//                 <h1>Signup</h1>
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="username">
//                         Username:
//                         <span classname={validName ? "valid" : "hide"}></span>
//                         <span classname={validName || !user ? "hide" : "invalid"}></span>
//                     </label>
//                     <input
//                         type="text"
//                         id="username"
//                         ref={userRef}
//                         autoComplete="off"
//                         onChange={(e) => setUser(e.target.value)}
//                         required
//                         aria-invalid={validName ? "false" : "true"}
//                         aria-describeby="uidnote"
//                         onFocus={() => setUserFocus(true)}
//                         onBlur={() => setUserFocus(false)}
//                         />
//                         <p id="uidnote" classname={userFocus && user &&! validName ? "instructions" : "offscreen"}>
//                            4 to 24 charcters.<br />
//                            Must Begin with A letter <br />
//                            Letters, numbers, underscores, hyphens allowed

//                         </p>

//                     <label htmlFor="password">
//                         Password:
//                         <span classname={validPwd ? "valid" : "hide"}></span>
//                         <span classname={validPwd || !pwd ? "hide" : "invalid"}></span>
//                     </label>
//                     <input
//                         type="password"
//                         id="password"
//                         onChange={(e) => setPwd(e.target.value)}
//                         required
//                         aria-invalid={validPwd ? "false" : "true"}
//                         aria-describeby="pwdnote"
//                         onFocus={() => setPwdFocus(true)}
//                         onBlur={() => setPwdFocus(false)}
//                         />
//                         <p id="pwdnote" classname={pwdFocus &&! validPwd ? "instructions" : "offscreen"}>
//                            8 to 24 charcters.<br />
//                            Must include uppercase and lowercase letters, a number and a special charcter <br />
//                            Allowed special charcters: <span aria-label="exclanation mark">!</span><span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span><span aria-label="dollar sign">$</span><span aria-label="percent">%</span>

//                         </p>
                        
//                     <label htmlFor="confirm_pwd">
//                         Confirm Password:
//                         <span classname={validMatch && matchPwd ? "valid" : "hide"}></span>
//                         <span classname={validMatch || !matchPwd ? "hide" : "invalid"}></span>
//                     </label>
//                     <input
//                         type="password"
//                         id="confirm_pwd"
//                         onChange={(e) => setMatchPwd(e.target.value)}
//                         required
//                         aria-invalid={validMatch ? "false" : "true"}
//                         aria-describeby="confirmnote"
//                         onFocus={() => setMatchFocus(true)}
//                         onBlur={() => setMatchFocus(false)}
//                         />
//                         <p id="pwdnote" classname={matchFocus &&! validMatch ? "instructions" : "offscreen"}>
//                           Must match the first password input field.<br />

//                         </p>
//                         <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
//                 </form>
//                 <p>
//                     Already registered?<br />
//                     <span classname="line">
//                         {/*put router link here*/}
//                         <a href="#">Sign In</a>
//                     </span>
//                 </p>
//              </section>
//             )};
//         </>
//     )
// };
export default Signup;