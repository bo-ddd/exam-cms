import Storage from './Storage';

class Session extends Storage{
    constructor(){
        super();
        this.storage = 'sessionStorage'
    }
}

export default new Session();



// Storage 当成一个基类； 

//  getItem  setItem;