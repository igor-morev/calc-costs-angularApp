angular
    .module('costs')
    .service('resources', resources);


function resources() {
	var obj = {
		resources: [
			{
				"id": 1,
				"catId": 1,
				"name": "Сникерс",
				"PRICE": 40,
			},
			{
				"id": 2,
				"catId": 1,
				"name": "Продукты",
				"PRICE": 2000,
			},
			{
				"id": 3,
				"catId": 1,
				"name": "Сок",
				"PRICE": 1300,
			},
			{
				"id": 4,
				"catId": 4,
				"name": "Бар",
				"PRICE": 1500,
			},
			{
				"id": 5,
				"catId": 4,
				"name": "Кино",
				"PRICE": 500,
			}
		]
	}

	return obj;
}