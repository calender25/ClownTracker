// classs handles all requests to server
class HttpRequest {
    static postRequest(data, requestType, callback) {
        const xhr = new XMLHttpRequest();
        const url = "http://127.0.0.1:3500/" + requestType;
        xhr.open("POST", url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function ready(request, event) {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    callback(request.response);
                }
            }
        }.bind(this, xhr);
        xhr.send(JSON.stringify(data));
    }
    static getRequest(requestType, callback) {
        const xhr = new XMLHttpRequest();
        const url = "http://127.0.0.1:3500/" + requestType;
        xhr.open("GET", url);
        xhr.onreadystatechange = function ready(request, event) {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    callback(request.response);
                }
            }
        }.bind(this, xhr);
        xhr.send();
    }
}
//# sourceMappingURL=HTTPRequest.js.map