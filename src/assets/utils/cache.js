
const state = Symbol('state');  

class Cache{
    constructor(){
        this[state] = {};
    }

    getItem(key){
        return this[state][key] || JSON.parse(window.sessionStorage.getItem(key));
    }

    setItem(key,val){
        this[state][key] = val;
        console.log('-------------setItem---------------')
        window.sessionStorage.setItem(key,JSON.stringify(val));
    }
}

let cache = new Cache();

export default cache;