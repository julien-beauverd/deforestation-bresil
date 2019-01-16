/***************************************************
 * Definition of global JS application parameters
 **************************************************/

/*
 * With the Boundless GeoServer you can play with layers:
 * - ne_10m_admin_0_countries
 * - ne_10m_lakes
 * - etc (see http://demo.boundlessgeo.com/geoserver/wms?REQUEST=GetCapabilities)
 */
var blWMS = "http://demo.boundlessgeo.com/geoserver/wms";

/*
 * With the MapCentia MapServer you can play with layers:
 * - public.world_simple
 * - public.cities
 * - public.cantonsch_region
 * - etc (see https://eu1.mapcentia.com/wms/oertz/public?service=WMS&request=GetCapabilities)
 */
var mcWMS = "https://eu1.mapcentia.com/wms/oertz/public";
var mcWFS = "https://eu1.mapcentia.com/wfs/oertz/public/4326";

/* With the new MapCentia "GeoCloud2" you can play with layers:
 * - public.world_simple
 * - public.cities
 * (the OWS services does include WMS up to 1.3 and WFS up to 2.0 see
 *  http://gc2.mapcentia.com/ows/oertz/public?service=WMS&request=GetCapabilities
 *  http://gc2.mapcentia.com/ows/oertz/public?service=WFS&request=GetCapabilities)
 */
var gcOWS = "http://gc2.mapcentia.com/ows/oertz/public";

/*
 * With G2C GeoServer you can play with layers (only from the school network, or by VPN):
 * - worldadm
 * - cities
 * - etc (see http://geoteach.heig-vd.ch:8080/geoserver/geoinfo/wms?service=WMS&version=1.1.0&request=GetCapabilities)
 */
var myOWS = "http://geoteach.heig-vd.ch:8080/geoserver/geoinfo/wms";

/*
 * With the Swisstopo MapServer you can play with layers:
 * - ch.swisstopo.swissboundaries3d-kanton-flaeche.fill
 * - ch.swisstopo.swissboundaries3d-gemeinde-flaeche.fill
 * - etc (see http://wms.geo.admin.ch/?REQUEST=GetCapabilities&SERVICE=WMS&VERSION=1.0.0&lang=fr)
 */
var chWMS = "https://wms.geo.admin.ch";

/*
 * With the UNEP GRID GeoServer you can play with layers
 * (see the Global Risk Data Platform map at http://preview.grid.unep.ch/index.php?preview=map):
 * - World
 * - NationalParks
 * - Cities_esri
 * - etc (see http://preview.grid.unep.ch/geoserver/wms?REQUEST=GetCapabilities)
 */
var unWMS = "http://preview.grid.unep.ch:8080/geoserver/preview/wms";
var unWFS = "http://preview.grid.unep.ch/geoserver/wfs";

/*
 * Insertion of <script> and <stylesheet> elements to load required libraries :
 *
 * @requires lib/ol3.20.1/build/ol.js
 * @requires lib/jquery-2.1.4.min.js
 *
 */
stylesheetTag = '<link rel="stylesheet" href="http://openlayers.org/en/v3.20.1/css/ol.css" type="text/css">'
document.write(stylesheetTag);

scriptTag = '<script src="http://openlayers.org/en/v3.20.1/build/ol-debug.js" type="text/javascript"></script>';
document.write(scriptTag);

scriptTag = '<script src="https://code.jquery.com/jquery-2.1.4.min.js" type="text/javascript"></script>';
document.write(scriptTag);

/*
 * May be some useful functions
 */
function showExtent(bbox) {
    vectors = new ol.layer.Vector({ source: new ol.source.Vector() });
    map.addLayer(vectors);
    vectors.getSource().addFeatures([new ol.Feature({ geometry: new ol.geom.Polygon.fromExtent(bbox) })]);
}



window.onload = function () {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");

    switch (output.innerHTML) {
        case "1":
            output.innerHTML = "1971 à 1976";
            break;
        case "2":
        output.innerHTML = "1977 à 1987";
            break;
        case "3":
        output.innerHTML = "1988 à 1991";
            break;
        default:
        output.innerHTML = "1992 à 2000";
    }

    slider.oninput = function () {
        annee = this.value;
        switch (annee) {
            case "1":
                annee = "1971 à 1976";
                break;
            case "2":
                annee = "1977 à 1987";
                break;
            case "3":
                annee = "1988 à 1991";
                break;
            default:
                annee = "1992 à 2000";
        }
        output.innerHTML = annee;
    }
};

