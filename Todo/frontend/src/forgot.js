import React, { useState,useEffect, useRef } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
let m;
const Home = () => {
  // console.log(JSON.parse(localStorage.getItem("pic")));
  const[contacts , setContacts] = useState([])
  console.log(contacts)
  const[todo, setTodo]=useState([])
  // const[x,setX] = useState([])
  var url =
    "http://localhost:8080/Images/" +
    JSON.parse(localStorage.getItem("pic")).phone +
    ".jpg";
   /* useEffect(()=>{
      axios.get("http://localhost:8080/getcontacts",{"id":JSON.parse(localStorage.getItem("pic"))._id})
      .then(res => {
       console.log(res.data)
        m = res.data;
        console.log(m);
        setContacts(m);
        
      })
      .catch(err => {
        console.log(err);
      })
  
    },[]) */
    const [data, setData] = useState({
    id:JSON.parse(localStorage.getItem("pic"))._id,
    first_name: "",
    last_name: "",
    phone_number: 0,
    email: "",
    address: "",
    socialmedia:""
  }); 
  

  console.log(data["first_name"]);
  const First_Name = (e) => {
    console.log(e.target.value);
    data["first_name"] = e.target.value;

  };
  const Last_Name = (e) => {
    data["last_name"] = e.target.value;
  };
  const Phone_number = (e) => {
    data["phone_number"] = e.target.value;
  };
  const Email = (e) => {
    data["email"] = e.target.value;
  };
  const Address = (e) => {
    data["address"] = e.target.value;
  };
  const SocialMedia = (e) =>{
    data["socialmedia"] = e.target.value;
  }
  const Send = () => {
   /* axios.post("http://localhost:8080/addTodo",data)
    .then(res => {
      console.log("Hi")
      
    })
    .catch(err => console.log(err))
    // window.location.reload(); */
    console.log("hi")
    console.log(contacts);
    setContacts([...contacts,data])

  }
  
  const[toggle , setToggle] = useState(false);
  const Change =()=>{
    setToggle(!toggle)
  }
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  /* m = contacts.filter((item) =>{
  if(typeof searchTerm == 'string'){
    console.log(searchTerm)
    if(item.firstname.toLowerCase().includes(searchTerm.toLowerCase())){
      return  item.firstname.toLowerCase().includes(searchTerm.toLowerCase())
    }
    else if(item.lastname.toLowerCase().includes(searchTerm.toLowerCase())){
      return  item.lastname.toLowerCase().includes(searchTerm.toLowerCase())
      
    }
    else if(String(item.phone_number).toLowerCase().includes(searchTerm.toLowerCase())){
      return String(item.phone_number).toLowerCase().includes(searchTerm.toLowerCase())
    }
  } 
  
  
  return false;
}
); */
  const redirect = () =>{
    window.location.href = '/'
  }
  const handleDelete = (email) =>{
    /* axios.delete(`http://localhost:8080/deleteds?email=${email}`)
    .then(res=>{
      console.log("successfullt");
          console.log(res.data);
          setContacts(res.data);
      // window.location.reload();

    })
    .catch(err => console.log(err))
      */
     let fet=contacts.filter(eachItem=>(eachItem.email!==email))
     setContacts(fet)
  }
  return (
    <div className="Home_division">
      <div className="Profile_division">
        <div className="Img">
          <img src={url} alt="x" />
        </div>
        <div className="College_name">Aditya Engineering College</div>
        <div className="Details">
          <div className="isdem">Email:&nbsp;{JSON.parse(localStorage.getItem("pic")).email}</div>
          <br />
          <div className="isdph">
            mobile:&nbsp;{JSON.parse(localStorage.getItem("pic")).phone}
          </div>
          <br />
          <div className="isdad">
            address:&nbsp;{JSON.parse(localStorage.getItem("pic")).address}
          </div>
          
        </div>
        
      </div>
      <div className="bt2">   
          <div><button className="bt1" onClick={Change}>Add Contact</button></div>
            <button className="bt" onClick={redirect}>Logout</button>
        </div>
      <div className="Details_ra">
        <div className="Details_ra_1">
        <input type="text" placeholder="Search" onChange={handleSearch} className="ab202" />
            {
              contacts.map((ele,index) =>{
                return <div className="Details_ra_1_1">
                  <div className="data"><div>FirstName : {ele.first_name}</div></div>
                  <div className="data"><div>LastName : {ele.last_name}</div></div>
                  <div className="data"><div>Phone Number : {ele.phone_number}</div></div>
                  <div className="data"><div>Address : {ele.address}</div></div>
                  <div className="data"><div>email : {ele.email}</div></div>
                  <div className="data"><div>SocialMedia : {ele.socialmedia}</div></div>
                  <div className="data"><div ><button onClick={()=>handleDelete(ele.email)}>Delete</button></div></div>
                </div>
              })
            }
        </div>
      <div className="Details_ra_2">
          {toggle?<div className="Sign_up_1">
        <div className="Name_division">
          <input
            type="text"
            className="firstname"
            onChange={First_Name}
            placeholder="First Name"
          />
          <input
            type="text"
            className="secondname"
            onChange={Last_Name}
            placeholder="Last Name"
          />
        </div>
        <div className="input_type">
          <input
            type="number"
            onChange={Phone_number}
            placeholder="Enter Mobile Number"
          />
        </div>
        <div className="input_type">
          <input type="email" onChange={Email} placeholder="Enter email" />
        </div>
        <div className="input_type">
          <input type="text" onChange={SocialMedia} placeholder="Instagram / Facebook" />
        </div>
        <div className="input_type">
          <textarea placeholder="Enter Address" onChange={Address} />
        </div>
        <button className="super" onClick={Send}>Submit</button>
      </div>:<></>}
        </div>
      </div>
      
      
    
    </div>
  );
};

export default Home;
