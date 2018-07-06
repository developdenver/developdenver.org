const Model = require("./model");

class Profile extends Model {
    constructor(){
        super("profile");
    }
}

module.exports = new Profile();
