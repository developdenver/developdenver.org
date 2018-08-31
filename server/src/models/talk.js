const Model = require("./model");

class Talk extends Model {
  constructor() {
    super("talk");
    this.publicProperties = [
      "id", "title", "type", "description", "talk_photo_url",
    ];
  }
  async add(item, isAdmin) {
// i am unsure about this part so i just changed names to match up talk and hopefully i will figure out what to do with it later
    return this.database(this.modelName)
      .returning(this.propertyList(isAdmin))
      .insert(item)
      .then(items => items[0])
      .catch(error => {
        throw new Error(error.message);
      });
  }
}

module.exports = new Talk();
