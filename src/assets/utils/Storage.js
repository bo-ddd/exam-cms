class Storage{
    constructor(){
        this.storeage = '';
    }

    setItem(key,val){
        window[this.storage].setItem(key,JSON.stringify(val));
    }

    getItem(key){
        return JSON.parse( window[this.storage].getItem(key) );
    }
}

export default Storage;