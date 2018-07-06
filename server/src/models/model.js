const database = require("../database-connection");

class Model {
    constructor(modelName){
        this.modelName = modelName;
    }
    list(){
        return database(this.modelName).select();
    }
    find(id){
        return database(this.modelName).select().where("id", id).first();
    }
    add(item){
        return database(this.modelName).returning("*").insert(item).then(items => items[0]);
    }
    remove(id){
        return database(this.modelName).delete().where("id", id);
    }
}

module.exports = Model;
