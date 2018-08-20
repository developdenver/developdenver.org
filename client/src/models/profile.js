import Model from "./model";

class Profile extends Model {
	constructor(profile) {
		super("profile", profile);
	}
	setTicketLevel(level) {
		this.properties.ticketLevel = level;
	}
	async create() {
		const url = this.buildUrl(this.modelName, this.id);
		const { data, jwt } = await fetch(url, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
			body: this.serialize(),
		}).then(response => response.json())
			.catch(error => console.error(error.message));
		this.properties = this.normalize(data);
		return jwt;
	}
}

export default Profile;
