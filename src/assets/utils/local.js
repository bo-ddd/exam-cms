import Storage from './Storage';

class Local extends Storage{
    constructor(){
        super();
        this.storage = 'localStorage'
    }
}

export default new Local();