<?php
	require 'Macaw.php';
	use \NoahBuscher\Macaw\Macaw;

	header('Access-Control-Allow-Origin: http://localhost:8888');
	header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Accept, X-Requested-With, Content-Type');
	header('Access-Control-Allow-Credentials: true');
	header('HTTP/1.1 200 OK', true);


	Macaw::get('/categories/', function() {
		require_once('db.php');

		$query = "SELECT * FROM categories ORDER BY id ASC";

		if ($result = $mysqli->query($query)) {
		    $arResult = array();

		    while ($row = $result->fetch_assoc()) {
		        array_push($arResult, $row);
		    }

		    echo json_encode($arResult, JSON_UNESCAPED_UNICODE);

		    $result->free_result();
		}
	});


	Macaw::get('/resources/', function() {
		require_once('db.php');

		$query = "SELECT * FROM resources ORDER BY resId ASC";

		if ($result = $mysqli->query($query)) {
		    $arResult = array();

		    while ($row = $result->fetch_assoc()) {
		        array_push($arResult, $row);
		    }

		    echo json_encode($arResult, JSON_UNESCAPED_UNICODE);

		    $result->free_result();
		}

		$mysqli->close();
	});

	Macaw::get('/resources/(:any)/', function($catId) {
		require_once('db.php');

		$query = "SELECT * FROM resources WHERE catId = '$catId' ORDER BY resId ASC";

		if ($result = $mysqli->query($query)) {
		    $arResult = array();

		    while ($row = $result->fetch_assoc()) {
		        array_push($arResult, $row);
		    }

		    echo json_encode($arResult, JSON_UNESCAPED_UNICODE);

		    $result->free_result();
		}

		$mysqli->close();
	});

	Macaw::post('/categories', function() {
		require_once('db.php');

		header("Content-type: text/txt; charset=UTF-8");
		$data = json_decode(file_get_contents("php://input"));

		$id = $data->id;
		$MAX_VALUE = $data->MAX_VALUE;

		$query = "UPDATE categories 
			SET MAX_VALUE = '$MAX_VALUE' WHERE id='$id'";

			$result = $mysqli->query($query);

			if (!$result) {
				die($mysqli->error);
			}

			echo json_encode($data, JSON_UNESCAPED_UNICODE);

			$mysqli->close();
	});


	Macaw::options('/resources/(:any)', function($resId) {
		require_once('db.php');

		$query = "DELETE FROM resources WHERE resId = '$resId'";

		if ($result = $mysqli->query($query)) {
			echo "query is ok";
		} else {
			echo "error";
		}

		$mysqli->close();
	});

	Macaw::post('/resources', function() {
		require_once('db.php');
		header("Content-type: text/txt; charset=UTF-8");

		$data = json_decode(file_get_contents("php://input"));

		$catId = $data->catId;
		$name = $data->name;
		$PRICE = $data->PRICE;
		

		$query = "INSERT INTO resources (catId, name, PRICE)
		VALUES ('$catId', '$name', '$PRICE')";


		if ($result = $mysqli->query($query)) {
		    echo json_encode($data, JSON_UNESCAPED_UNICODE);
		} else {
			echo "error";
		}

		$mysqli->close();
	});


	Macaw::get('/default/', function() {
		require_once('db.php');

		$query = "SELECT * FROM defaultcosts ORDER BY id ASC";

		if ($result = $mysqli->query($query)) {
		    $arResult = array();

		    while ($row = $result->fetch_assoc()) {
		        array_push($arResult, $row);
		    }

		    echo json_encode($arResult, JSON_UNESCAPED_UNICODE);

		    $result->free_result();
		} else {
			echo "error";
		}

		$mysqli->close();
	});


	Macaw::post('/default', function() {
		require_once('db.php');

		header("Content-type: text/txt; charset=UTF-8");
		$data = json_decode(file_get_contents("php://input"));

		$DEFAULT_VALUE = $data->DEFAULT_VALUE;

		$query = "UPDATE defaultcosts 
			SET DEFAULT_VALUE = '$DEFAULT_VALUE' WHERE id = 1";

			$result = $mysqli->query($query);

			if (!$result) {
				die($mysqli->error);
			}

			echo json_encode($data, JSON_UNESCAPED_UNICODE);

			$mysqli->close();
	});


	Macaw::dispatch();
?>