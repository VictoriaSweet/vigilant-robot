import { useRef, useState, useEffect, useContext } from 'react';
import axios from '../services/api'
import AuthContext from '../services/AuthProvider'

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [sucess, setSuccess] = useState('false');

     useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
       setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
            );
        console.log(JSON.stringify(response?.data));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.role;
        setAuth({ user, pwd, roles, accessToken });
        setUser('');
        setPwd('');
        setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if ( err.response?.status === 400) {
                setErrMsg('Missing username or password');
            } else if ( err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed')
            }
            errRef.current.focus();
        }
        
    }

    return (
        <>
        {sucess ? (
            <section>
                <h1>You are logged in!</h1>
                <p>
                    <a href="#">Go to Home</a>
                </p>
            </section>
        ) : (
            <section>
                <p ref= {errRef} classname={errMsg ? "errmsg" :
                "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        autoComplete="off"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span classname="line">
                        {/*put router link here*/}
                        <a href="#">Sign Up</a>
                    </span>
                </p>
            </section>
        )}
    </>
    );
};
export default Login