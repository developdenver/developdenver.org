import Model from "./model";
const apiUrl = process.env.VUE_APP_API_URL;

class Event extends Model {
	constructor(event) {
		super("event", event);
	}
	static async fetchEvents(token) {
		const url = `${apiUrl}/events`;
		const data = await fetch(url, {
			method: "GET",
		}).then(response => response.json())
			.catch(error => console.error(error.message));
		return data;
	}
}

export default Event;
