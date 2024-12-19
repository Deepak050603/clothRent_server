// import mogoos

const mongoose =require('mongoose')

connectionstring = process.env.DATABASE

mongoose.connect(connectionstring).then(()=>{
    console.log('mongodb connected succesfully');
    
}).catch((err)=>{
    console.log(`mongodb connection failed due to ${err}`);
    
})