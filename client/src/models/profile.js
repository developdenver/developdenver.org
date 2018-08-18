import Model from "./model";

class Profile extends Model {
	constructor(profile) {
		super("profile", profile);
	}
	setTicketLevel(level) {
		this.properties.ticketLevel = level;
	}
}

export default Profile;
