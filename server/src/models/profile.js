const Model = require("./model");

const { hashPassword } = require("../utilities/auth");

class Profile extends Model {
    constructor(){
        super("profile");
    }
    async add(item){
        const {secretKey, hashedPassword, salt} = await hashPassword(item.hashed_password);
        item = Object.assign(item, {
            secret_key: secretKey,
            salt,
            hashed_password: hashedPassword,
            role: "attendee",
        });
        return this.database(this.modelName).returning("*").insert(item).then(items => items[0]);
    }
}

module.exports = new Profile();

