const Profile = require("../../src/models/profile").default;

describe("profile", function() {
	describe("#constructor", () => {
		describe("normalizes a passed in object", () => {
			before(() => {
				this.profile = new Profile({
					id: 1,
					firstName: "First",
					lastName: "Last",
				});
			});
			it("stores normalized properties", () => {
				assert.deepEqual(this.profile.properties, {
					id: 1,
					firstName: "First",
					lastName: "Last",
				});
			});
			it("stores the id", () => {
				assert.equal(this.profile.id, 1);
			});
			it("stores the model name", () => {
				assert.equal(this.profile.modelName, "profile");
			});
		});
		describe("normalizes a passed in string", () => {
			before(() => {
				this.profile = new Profile(JSON.stringify({
					id: 1,
					firstName: "First",
					lastName: "Last",
				}));
			});
			it("stores normalized properties", () => {
				assert.deepEqual(this.profile.properties, {
					id: 1,
					firstName: "First",
					lastName: "Last",
				});
			});
			it("stores the id", () => {
				assert.equal(this.profile.id, 1);
			});
			it("stores the model name", () => {
				assert.equal(this.profile.modelName, "profile");
			});
		});
	});
	describe("#fetch", () => {
		before(async() => {
			this.profiles = await Profile.fetch();
		});
		it("returns 3 profiles", () => {
			console.log("profiles", this.profiles);
			assert.equal(this.profiles.length, 3);
		});
	});
});
