import {mount} from "@vue/test-utils";
import EditProfile from "@/components/edit-profile.vue";

describe("edit-profile", () => {
	it("displays profile details", () => {
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
			twitterUsername: "twitter"
		};
		const component = mount(EditProfile, {
			propsData: {profile}
		});
		assert.equal(component.find("[name='first-name']").element.value, "First");
		assert.equal(component.find("[name='last-name']").element.value, "Last");
		assert.equal(component.find("[name='email']").element.value, "email@address.com");
		assert.equal(component.find("#profile-photo > img").element.src, "picture.jpg");
		assert.equal(component.find("[name='bio']").element.value, "Bio");
		assert.equal(component.find("[name='employer']").element.value, "Employer");
		assert.equal(component.find("[name='position']").element.value, "Position");
		assert.equal(component.find("[name='website']").element.value, "https://website.com");
		assert.equal(component.find("[name='github-username']").element.value, "github");
		assert.equal(component.find("[name='twitter-username']").element.value, "twitter");
	});
	it("allows a profile change", () => {
		const profile = {
			firstName: "First",
			lastName: "Last",
			email: "email@address.com",
			employer: "Employer"
		};
		const component = mount(EditProfile, {
			propsData: {profile}
		});
		component.find("[name='employer']").setValue("Looking");
		component.find("form").trigger("submit");
		assert.equal(component.emitted("updateProfile").length, 1);
		assert.deepEqual(component.emitted("updateProfile")[0][0], {
			firstName: "First",
			lastName: "Last",
			email: "email@address.com",
			employer: "Looking"
		});
	});
});
