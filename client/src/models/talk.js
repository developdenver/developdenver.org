import Model from "./model";

class Talk extends Model {
	constructor(talk) {
		super("talk", talk);
	}
	async vote() {
		const url = this.buildUrl(this.modelName, this.id);
		const data = await fetch(url, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
			body: this.serialize(),
		}).then(response => response.json())
			.catch(error => console.error(error.message));
		return data;
	}
	async unvote() {
		const url = this.buildUrl(this.modelName, this.id);
		const data = await fetch(url, {
			method: "DELETE",
		}).then(response => response.json())
			.catch(error => console.error(error.message));
		return data;
	}
}

export default Talk;
