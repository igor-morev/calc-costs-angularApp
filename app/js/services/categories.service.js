angular
    .module('costs')
    .service('categories', categories);

function categories() {
	var obj = {
		categories: [
			{
				"id": 1,
				"name": "Питание",
				"CURRENT_VALUE": 0,
				"MAX_VALUE": 0
			},
			{
				"id": 2,
				"name": "Транспорт",
				"CURRENT_VALUE": 0,
				"MAX_VALUE": 0
			},
			{
				"id": 3,
				"name": "Проживание",
				"CURRENT_VALUE": 0,
				"MAX_VALUE": 0
			},
			{
				"id": 4,
				"name": "Развлечения",
				"CURRENT_VALUE": 0,
				"MAX_VALUE": 0
			}
		]
	}

	var defaultObj = {
		defaultCosts: [
			{
				"userId": 1,
				"id": 1,
				"CURRENT_VALUE": 0,
				"DEFAULT_VALUE": 35000
			}
		]
	}

	return [obj, defaultObj];
}