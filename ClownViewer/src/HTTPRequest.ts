
// classs handles all requests to server
class HttpRequest{
    public static postRequest(data:any, requestType:string, callback:any):void{
        const xhr = new XMLHttpRequest();
        const url:string = "http://127.0.0.1:3500/" + requestType;
        xhr.open("POST", url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function ready( request: XMLHttpRequest, event: Event ): any {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    callback(request.response);
                }
            }
        }.bind(this, xhr);
         xhr.send(JSON.stringify(data));
    }

    public static getRequest(requestType:string, callback:any):void{
        const xhr = new XMLHttpRequest();
        const url:string = "http://127.0.0.1:3500/" + requestType;
        xhr.open("GET", url);

        xhr.onreadystatechange = function ready( request: XMLHttpRequest, event: Event ): any {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    callback(request.response);
                }
            }
        }.bind(this, xhr);
         xhr.send();
    }
}