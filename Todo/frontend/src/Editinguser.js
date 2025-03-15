import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './App.css'

import axios from 'axios';

const Editinguser = () => {

    const params = useParams();
    console.log(params.id);

    useEffect(() => {
         axios.get(`http://localhost:8080/user-data-by-id/${params.id}`)
        .then((result) => {
            console.log(result.data.todo);
            setData(result.data)
            // console.log(result.data)
        }).catch((reeoe) => {console.log(console.error)})
    },[])

// 
    const[data, setData]=useState({
        first_name:"",
        last_name:"",
        phone:"",
        email:"",
        address:"",
    })

    const updateUser = (e) => {

        setData({
            ...data, [e.target.name] : e.target.value
        })
    }

    

    const Send = (e) => {
        e.preventDefault();
        if(data["first_name"].length !== 0 && data["last_name"].length !== 0 && data["address"].length !== 0){

        // console.log(data)
        axios.put(`http://localhost:8080/update-user/${params.id}`,data)
        .then(res => { 
            // console.log(res.data) 
            // window.location.href = "/Home"
            // alert(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    else{
        console.log("error")
        if(data["first_name"].length === 0)alert("Please Enter valid FirstName");
  
    }
    }
    return (
        <div className='Sign_up_division'>
            <div className='Sign_up_1'>
                <form className='heads123'>
                    <div className='Sign_up_heading'>Edit Existing user Details</div>
                    <div className='Name_division'>
                        <input type="text" className="firstname" name='first_name' defaultValue={data.first_name} onChange={updateUser} placeholder='First Name'/>
                        <input type="text" className="secondname" name='last_name' defaultValue={data.last_name} onChange={updateUser} placeholder='Last Name'/>
                    </div>
                    <div className='input_type'><input type="number" name='phone' defaultValue={data.phone} onChange={updateUser} placeholder='Enter Mobile Number'/></div>
                    <div className='input_type'><input type="email" name='email' defaultValue={data.email} onChange={updateUser} placeholder='Enter email'/></div>
                    <div className='input_type'><textarea placeholder='Enter Address' name='address' defaultValue={data.address} onChange={updateUser}/></div>
                    <div className='Sublog1'>
                        <button className='Signup123' onClick={Send}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Editinguser;