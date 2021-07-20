
class ClownDataVM {
    // properties

    // methods
    // request clown data from server
    public static requestDataFromServer():void {
        function callback(resp:any) {
            const data:IClownData[] = JSON.parse(resp);
            MainView.updateClownList(data);
        }
        HttpRequest.getRequest("listClowns",callback);
    }
}

interface IClownData{
    name:string,
    age:string,
    address:string,
    clownType:string,
    email:string
}