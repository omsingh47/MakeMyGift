import React , {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        //API CALL
        
        const response = await fetch(`http://localhost:5000/api/auth/loginuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // We are providing headers and bbody as per we made end points in Thunderclient... 
        });
        const json = await response.json();
        console.log(json);
        if (json.success) { //We have set success default value as false in auth.js login section and will update its value to true if auth token is successfully generated.. 
            //Save the auth-token & redirect
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('email', credentials.email)
            navigate("/");  //harry has used useHistory hook but in 6.8.0 react-router-dom useNavigate is available... 
        }
        else {
            console.log("Invalid Credentials");
        }
    }
    const handlechange = (e)=>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
            <div className="wrapper">
                <div className="main">
                        <div className=" input-box">
                            <header>Create account</header>
                            <div className="input-field">
                                <input type="text" className="input" id="email" name='email' value={credentials.email} onChange={handlechange}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input type="password" className="input" id="pass" name='password' value={credentials.password} onChange={handlechange}/>
                                <label htmlFor="pass">Password</label>
                            </div>
                            <div className="input-field">
                                <input type="submit" className="submit" value="Sign In" onClick={handleSubmit}/>
                            </div>
                            <div className="signin">
                                <span>Already have an account? <Link to="#">Log in here</Link></span>
                            </div>
                    </div>
                </div>
            </div>
    )
}

export default Login