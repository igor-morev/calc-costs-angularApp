<?php
	require 'Macaw.php';
	use \NoahBuscher\Macaw\Macaw;

	class Categories {
		public static function getCategories($mysqli) {
			$query = "SELECT * FROM categories ORDER BY id ASC";

			if ($result = $mysqli->query($query)) {
			    $arResult = array();

			    while ($row = $result->fetch_assoc()) {
			        array_push($arResult, $row);
			    }

			    return json_encode($arResult, JSON_UNESCAPED_UNICODE);

			    $result->free_result();
			}

			$mysqli->close();
		}
	}

	class Resources {
		public static function getResources($mysqli) {
			$query = "SELECT * FROM resources ORDER BY resId ASC";

			if ($result = $mysqli->query($query)) {
			    $arResult = array();

			    while ($row = $result->fetch_assoc()) {
			        array_push($arResult, $row);
			    }

			    return json_encode($arResult, JSON_UNESCAPED_UNICODE);

			    $result->free_result();
			}

			$mysqli->close();
		}
	}

	class DefaultCosts {
		public static function getDefault($mysqli) {
			$query = "SELECT * FROM defaultcosts ORDER BY id ASC";

			if ($result = $mysqli->query($query)) {
			    $arResult = array();

			    while ($row = $result->fetch_assoc()) {
			        array_push($arResult, $row);
			    }

			    return json_encode($arResult, JSON_UNESCAPED_UNICODE);

			    $result->free_result();
			}

			$mysqli->close();
		}
	}

	Macaw::get('/categories', function() {
		require_once('db.php');
		echo Categories::getCategories($mysqli);
	});

	Macaw::get('/resources', function() {
		require_once('db.php');
		echo Resources::getResources($mysqli);
	});


	Macaw::get('/options', function() {
		require_once('db.php');
		echo DefaultCosts::getDefault($mysqli);
	});


	Macaw::dispatch();
?>