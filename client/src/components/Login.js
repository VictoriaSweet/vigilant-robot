import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations'
import axios from '../services/api'
import AuthContext from '../services/AuthProvider'
import Auth from '../services/auth'

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);
  
    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    // submit form
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
      try {
        const { data } = await login({
          variables: { ...formState },
        });
  
        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }
  
      // clear form values
      setFormState({
        email: '',
        password: '',
      });
    };
  
    return (
      <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10">
          <div className="card">
            <h4 className="card-header bg-dark text-light p-2">Login</h4>
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

// const LOGIN_URL = '/auth';

// const Login = () => {
//     const { setAuth } = useContext(AuthContext)
//     const userRef = useRef();
//     const errRef = useRef();

//     const [user, setUser] = useState('');
//     const [pwd, setPwd] = useState('');
//     const [errMsg, setErrMsg] = useState('');
//     const [sucess, setSuccess] = useState('false');

//      useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     useEffect(() => {
//        setErrMsg('');
//     }, [user, pwd])

//     const handleSubmit = async (e) => {
//         console.log('test')
//         e.preventDefault();
//         try {
//             const response = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}),
//             {
//                 headers: {'Content-Type': 'application/json'},
//                 withCredentials: true
//             }
//             );
//         console.log(JSON.stringify(response?.data));
//         const accessToken = response?.data?.accessToken;
//         const roles = response?.data?.role;
//         setAuth({ user, pwd, roles, accessToken });
//         setUser('');
//         setPwd('');
//         setSuccess(true);
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('No server response');
//             } else if ( err.response?.status === 400) {
//                 setErrMsg('Missing username or password');
//             } else if ( err.response?.status === 401) {
//                 setErrMsg('Unauthorized');
//             } else {
//                 setErrMsg('Login failed')
//             }
//             errRef.current.focus();
//         }
        
//     }

//     return (
//         <>
//         {sucess ? (
//             <section>
//                 <h1>You are logged in!</h1>
//                 <p>
//                     <a href="/">Go to Home</a>
//                 </p>
//             </section>
//         ) : (
//             <section>
//                 <p ref= {errRef} classname={errMsg ? "errmsg" :
//                 "offscreen"} aria-live="assertive">{errMsg}</p>
//                 <h1>Sign In</h1>
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="username">Username:</label>
//                     <input
//                         type="text"
//                         id="username"
//                         ref={userRef}
//                         autoComplete="off"
//                         onChange={(e) => setUser(e.target.value)}
//                         value={user}
//                         required
//                     />

//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         autoComplete="off"
//                         onChange={(e) => setPwd(e.target.value)}
//                         value={pwd}
//                         required
//                     />
//                     <button>Sign In</button>
//                 </form>
//                 <p>
//                     Need an Account?<br />
//                     <span classname="line">
//                         {/*put router link here*/}
//                         <a href="">Sign Up</a>
//                     </span>
//                 </p>
//             </section>
//         )}
//     </>
//     );
// };


export default Login