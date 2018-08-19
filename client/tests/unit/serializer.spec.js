/* global describe, it, assert */
const {serialize} = require("../../src/models/serializer");

describe("#serializer", function() {
	it("returns nothing if given nothing", () => {
		assert.deepEqual(serialize({}), "{}");
	});
	it("serializes a property as JSON", () => {
		assert.deepEqual(serialize({
			firstName: "FirstName",
		}), JSON.stringify({
			first_name: "FirstName",
		}));
	});
	it("serializes multiple properties as JSON", () => {
		assert.deepEqual(serialize({
			firstName: "FirstName",
			lastName: "LastName",
		}), JSON.stringify({
			first_name: "FirstName",
			last_name: "LastName",
		}));
	});
});
