var deepEqual = require('deep-equal');

function filterUnique(list, predicate) {
	list = list || [];
	predicate = predicate || (function(x) { return x; });

	return list.reduce(function(result, item) {
		const exists = result.some(function(x) {
			return deepEqual(predicate(x), predicate(item));
		});
		
		if (!exists) {
			result.push(item);
		}

		return result;
	}, []);
}

module.exports = filterUnique;