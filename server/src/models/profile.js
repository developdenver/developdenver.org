const Model = require("./model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

class Profile extends Model {
    constructor(){
        super("profile");
    }
    async add(item){
        item.secret_key = await generateRandomKey();
        item.role = "attendee";
        item.salt = await bcrypt.genSalt(12);
        item.hashed_password = await bcrypt.hash(item.hashed_password, item.salt);
        return this.database(this.modelName).returning("*").insert(item).then(items => items[0]);
    }
}

module.exports = new Profile();

function generateRandomKey(){
    return new Promise((resolve, reject) => {
        crypto.randomBytes(48, (error, buffer) => {
            if (error){
                reject(error)
            }
            resolve(buffer.toString("hex"))
        });
    });
}
