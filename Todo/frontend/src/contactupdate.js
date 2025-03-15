import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const Updating = () => {  

    const params = useParams();
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        address: "",
        email: "",
        phone_number: "",
        socialmedia: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/updating/${params.id}`)
            .then((result) => {
                const dummydata = result.data;
                setData(dummydata[0]);  
                console.log(result.data);
            })
            .catch((error) => console.error(error)); 
    }, [params.id]); 

    const updateUser = (e) => {
        setData({
            ...data, 
            [e.target.name]: e.target.value  
        });
    };

    const Send = (e) => {
        e.preventDefault();
        if (data.firstname.length !== 0 && data.lastname.length !== 0 && data.address.length !== 0) {
            console.log(data);
            axios.put(`http://localhost:8080/update-user/${params.id}`, data)
                .then(res => {
                    window.location.href = "/Home";
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            console.log("error");
            if (data.firstname.length === 0) alert("Please Enter a valid First Name");
        }
    };

    return (
        <div className='Sign_up_division'>
            <div className='Sign_up_1'>
                <form className='heads123'>
                    <div className='Sign_up_heading'>Existing User Details</div> 
                    <div className='Name_division'>
                        <input 
                            type="text" 
                            className="firstname" 
                            name='firstname'  
                            value={data.firstname}  
                            onChange={updateUser} 
                            placeholder='First Name'
                        />
                        <input 
                            type="text" 
                            className="secondname" 
                            name='lastname'   
                            value={data.lastname} 
                            onChange={updateUser} 
                            placeholder='Last Name'
                        />
                    </div>
                    <div className='input_type'>
                        <input 
                            type="number" 
                            name='phone_number'  
                            value={data.phone_number} 
                            onChange={updateUser} 
                            placeholder='Enter Mobile Number'
                        />
                    </div>
                    <div className='input_type'>
                        <input 
                            type="email" 
                            name='email' 
                            value={data.email} 
                            onChange={updateUser} 
                            placeholder='Enter Email'
                        />
                    </div>
                    <div className='input_type'>
                        <textarea 
                            placeholder='Task Name' 
                            name='address' 
                            value={data.address} 
                            onChange={updateUser}
                        />
                    </div>
                    <div className='Sublog1'>
                        <button className='Signup123' onClick={Send}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Updating;  
