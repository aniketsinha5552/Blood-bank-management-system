
static data = {};

class DataStore {

    constructor(){
        
    }
    setdata(payload){
        data = payload;
    }

    getData(){
        return data;
    }
}

export default DataStore;