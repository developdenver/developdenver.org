export default function updateInList(lst, where, update) {
	return lst.map(val => (where(val) ? update(val) : val));
}
