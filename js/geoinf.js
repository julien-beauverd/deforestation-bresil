var url = "https://julien-beauverd.carto.com/api/v2/";
var requeteDefAll = "select*from%20desm76";
var requeteDef71a76 = "";
var requeteDef7787 = "";
var requeteDef88a91 = "";
var requeteDef92a00 = "";
var requeteZone = "select*from%20bresil_zone_protected_simplifier";
var format = "geojson";
var apiKey = "c9219f2fee613c8bf58a861a523d8493519f5f57";

$(document).ready(function () {
    var map;
    map = new ol.Map({
        view: new ol.View({
            center: [-6800000, -3200000],
            zoom: 3.4
        }),
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ]
    });
    
    var zoneProtected = new ol.layer.Vector({
        title: 'zone protégée',
        visible: true,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#28af03'
            }),
            stroke: new ol.style.Stroke({
                color: '#28af03',
                width: 1
            })
        }),
        source: new ol.source.Vector({
            url: url + "sql?q=" + requeteZone + "&format=" + format + "&api_key=" + apiKey,
            format: new ol.format.GeoJSON()
        })
    });
    map.addLayer(zoneProtected);
    
    var desm76 = new ol.layer.Vector({
        title: 'deforestation',
        visible: true,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#ce1414'
            }),
            stroke: new ol.style.Stroke({
                color: '#ce1414',
                width: 1
            })
        }),
        source: new ol.source.Vector({
            url: url + "sql?q=" + requeteDefAll + "&format=" + format + "&api_key=" + apiKey,
            format: new ol.format.GeoJSON()
        })
    });
    map.addLayer(desm76);
});
