import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const router = express.Router();
const hostname:string = '127.0.0.1';
const port:number = 3000;

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/login', (req, res) =>{
    const login:Interfaces.ILoginData = req.body as Interfaces.ILoginData;
    console.log(JSON.stringify(login));
    const callBack = (token:string, error:Interfaces.ErrorCode)=>{
        res.send({token, errorCode:error});
      };
    helper.Helper.login(login,callBack);
  });

// add router in the Express app.
app.use("/", router);
app.listen(port, ()=> console.log('Server listening to port 3000 c${port}'));