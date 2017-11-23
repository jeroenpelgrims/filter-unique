# filter-unique

When you need a Set but want to specify which keys should be used to determine "uniqueness".

## examples
```
const filterUnique = require('filter-unique');
const people = [
	{ birthDate: "2000-01-01", name: { first: "A", last: "A" } },
	{ birthDate: "2000-01-02", name: { first: "A", last: "A" } },
	{ birthDate: "2000-01-03", name: { first: "B", last: "B" } },
	{ birthDate: "2000-01-04", name: { first: "C", last: "B" } }
];

// We only want the people with unique last names
let result = filterUnique(objects, x => x.name.last);
/*
[
	{ birthDate: "2000-01-01", name: { first: "A", last: "A" } },
	{ birthDate: "2000-01-03", name: { first: "B", last: "B" } }
]
*/

// We only want the people with unique names
// (so we're using an object as the comparison key)
let result = filterUnique(objects, x => x.name);
/*
[
	{ birthDate: "2000-01-01", name: { first: "A", last: "A" } },
	{ birthDate: "2000-01-03", name: { first: "B", last: "B" } },
	{ birthDate: "2000-01-04", name: { first: "C", last: "B" } }
]
*/
```