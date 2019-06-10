import deepEqual from 'deep-equal';

export default function filterUnique<T>(
	list?: T[],
	predicate?: (item: T) => any
) {
	list = list || [];
	const _predicate = predicate || (function (x: T) { return x; });

	return list.reduce((result, item) => {
		const exists = result.some(x => {
			return deepEqual(_predicate(x), _predicate(item));
		});

		return exists
			? result
			: [...result, item];
	}, [] as T[]);
}