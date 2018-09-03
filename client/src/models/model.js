import { serialize } from "./serializer";
import { deserialize } from "./deserializer";
import { buildUrl, buildRequest } from "./adapter";

const responseJSONError = response => response
	.clone()
	.json()
	.catch(() => response.text())
	.then(result => {
		if (response.ok) {
			return result;
		}
		throw new Error(result.error || result);
	});

const fetchJSON = url => fetch(url).then(responseJSONError);

class Model {
	constructor(modelName, item) {
		this.serialize = serialize.bind(this);
		this.deserialize = deserialize;
		this.buildUrl = buildUrl;
		this.buildRequest = buildRequest;
		this.modelName = modelName;
		this.properties = this.normalize(item);
		this.id = this.properties.id;
	}
	normalize(unNormalizedData) {
		return this.deserialize(unNormalizedData);
	}
	static fetchAll(modelName) {
		const url = buildUrl(modelName);
		return fetchJSON(url)
			.then(({ data }) => data.map(deserialize))
			.catch(error => console.error(error.message));
	}
	async fetch() {
		const url = this.buildUrl(this.modelName, this.id);
		try {
			const newData = await fetchJSON(url)
				.then(response => response.data);
			this.properties = this.normalize(newData);
			return true;
		} catch (error) {
			console.error(error.message);
			return false;
		}
	}
	async create(token) {
		const url = this.buildUrl(this.modelName, this.id);
		try {
			const { data } = await fetch(url, {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": token ? `Bearer ${token}` : undefined
				},
				body: this.serialize(),
			}).then(responseJSONError);
			this.properties = this.normalize(data);
			return true;
		} catch (error) {
			console.error(error.message);
			return false;
		}
	}
	async update(token) {
		const url = this.buildUrl(this.modelName, this.id);
		try {
			const { data } = await fetch(url, {
				method: "PUT",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": token ? `Bearer ${token}` : undefined
				},
				body: this.serialize(),
			}).then(responseJSONError);
			this.properties = this.normalize(data);
			return true;
		} catch (error) {
			console.error(error.message);
			return false;
		}
	}
	async destroy(token) {
		try {
			await fetch(this.buildUrl(this.modelName, this.id), {
				method: "DELETE",
				headers: {
					"Authorization": token ? `Bearer ${token}` : undefined
				}
			}).then(responseJSONError)
				.then(response => response.data);
			this.properties = null;
			return true;
		} catch (error) {
			console.error(error.message);
			return false;
		}
	}
}

export default Model;
