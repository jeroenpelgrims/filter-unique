const filterUnique = require('.');

describe('Edge cases', () => {
	test('No parameters returns empty array', () => {
		expect(filterUnique()).toEqual([]);
	});

	test('Null as list returns empty array', () => {
		expect(filterUnique(null)).toEqual([]);
	});
});

describe('Primitive values', () => {
	describe('integers', () => {
		const data = [1, 2, 3, 1, 2];

		test('without predicate', () => {
			expect(filterUnique(data)).toEqual([1, 2, 3]);
		});

		test('with identity property getter', () => {
			expect(filterUnique([1, 2, 3, 1, 2], x => x)).toEqual([1, 2, 3]);
		});
	});

	describe('strings', () => {
		const data = ["a", "b", "c", "a", "b"];

		test('strings', () => {
			expect(filterUnique(data)).toEqual(["a", "b", "c"]);
		});
	});
});

describe('Object values', () => {
	describe('simple', () => {
		const objects = [
			{ birthDate: "2000-01-01", name: "Foo" },
			{ birthDate: "2000-02-02", name: "Bar" },
			{ birthDate: "2000-01-01", name: "Baz" },
			{ birthDate: "2000-02-02", name: "Qux" }
		];

		test('no predicate', () => {
			const results = filterUnique(objects);
			expect(results).toEqual(objects);
		});

		test('with predicate', () => {
			const results = filterUnique(objects, x => x.birthDate);
			expect(results).toEqual([
				objects[0],
				objects[1]
			]);
		});
	});

	describe('nested', () => {
		const objects = [
			{ birthDate: "2000-01-01", name: { first: "Foo", last: "A" } },
			{ birthDate: "2000-02-02", name: { first: "Bar", last: "B" } },
			{ birthDate: "2000-03-03", name: { first: "Baz", last: "B" } },
			{ birthDate: "2000-04-04", name: { first: "Qux", last: "B" } },
			{ birthDate: "2000-04-04", name: { first: "Quux", last: "C" } },
			{ birthDate: "2000-04-04", name: { first: "Quux", last: "C" } }
		];

		test('with predicate', () => {
			const results = filterUnique(objects, x => x.name.last);
			expect(results).toEqual([
				objects[0],
				objects[1],
				objects[4]
			]);
		});

		test('with object as predicate key', () => {
			const results = filterUnique(objects, x => x.name);
			expect(results).toEqual(objects.slice(0, 5));
		})
	});
});