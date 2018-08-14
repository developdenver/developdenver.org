const database = require("../database-connection");

class Model {
    constructor(modelName){
        this.database = database;
        this.modelName = modelName;
    }
    list(){
        return database(this.modelName).select();
    }
    find(id){
        return database(this.modelName).select().where("id", id).first();
    }
    query(query){
        return database(this.modelName).select().where(query).first();
    }
    add(item){
        const secretKey = crypto.randomBytes(48, (error, buffer) => buffer.toString("hex"));
        return database(this.modelName).returning("*").insert(item).then(items => items[0]);
    }
    remove(id){
        return database(this.modelName).delete().where("id", id);
    }
    update(id, data){
        return database(this.modelName).returning("*").update(data).where("id", id)
            .then(items => items[0]);
    }
}

module.exports = Model;
