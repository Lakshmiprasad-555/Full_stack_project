import React,{useState} from 'react';
import axios from 'axios';

// import { Link } from 'react-router-dom';
import './styles.css';
// import forgot from './forgot';
const Login = () => {
    const [data,setData] = useState({
        email:"",
        password:"",
    });
    const Email = (e) => {
        data["email"] = e.target.value;
        // console.log(data["email"])
    }
    const Password = (e) => {
        data["password"] = e.target.value;
        // console.log(data["password"])
    }
    const Send = () => {
        console.log(data)
        axios.post("http://localhost:8080/checkUser",data)
        .then(res =>{
            // console.log(res.data[0])
            var x = JSON.stringify(res.data[0])
            localStorage.setItem("pic",x)
            
            // console.log(localStorage.getItem("pic"))
            console.log(res.data)
            console.log(res.data.length);
            if(typeof res.data !== 'string' && res.data.length === 1){
                window.location.href="/Home";
            }
            else{
                alert("user not found")
            }
        })
        .catch(err => {
            console.log(err);
            alert("user not found")
        })
    }
    const Signup = () =>{
        window.location.href = '/signup'
    }

    return (
        <div className='Login_division'>
            <div className='Login_div'>
                <div className='Login_heading'>Login</div>
                <div className='input_type'><input type="text" onChange={Email} placeholder='Enter Email or phone number'/></div>
                <div className='input_type'><input type="password" onChange={Password} placeholder='Enter password'/></div>
                <div className='Buttons'>
                    <button className='Login123' onClick={Send}>Login</button>
                    <button className='Signup123' onClick={Signup}>Signup</button>
                    {/* <p>
                        <Link to={'forgot'}>Forgot password?</Link>
                    </p> */}
                </div>

            </div>
        </div>
    );
};

export default Login;