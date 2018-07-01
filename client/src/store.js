import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentProfile: {
			firstName: "Test",
			lastName: "User",
			email: "test@user.com",
			profilePhotoUrl: "photo.jpg",
			bio: "Bio",
			employer: "Employer",
			position: "Position",
			website: "Website",
			githubUsername: "Github",
			twitterUsername: "Twitter"
		}
	},
	mutations: {

	},
	actions: {
		getProfile(){
		}
	}
});
