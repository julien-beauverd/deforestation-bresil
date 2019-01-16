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
    var desm76 = new ol.layer.Vector({
        title: 'deforestation',
        visible: true,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: [255, 255, 255, 0]
            }),
            stroke: new ol.style.Stroke({
                color: '#ce1414',
                width: 2
            })
        }),
        source: new ol.source.Vector({
            url: "https://julien-beauverd.carto.com/api/v2/sql?q=select*from%20desm76&format=geojson&api_key=c9219f2fee613c8bf58a861a523d8493519f5f57",
            format: new ol.format.GeoJSON()
        })
    });
    map.addLayer(desm76);
});
