
import * as Interfaces from './Interfaces';
import multer from 'multer'; // used for multo form data/ uploading image data

export class ClownDataManager{
    // properties
    private clownMap:Map<string,Interfaces.IClownData> = null;
    private static instance:ClownDataManager = null;

    // methods
    // make constructor as private for singleton pattern
    private constructor() {
        this.clownMap = new Map();
        let sample:Interfaces.IClownData = {name:"Tom",address:"123 Central Rd, NewYork, 28848",dob:"03/02/1991",clownType:"ABC", email:"abc@gmail.com"};
        this.addClown(sample);
        sample = {name:"Don",address:"123 Market Rd, NewYork, 28848",dob:"03/02/1993",clownType:"ABC", email:"aaaa@gmail.com"};
        this.addClown(sample);
        sample = {name:"Harry",address:"567 Marquis Rd, NewYork, 28848",dob:"03/02/1992",clownType:"ABC", email:"bbbb@gmail.com"};
        this.addClown(sample);
    }

    public static getInstance(): ClownDataManager {
        if (!this.instance) {
          this.instance = new this();
        }
        return this.instance;
    }

    public addClown(data:Interfaces.IClownData):boolean{
        if(!!this.clownMap.has(data.email)){
            // already existing
            return false;
        } else{
            this.clownMap.set(data.email, data);
            return true;
        }
    }

    public deleteClown(email:string):boolean{
        if(!this.clownMap.has(email)){
            // not existing
            return false;
        } else{
            return this.clownMap.delete(email);
        }
    }

    public searchClown(name:string):Interfaces.IClownData[]{
        name = name.toLowerCase();
        const clownDataArr: Interfaces.IClownData[]=[];
        this.clownMap.forEach(clown =>
            {
                if(clown.name.toLowerCase().indexOf(name) !== 0){
                    clownDataArr.push(clown);
                }
            });
        return clownDataArr;
    }

    public getClowns():Interfaces.IClownData[]{
        const clownDataArr: Interfaces.IClownData[]=[];
        let count:number = 0;
        this.clownMap.forEach(clown =>
            {
                if(count > 10) return; // return only the 10 items
                clownDataArr.push(clown);
                count++;
            });
        return clownDataArr;
    }


    public filterImage(req:any, file:any, callback:(error:Error,result:boolean)=>void):void {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    }

    public uploadImages(req:any,res:any): void{
        this.upload(req, res, (err:any)=> {
            if (err) {
               return res.send(err);
             }
             res.send("Files are uploaded successfully");
         });
    }

    private fileStorage = multer.diskStorage({
        destination (req, file, callback) {
          callback(null, './uploads');
        },
        filename (req, file, callback) {
          callback(null, file.fieldname + '-' + Date.now());
        }
      });

    private upload = multer({storage:this.fileStorage,fileFilter:this.filterImage}).array("images",1);
}