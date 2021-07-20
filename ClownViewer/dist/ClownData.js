class ClownDataVM {
    // properties
    // methods
    // request clown data from server
    static requestDataFromServer() {
        function callback(resp) {
            const data = JSON.parse(resp);
            MainView.updateClownList(data);
        }
        HttpRequest.getRequest("listClowns", callback);
    }
}
//# sourceMappingURL=ClownData.js.map