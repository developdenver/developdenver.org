import Model from "./model";
const apiUrl = process.env.VUE_APP_API_URL;

class ScheduleListing extends Model {
	constructor(scheduleListing) {
		super("schedule-listing", scheduleListing);
	}
}

export default ScheduleListing;
