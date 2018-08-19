/* global xdescribe, describe, it, assert */
const {buildUrl, buildRequest} = require("../../src/models/adapter");

xdescribe("adapter", function() {
	describe("#buildUrl", () => {
		it("adds the model name to the url", () => {
			assert.deepEqual(buildUrl("profile"), "http://localhost:3000/profiles");
		});
		it("adds the model name and an id to the url", () => {
			assert.deepEqual(buildUrl("profile", "1"), "http://localhost:3000/profiles/1");
		});
		it("adds the model name and an integer id to the url", () => {
			assert.deepEqual(buildUrl("profile", 1), "http://localhost:3000/profiles/1");
		});
	});
	describe("#buildRequest", () => {
		describe("GET requests", () => {
			it("builds a GET request", () => {
				assert.deepEqual(buildRequest("https://www.google.com", "GET"), {
				});
			});
		});
	});
});
