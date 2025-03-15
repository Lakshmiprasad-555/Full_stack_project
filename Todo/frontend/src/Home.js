import React, { useState,useEffect } from "react";
import axios from "axios";
import { redirect,Link } from "react-router-dom";
var m;
const Home = () => {
  // console.log(JSON.parse(localStorage.getItem("pic")));
  const[contacts , setContacts] = useState([])
  const[x,setX] = useState([])
  const[userId, setUserId] = useState('');
  const [updateContact, setUpdateContact] = useState(null);
  const [editContact, setEditContact] = useState(null);

  // useEffect(()=>(
  //   localStorage.setItem("pic",x)
  // ),[])
  var url =
    "http://localhost:8080/Images/" +
    JSON.parse(localStorage.getItem("pic")).phone +
    ".jpg";
    useEffect(()=>{
      axios.post("http://localhost:8080/getcontacts",{"id":JSON.parse(localStorage.getItem("pic"))._id})
      .then(res => {
       console.log(res.data)
        setContacts(res.data[0]["todo"]);
        m = res.data[0]["todo"];
        setUserId(res.data[0]["_id"]);
        // console.log(res.data[0]["_id"])
      })
      .catch(err => {
        console.log(err);
      })
  
    },[])
    const [data, setData] = useState({
    id:JSON.parse(localStorage.getItem("pic"))._id,
    first_name: "",
    last_name: "",
    phone_number: 0,
    email: "",
    address: "",
    Task:""
  });
  const First_Name = (e) => {
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
    data["Task"] = e.target.value;
  }
  const Send = () => {
    axios.post("http://localhost:8080/addTodo",data)
    .then(res =>  {
      console.log(res)
      window.location.reload();}
      )
    .catch(err => console.log(err))

  }

  const[toggle , setToggle] = useState(false);
  const Change =()=>{
    setToggle(!toggle)
  }
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  m = contacts.filter((item) =>{
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
);
const redirect = () =>{
  window.location.href = '/'
}
const handleEmail = async (studentId) =>{
  setEditContact(studentId);
}
const submitfrom = () =>{
   console.log(data);
  const response =  axios.post('http://localhost:8080/updateStudent', {
      id: userId,
      checkmail : editContact,
      task: data.Task,
      firstname : data.first_name,
      lastname : data.last_name,
      phone : data.phone_number,
      email : data.email,
      address : data.address
    });
    console.log(response);
    setEditContact(null);
    window.location.reload();
}
const handleDelete = async (studentId) => {
  console.log(studentId)
  console.log(userId)

  try {
    const response = await axios.post('http://localhost:8080/deleteStudent', {
      userId,
      studentId,
    });
    window.location.reload();
    console.log(response.data);
  } catch (error) {
    console.error('Error deleting student:', error);
  }
};

  return (
    <div className="Home_division">
      <div className="Profile_division">
        <div className="Img">
          <img src={url} />
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
          
        <div>
          <div className="l12"><Link className="bt12" to={`/Editing/${userId}`} >Edit User</Link></div></div>
        </div>
      </div>
      <div className="bt2">   
          <div><button className="bt1" onClick={Change}>Add Contact</button></div>
          <div><button className="bt" onClick={redirect}>Logout</button></div>
        </div>
      <div className="Details_ra">
        <div className="Details_ra_1">
        <input type="text" placeholder="Search" onChange={handleSearch} />
            {
              m.map((contact,index) =>{
                return <div className="Details_ra_1_1">
                  {editContact === contact.email ? (
                    data["first_name"] = contact.firstname,
                    data["last_name"] = contact.lastname,
                    data["phone_number"] = contact.phone_number,
                    data["email"] = contact.email,
                    data["address"] = contact.address,
                    data["Task"] = contact.Task,

                <>
                  
                  <div className="data"><div>FirstName : <input type="text" defaultValue={contact.firstname} onChange={First_Name} /></div></div>
                  <div className="data"><div>LastName : <input type="text" defaultValue={contact.lastname} onChange={Last_Name}/></div></div>
                  <div className="data"><div>Phone Number : <input type="number" defaultValue={contact.phone_number} onChange={Phone_number}/></div></div>
                  <div className="data"><div>Address : <input type="text" defaultValue={contact.address} onChange={Address} /></div></div>
                  <div className="data"><div>email : <input type="email" defaultValue={contact.email} onChange={Email} /></div></div>
                  <div className="data"><div>Task : <input type="text" defaultValue={contact.Task} onChange={SocialMedia}/></div></div>
                  <div className="data"><div ><button className="bt125" onClick={submitfrom}>update</button></div></div>
                </>
              ) : (
                <>
                  <div className="data"><div>FirstName : {contact.firstname}</div></div>
                  <div className="data"><div>LastName : {contact.lastname}</div></div>
                  <div className="data"><div>Phone Number : {contact.phone_number}</div></div>
                  <div className="data"><div>Address : {contact.address}</div></div>
                  <div className="data"><div>email : {contact.email}</div></div>
                  <div className="data"><div>Task : {contact.Task}</div></div>
                  <div className="pres">
                    <div className="data"><div ><button className="bt125" onClick={() => handleDelete(contact.email)}>Delete</button></div></div>
                    <div className="data"><div ><button className="bt125" onClick={() => handleEmail(contact.email)}>Edit</button></div></div>
                  </div>
                </>
              )} </div>
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
