import React,{useState} from 'react';

import axios from 'axios';

const Signup = () => {
    const[data, setData]=useState({
        first_name:"",
        last_name:"",
        phone_number:0,
        email:"",
        address:"",
        password:"",
        conform_password:"",
        file:""
    })
    const First_Name = (e) =>{
        data["first_name"] = e.target.value
    }
    const Last_Name = (e) =>{
        data["last_name"] = e.target.value
    }
    const Phone_number = (e) =>{
        data["phone_number"] = e.target.value
    }
    const Email = (e) => {
        data["email"] = e.target.value
    }
    const Address = (e) => {
        data["address"] = e.target.value
    }
    const Password = (e) => {
        data["password"] = e.target.value
    }
    const Conform_password = (e) => {
        data["conform_password"] = e.target.value
    }
    // const Show = () => {
    //     console.log(data);
    // }
    const Upload = (e) =>{
        data["file"] = e.target.files[0];
    }

    const Send = (e) => {
        e.preventDefault();
        if(data["phone_number"].length === 10 && data["password"] === data["conform_password"] && data["first_name"].length !== 0
         && data["last_name"].length !== 0 && data["address"].length !== 0 && data["file"].length !== 0){
            console.log(data["file"], "woivw");
        const InputData = new FormData()
        InputData.append("firstname",data["first_name"])
        InputData.append("secondname",data["last_name"])
        InputData.append("email",data["email"])
        InputData.append("phone",data["phone_number"])
        InputData.append("password",data["password"])
        InputData.append("conform_password",data["conform_password"])
        InputData.append("address",data["address"])
        InputData.append("filename",data["phone_number"]);
        InputData.append("file",data["file"])
        axios.post('http://localhost:8080/postData',InputData)
        .then(res => { 
            console.log(res.data) 
            window.location.href = "/"
            // alert(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    else{
        if(data["first_name"].length === 0)alert("Please Enter valid FirstName");
        else if (data["last_name"].length === 0)alert("Please Enter valid LastName");
        else if(data["phone_number"].length !== 10)alert("Please Enter valid PhoneNumber");
        else if(data["password"] !== data["conform_password"])alert("Please Enter valid Password");
        else if(!data["file"])alert("Pleae upload image or document");
    }
    }
    const abc = () =>{
        console.log("uwehw");
        window.location.href = "/";
    }
    return (
        <div className='Sign_up_division'>
            <div className='Sign_up_1'>
                <form className='heads123'>
                    <div className='Sign_up_heading'>Sign Up</div>
                    <div className='Name_division'>
                        <input type="text" className="firstname" onChange={First_Name} placeholder='First Name'/>
                        <input type="text" className="secondname" onChange={Last_Name} placeholder='Last Name'/>
                    </div>
                    <div className='input_type'><input type="number" onChange={Phone_number} placeholder='Enter Mobile Number'/></div>
                    <div className='input_type'><input type="email" onChange={Email} placeholder='Enter email'/></div>
                    <div className='input_type'><textarea placeholder='Enter Address' onChange={Address}/></div>
                    <div className='input_type'><input type="password" placeholder='Enter Password'onChange={Password} /></div>
                    <div className='input_type'><input type="password" placeholder='Confirm Password' onChange={Conform_password}/></div>
                    <div className='input_type'><input type="file" placeholder='Upload Profile' onChange={Upload}/></div>
                    <div className='Sublog'>
                        <button className='Signup123' onClick={Send}>Submit</button>
                        <button type ="button" className ="Login123"onClick={abc}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;