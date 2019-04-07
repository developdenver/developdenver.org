const database = require("../database-connection");

class Model {
    constructor(modelName){
        this.database = database;
        this.modelName = modelName;
        this.propertyList.bind(this);
    }
    propertyList(isAdmin){
        return isAdmin
            ? "*"
            : this.publicProperties;
    }
    list(isAdmin){
        return database(this.modelName)
            .select(this.propertyList(isAdmin));
    }
    find(id, isAdmin){
        return database(this.modelName)
            .select(this.propertyList(isAdmin))
            .where("id", id).first();
    }
    query(query, isAdmin){
        return database(this.modelName)
            .select(this.propertyList(isAdmin))
            .where(query)
            .first();
    }
    exists(query) {
        return this
            .query(query, true)
            .then(v => !!v);
    }
    add(item, isAdmin){
        return this.addAll([item], isAdmin).then(items => items[0]);
    }
    addAll(items, isAdmin) {
        return database(this.modelName)
            .insert(items)
            .returning(this.propertyList(isAdmin))
    }
    remove(id){
        return database(this.modelName)
            .delete()
            .where("id", id);
    }
    update(id, data, isAdmin){
        return database(this.modelName)
            .returning(this.propertyList(isAdmin))
            .update(data).where("id", id)
            .then(items => items[0]);
    }
}

module.exports = Model;
