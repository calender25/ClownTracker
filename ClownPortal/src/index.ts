import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import * as Interfaces from './Interfaces';
import * as clownDataManager from './ClownDataManager';
import e from 'express';

const app = express();
const router = express.Router();
const hostname:string = '127.0.0.1';
const port:number = 3500;

app.use(cors());
// Configuring body parser middleware
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());

app.post('/login', (req, res) =>{
    const login:Interfaces.ILoginData = req.body as Interfaces.ILoginData;
    console.log(login.userName);
    if(login.userName === "admin" && login.password === "admin"){
      res.send("success");
    }else{
      res.send("fail");
    }
  });

  app.post('/register', (req, res) =>{
    const data:Interfaces.IClownData = req.body as Interfaces.IClownData;
    console.log(data.name);
    // add validations
    if(clownDataManager.ClownDataManager.getInstance().addClown(data)){
      res.send("success");
    }else{
      res.send("fail");
    }
  });

  app.post('/uploadImage', (req, res) => {
    clownDataManager.ClownDataManager.getInstance().uploadImages(req,res);
  });

  app.post('/deregister', (req, res) =>{
    const email:string = req.body as string;
    // add validations
    if(clownDataManager.ClownDataManager.getInstance().deleteClown(email)){
      res.send("success");
    }else{
      res.send("fail");
    }
  });

  app.post('/search', (req, res) =>{
    const name:string = req.body as string;
    // add validations
    const data: Interfaces.IClownData[] = clownDataManager.ClownDataManager.getInstance().searchClown(name)
    if(!!data.length){
      res.send(data);
    }else{
      res.send([]);
    }
  });

  app.get('/listClowns', (req,res) =>{
    const data: Interfaces.IClownData[] = clownDataManager.ClownDataManager.getInstance().getClowns();
    console.log("list clowns");
    res.send(data);
  });






// add router in the Express app.
app.use("/", router);
app.listen(port, ()=> console.log('Server listening to port 3500 c${port}'));