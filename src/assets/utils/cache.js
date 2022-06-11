
const state = Symbol('state');  

class Cache{
    constructor(){
        this[state] = {};
    }

    getItem(key){
        return this[state][key];
    }

    setItem(key,val){
        this[state][key] = val;
    }
}

export default Cache;