export default function(dispatch, action) {
	dispatch("services/loading/pushLoading", {}, { root: true });
	const p = action();
	const popLoading = () =>
		dispatch("services/loading/popLoading", {}, { root: true });
	p.then(popLoading);
	p.catch(popLoading);
	return p;
}
