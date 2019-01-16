<?php
require_once 'GeoManager.php';

$XY = $_GET["x"] . " " . $_GET["y"];

$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$api_key = "2e957be5f1e9c0793ca1725aab08274a795f2c3f";
$q = "SELECT name, ST_AsGeoJSON(the_geom) AS geom FROM world_simple"
        . " WHERE ST_Intersects(the_geom, ST_GeomFromText('POINT(" . $XY . ")', 4326))";

$url = "http://oertz.cartodb.com/api/v2/sql?api_key=" . $api_key. "&q=" . urlencode($q);
curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);
$rows = json_decode($result)->rows;

header("Content-type: application/json");

$i = 0;
$fc = new FeatureCollection();
foreach ($rows as $row) {
    $fc->addFeature(new Feature($i++, json_decode($row->geom), array("name" => $row->name)));
}

echo json_encode($fc);
?>