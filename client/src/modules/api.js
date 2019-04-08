const apiUrl = process.env.VUE_APP_API_URL;

export async function request(...args) {
	const req = await fetch(...args);
	const body = await req.json();
	if (req.ok) return body;
	throw body.error || body;
}

export function listTickets(token) {
	return request(`${apiUrl}/tickets`, {
		headers: { authorization: `Bearer ${token}` },
	});
}

export function remindUnclaimedTicket(token, ticketId) {
	return request(`${apiUrl}/tickets/${ticketId}/remind`, {
		headers: { authorization: `Bearer ${token}` },
		method: 'post',
	});
}

export function revokeUnclaimedTicket(token, ticketId) {
	return request(`${apiUrl}/tickets/${ticketId}/revoke`, {
		headers: { authorization: `Bearer ${token}` },
		method: 'post',
	});
}

export function shareUnclaimedTicket(token, ticketId, email) {
	return request(`${apiUrl}/tickets/${ticketId}/share`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		method: 'post',
		body: JSON.stringify({ email }),
	});
}

export function ticketInfoFromClaim(claimToken) {
	return request(`${apiUrl}/tickets/${claimToken}/info`);
}

export function claimTicket(token, claimToken) {
	return request(`${apiUrl}/tickets/${claimToken}/claim`, {
		headers: { authorization: `Bearer ${token}` },
		method: 'post',
	});
}
