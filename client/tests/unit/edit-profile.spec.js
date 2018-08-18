import {mount, } from "@vue/test-utils";
import EditProfile from "@/components/edit-profile.vue";

describe("edit-profile", function() {
	describe("displays profile details", () => {
		before(() => {
			const profile = {
				firstName: "First",
				lastName: "Last",
				email: "email@address.com",
				profilePhotoUrl: "picture.jpg",
				bio: "Bio",
				employer: "Employer",
				position: "Position",
				website: "https://website.com",
				githubUsername: "github",
				twitterUsername: "twitter",
			};
			this.component = mount(EditProfile, {
				propsData: {profile, },
			});
		});
		it("displays the first name", () => {
			assert.equal(this.component.find("[name='first-name']").element.value, "First");
		});
		it("displays the last name", () => {
			assert.equal(this.component.find("[name='last-name']").element.value, "Last");
		});
		it("displays the email", () => {
			assert.equal(this.component.find("[name='email']").element.value, "email@address.com");
		});
		it("displays the profile photo", () => {
			assert.equal(this.component.find("#profile-photo > img").element.src, "picture.jpg");
		});
		it("displays the bio", () => {
			assert.equal(this.component.find("[name='bio']").element.value, "Bio");
		});
		it("displays the employer", () => {
			assert.equal(this.component.find("[name='employer']").element.value, "Employer");
		});
		it("displays the position", () => {
			assert.equal(this.component.find("[name='position']").element.value, "Position");
		});
		it("displays the website", () => {
			assert.equal(this.component.find("[name='website']").element.value, "https://website.com");
		});
		it("displays the github username", () => {
			assert.equal(this.component.find("[name='github-username']").element.value, "github");
		});
		it("displays the twitter username", () => {
			assert.equal(this.component.find("[name='twitter-username']").element.value, "twitter");
		});
	});
	describe("profile changes", () => {
		before(() => {
			const profile = {
				id: "1",
				firstName: "First",
				lastName: "Last",
				email: "email@address.com",
				employer: "Employer",
			};
			this.component = mount(EditProfile, {
				propsData: {profile, },
			});
			this.component.find("[name='employer']").setValue("Looking");
			this.component.find("form").trigger("submit");
			this.modifiedProfile = {
				id: 1,
				profile: {
					employer: "Looking",
				},
			};
		});
		it("emits the updated profile", () => {
			assert.equal(this.component.emitted("updateProfile").length, 1);
			assert.deepEqual(this.component.emitted("updateProfile")[0][0], this.modifiedProfile);
		});
	});
	describe("#addInputData", () => {
		before(() => {
			const profile = {
				id: "1",
				firstName: "First",
				lastName: "Last",
				email: "email@address.com",
			};
			this.component = mount(EditProfile, {
				propsData: {profile, },
			});
			this.element = {
				name: "name-here",
				value: "Value",
			};
		});
		it("adds to a fresh object", () => {
			assert.deepEqual(this.component.vm.addInputData({}, this.element), {
				nameHere: "Value",
			});
		});
		it("adds to an existing object", () => {
			assert.deepEqual(this.component.vm.addInputData({
				existingName: "Existing Value",
			}, this.element), {
				existingName: "Existing Value",
				nameHere: "Value",
			});
		});
	});
	describe("#doesPropertyExist", () => {
		before(() => {
			const profile = {
				id: "1",
				firstName: "First",
				lastName: "Last",
				email: "email@address.com",
			};
			this.component = mount(EditProfile, {
				propsData: {profile, },
			});
		});
		it("returns true if a property exists on the profile", () => {
			const element = {
				name: "first-name",
			};
			assert.ok(this.component.vm.doesPropertyExist(element));
		});
		it("returns false if a property doesn't exist on the profile", () => {
			const element = {
				name: "third-name",
			};
			assert.ok(!this.component.vm.doesPropertyExist(element));
		});
	});
	describe("#diffObjects", () => {
		before(() => {
			this.oldProfile = {
				id: "1",
				firstName: "First",
				lastName: "Last",
				email: "email@address.com",
			};
			this.component = mount(EditProfile, {
				propsData: {profile: this.oldProfile, },
			});
		});
		it("returns nothing if there is no difference", () => {
			assert.deepEqual(this.component.vm.diffObjects(this.oldProfile, this.oldProfile), {});
		});
		it("returns a single change", () => {
			const changedProfile = {
				id: "1",
				firstName: "First",
				lastName: "Changed",
				email: "email@address.com",
			};
			assert.deepEqual(this.component.vm.diffObjects(this.oldProfile, changedProfile), {
				lastName: "Changed",
			});
		});
		it("returns multiple changes", () => {
			const changedProfile = {
				id: "1",
				firstName: "I",
				lastName: "Changed",
				email: "email@address.com",
			};
			assert.deepEqual(this.component.vm.diffObjects(this.oldProfile, changedProfile), {
				firstName: "I",
				lastName: "Changed",
			});
		});
	});
});
