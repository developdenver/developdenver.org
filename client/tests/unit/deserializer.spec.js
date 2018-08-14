const {deserialize} = require("../../src/models/deserializer");

describe("#deserializer", function(){
    it("returns nothing if given nothing", () => {
        assert.deepEqual(deserialize("{}"), {});
    });
    it("serializes a JSON property as a camelcased object", () => {
        assert.deepEqual(deserialize(JSON.stringify({
            first_name: "FirstName"
        })), {
            firstName: "FirstName"
        });
    });
    it("serializes a property as a camelcased object", () => {
        assert.deepEqual(deserialize({
            first_name: "FirstName"
        }), {
            firstName: "FirstName"
        });
    });
    it("serializes multiple JSON properties as a camelCased object", () => {
        assert.deepEqual(deserialize({
            first_name: "FirstName",
            last_name: "LastName"
        }), {
            firstName: "FirstName",
            lastName: "LastName"
        });
    });
});
