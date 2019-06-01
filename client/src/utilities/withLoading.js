export default function(dispatch, action) {
	dispatch("services/loading/pushLoading", {}, { root: true });
	const p = action();
	if (!p.then) {
		throw new Error('action did not return a promise');
	}
	const popLoading = () =>
		dispatch("services/loading/popLoading", {}, { root: true });
	p.then(popLoading);
	p.catch(popLoading);
	return p;
}
