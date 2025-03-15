var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
var bodyparser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Table = require('./model');
const { error } = require('console');
const { uuid } = require('uuidv4');


var app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


mongoose.connect('mongodb+srv://prasad:prasad12@cluster0.watthrb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
{ 
  useNewUrlParser: true,
   useUnifiedTopology: true 
  });

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});



const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'public/Images');
  },
  filename:function(req,file,cb){
    cb(null,req.body.filename+".jpg");
  },
});
const upload = multer({storage: storage});

//sign form adding details
app.post("/postData",upload.single('file'), (req,res) =>{
  // console.log(req.file)
  var data = req.body;
  try{
  const newData = new Table(
    {
      first_name : data.firstname,
      last_name : data.secondname,
      email : data.email,
      password : data.password,
      phone : data.phone,
      address : data.address,
      // phone : data.phone,
      pic : data.phone,

    })
    newData.save();
    res.send("ok")
  }
  catch(err) {
    res.send("not ok")
  }
  
  // res.send("saved");
})

//login authenication
app.post("/checkUser" , function(req,res){
  const s = req.body.email;
  const email = req.body.email
  if (email.includes('@')){
    Table.find({
      email: req.body.email,
      password: req.body.password
    })
    
    
    .then(data => {
      // console.log(res.length)
      if(data.length >= 1){
        res.send(data)
      }
      else{
        res.send("not ok")
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }
  else{
    Table.find({
      phone: parseInt(req.body.email),
      password: req.body.password
    })
    
    
    .then(data => {
      // console.log(res.length)
      if(data.length >= 1){
        res.send(data)
      }
      else{
        res.send("not ok")
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }

})


//addcontact details
app.post("/addTodo" ,function(req,res){
  // console.log("hai")
  var x;
  // console.log(new ObjectId(req.body.id))
  Table.findOne({_id:req.body.id})
  .then(res1 => {
    if(res1.todo != "undefined"){
        var data = {
          "firstname" : req.body.first_name,
          "lastname" : req.body.last_name,
          "address" : req.body.address,
          "email" : req.body.email, 
          "phone_number":req.body.phone_number,
          "Task":req.body.Task,
          "id":uuid()
        }
        var Total = res1.todo;
        Total.push(data);
        // console.log(Total)
        Table.findOneAndUpdate({_id:req.body.id},{todo :Total})
        .then(response => {
          res.send("done")
        })
        .catch(err => {
          res.send("error")
        })
    }
    else{
      console.log("dfg")
    }
    
  })
  // console.log(x+"sd");

})

//
app.post("/getcontacts",function(req,res){
  console.log(req.body);
  Table.find({_id:req.body.id})
  .then(result => {
    
    res.send(result)
  })
})
app.post('/updateStudent', async (req, res) => {
  console.log(req.body);
  const { id, checkmail, task, firstname, lastname, phone, email,  address } = req.body;

  try {
    const updatedUser = await Table.findOneAndUpdate(
      { _id: id, 'todo.email': checkmail },
      {
        $set: {
          'todo.$.email': email,
          'todo.$.firstname': firstname,
          'todo.$.lastname': lastname,
          'todo.$.task': task,
          'todo.$.phone_number': phone,
          'todo.$.address': address
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User or student not found' });
    }

    return res.status(200).json({ message: 'Student updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating student:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



//delete existing person
app.post('/deleteStudent', async (req, res) => {
  const { userId, studentId } = req.body;

  try {
    const updatedUser = await Table.findOneAndUpdate(
      { _id: userId },
      { $pull: { todo: { email: studentId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'Student deleted successfully', user: updatedUser });
  } catch (error) {
    // console.error('Error deleting student:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get data by user Id
app.get('/user-data-by-id/:id', async (req,res) => {

  const user_id = req.params.id;
  // console.log(user_id);

  await Table.findById(user_id)
  .then((userData) => {
    // console.log(userData.todo);
    res.send(userData)
  }).catch((error) => {console.log(error)})
})

app.get('/updating/:id', async (req,res) => {

  const user_id = req.params.id;
  // console.log(user_id);

  await Table.findById(user_id)
  .then((userData) => {
    console.log("ewjfn");
    console.log(userData.todo);
    res.send(userData.todo)
  }).catch((error) => {console.log(error)})
})

// update user by id
app.put('/update-user/:id', async(req,res) => {
  const user_id = req.params.id;
  const user_data = req.body;
  // console.log(user_data)


  try {
    const updatedUser = await Table.findByIdAndUpdate(user_id, user_data, { new: true });
    // console.log(updatedUser);
    res.send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



// app.get("/getting",function(req,res){
//   console.log("hai")
//   res.send("hello from backend");
// })




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(8080,function(){
  console.log("server is running on port 8080")
}

)


 



module.exports = app;
