/****************************************************************************
 * Variables définies pour intéragir avec les fichiers sur wwww.carto.com
 */
var url = "https://julien-beauverd.carto.com/api/v2/";
var requeteDeforestationTotale = "select*from%20deforestation";
var requeteDeforestation71a76 = "select*from%20deforestation%20where%20data_lev8='1971 a 1976'";
var requeteDeforestation77a87 = "select*from%20deforestation%20where%20data_lev8='1977 a 1987'";
var requeteDeforestation88a91 = "select*from%20deforestation%20where%20data_lev8='1988 a 1991'";
var requeteDeforestation92a94 = "select*from%20deforestation%20where%20data_lev8%20is%20null";
var requeteZoneProtegee = "select*from%20bresil_zone_protegee";
var requeteCarteBresil = "select*from%20carte_bresil";
var requeteFrontiereMaritime = "select*from%20frontiere_maritime";
var requeteTerrainsClassesIndigenes = "select*from%20terrain_classer_indigene";
var requeteSommeDeforestationTotale = "select%20sum(area1_real)%20from%20deforestation";
var requeteSommeDeforestationTotale71a76 = "select%20sum(area1_real)%20from%20deforestation%20where%20data_lev8='1971 a 1976'";
var requeteSommeDeforestationTotale77a87 = "select%20sum(area1_real)%20from%20deforestation%20where%20data_lev8='1977 a 1987'";
var requeteSommeDeforestationTotale88a91 = "select%20sum(area1_real)%20from%20deforestation%20where%20data_lev8='1988 a 1991'";
var requeteSommeDeforestationTotale92a94 = "select%20sum(area1_real)%20from%20deforestation%20where%20data_lev8%20is%20null";
var format = "geojson";
var apiKey = "c9219f2fee613c8bf58a861a523d8493519f5f57";

$(document).ready(function () {

    /*****************************************************************************
     * map de l'application, utilisation de OpenStreetMap et Bingmaps
     */
    var map;
    map = new ol.Map({
        view: new ol.View({
            center: [-6800000, -3200000],
            zoom: 3.4
        }),
        target: 'map'
    });

    var layerOSM = new ol.layer.Group({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        visible: false
    });

    var layerBingMaps = new ol.layer.Group({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.BingMaps({
                    key: 'AqE05oJsq-bWa50FPOW2S0eQm9Oqqygc1VTi_WPhUIoKR_-jgA559CRbfndgWAIz',
                    imagerySet: 'Road'
                })
            })
        ],
        visible: true
    });

    map.addLayer(layerBingMaps);
    map.addLayer(layerOSM);

    /****************************************************************
     * Fonction qui crée la couche
     * 
     * recoit en paramètre : 
     * le titre de la couche
     * la couleur de fond
     * la couleur de la bordure
     * l'épaisseur de la bordure
     * l'opacité de la couche
     * l'url du serveur où se situe la couche
     * la requete
     * le format
     * l'apikey
     */
    function creationCouche(title, fillColor, strokeColor, strokeWidth, opacity, url, requete, format, apiKey) {
        var couche = new ol.layer.Vector({
            title: title,
            visible: false,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: fillColor
                }),
                stroke: new ol.style.Stroke({
                    color: strokeColor,
                    width: strokeWidth
                })
            }),
            opacity: opacity,
            source: new ol.source.Vector({
                url: url + "sql?q=" + requete + "&format=" + format + "&api_key=" + apiKey,

                format: new ol.format.GeoJSON()
            })
        });
        map.addLayer(couche);
        return couche;
    }

    //création des différentes couches
    var carteBresil = creationCouche("carte Brésil", "#c4c623", "#c4c623", 1, 0.3, url, requeteCarteBresil, format, apiKey);
    var frontiereMaritime = creationCouche("frontières maritimes", "#0800ff", "#0800ff", 7, 0.7, url, requeteFrontiereMaritime, format, apiKey);
    var zoneProtegee = creationCouche("zone protégée", "#28af03", "#28af03", 1, 1, url, requeteZoneProtegee, format, apiKey);
    var terrainIndigene = creationCouche("terrains classés indigènes", "#e57309", "#e57309", 1, 1, url, requeteTerrainsClassesIndigenes, format, apiKey);
    var deforestationTotale = creationCouche("déforestation totale", "#ce1414", "#ce1414", 1, 1, url, requeteDeforestationTotale, format, apiKey);
    var deforestation71a76 = creationCouche("déforestation de 1971 à 1976", "#ce1414", "#ce1414", 1, 1, url, requeteDeforestation71a76, format, apiKey);
    var deforestation77a87 = creationCouche("déforestation de 1977 à 1987", "#ce1414", "#ce1414", 1, 1, url, requeteDeforestation77a87, format, apiKey);
    var deforestation88a91 = creationCouche("déforestation de 1988 à 1991", "#ce1414", "#ce1414", 1, 1, url, requeteDeforestation88a91, format, apiKey);
    var deforestation92a94 = creationCouche("déforestation de 1992 à 1994", "#ce1414", "#ce1414", 1, 1, url, requeteDeforestation92a94, format, apiKey);
    deforestationTotale.setVisible(true);

    $.getJSON(url + "sql?q=" + requeteSommeDeforestationTotale, function (data) {
        document.getElementById("totale").innerHTML = parseInt((data.rows[0].sum)/1000000) + " km<sup>2</sup>";
    });

    /*****************************************************************************
     * Interaction des différentes couches
     */
    var selectInteraction = new ol.interaction.Select({
        condition: ol.events.condition.singleClick,
        layers: [deforestationTotale, deforestation71a76, deforestation77a87, deforestation88a91, deforestation92a94, zoneProtegee]
    });

    map.addInteraction(selectInteraction);

    selectInteraction.on('select', function (e) {

        if (typeof e.selected[0].get("area1") === 'undefined') {

            document.getElementById("coucheInterrogee").innerHTML = "Zone protégée";
            document.getElementById("aire").innerHTML = "Aire de la zone : " + parseInt(e.selected[0].get("gis_area")) + " km<sup>2</sup>";
            document.getElementById("perimetre").innerHTML = "";
            document.getElementById("date").innerHTML = "";
            document.getElementById("name").innerHTML = "Nom de la zone : " + e.selected[0].get("name");

        }
        else {

            document.getElementById("coucheInterrogee").innerHTML = "Zone déforestée";
            document.getElementById("aire").innerHTML = "Aire de la zone : " + parseInt(e.selected[0].get("area1") / 1000000) + " km<sup>2</sup>";
            document.getElementById("perimetre").innerHTML = "Périmètre de la zone : " + parseInt(e.selected[0].get("perimete2") / 1000) + " km";
            document.getElementById("name").innerHTML = "";
            document.getElementById("date").innerHTML = "Période de la déforestation : " + e.selected[0].get("data_lev8");

        }
    });

    /******************************************************************************
     * switch permettant d'affichant les différentes cartes
     */
    $('#zoneProtegee').click(function () {
        zoneProtegee.setVisible(!zoneProtegee.getVisible());
    });

    $('#zoneDeforestee').click(function () {
        if (deforestationTotale.getVisible() == true
            || deforestation71a76.getVisible() == true
            || deforestation77a87.getVisible() == true
            || deforestation88a91.getVisible() == true
            || deforestation92a94.getVisible() == true) {
            deforestationTotale.setVisible(false);
            deforestation71a76.setVisible(false);
            deforestation77a87.setVisible(false);
            deforestation88a91.setVisible(false);
            deforestation92a94.setVisible(false);
        }
        else {
            deforestationTotale.setVisible(true);
            deforestation71a76.setVisible(true);
            deforestation77a87.setVisible(true);
            deforestation88a91.setVisible(true);
            deforestation92a94.setVisible(true);
        }

    });

    $('#carteBresil').click(function () {
        carteBresil.setVisible(!carteBresil.getVisible());
    });

    $('#frontiereMaritime').click(function () {
        frontiereMaritime.setVisible(!frontiereMaritime.getVisible());
    });

    $('#terrainIndigene').click(function () {
        terrainIndigene.setVisible(!terrainIndigene.getVisible());
    });

    $("#changementMap").click(function () {

        if ($(this).hasClass("btn-light")) {

            layerOSM.setVisible(!layerOSM.getVisible());
            layerBingMaps.setVisible(!layerBingMaps.getVisible());
            $(this).removeClass("btn-light");
            $(this).addClass("btn-dark");
        } else {

            layerOSM.setVisible(!layerOSM.getVisible());
            layerBingMaps.setVisible(!layerBingMaps.getVisible());
            $(this).removeClass("btn-dark");
            $(this).addClass("btn-light");
        };
    });

    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");

    switch (output.innerHTML) {
        case "1":
            output.innerHTML = "de 1971 à 1976";
            break;
        case "2":
            output.innerHTML = "de 1977 à 1987";
            break;
        case "3":
            output.innerHTML = "de 1988 à 1991";
            break;
        case "4":
            output.innerHTML = "de 1992 à 1994";
            break;
        default:
            output.innerHTML = "";
    }

    slider.oninput = function () {

        annee = this.value;
        switch (annee) {
            case "1":
                annee = "de 1971 à 1976";
                deforestationTotale.setVisible(false);
                deforestation71a76.setVisible(true);
                deforestation77a87.setVisible(false);
                deforestation88a91.setVisible(false);
                deforestation92a94.setVisible(false);
                $("#zoneDeforestee").removeClass("btn-secondary");
                $("#zoneDeforestee").addClass("btn-danger");
                $.getJSON(url + "sql?q=" + requeteSommeDeforestationTotale71a76, function (data) {
                    document.getElementById("totale").innerHTML = parseInt((data.rows[0].sum)/1000000) + " km<sup>2</sup>";
                });
                break;
            case "2":
                annee = "de 1977 à 1987";
                deforestationTotale.setVisible(false);
                deforestation71a76.setVisible(false);
                deforestation77a87.setVisible(true);
                deforestation88a91.setVisible(false);
                deforestation92a94.setVisible(false);
                $("#zoneDeforestee").removeClass("btn-secondary");
                $("#zoneDeforestee").addClass("btn-danger");
                $.getJSON(url + "sql?q=" + requeteSommeDeforestationTotale77a87, function (data) {
                    document.getElementById("totale").innerHTML = parseInt((data.rows[0].sum)/1000000) + " km<sup>2</sup>";
                });
                break;
            case "3":
                annee = "de 1988 à 1991";
                deforestationTotale.setVisible(false);
                deforestation71a76.setVisible(false);
                deforestation77a87.setVisible(false);
                deforestation88a91.setVisible(true);
                deforestation92a94.setVisible(false);
                $("#zoneDeforestee").removeClass("btn-secondary");
                $("#zoneDeforestee").addClass("btn-danger");
                $.getJSON(url + "sql?q=" + requeteSommeDeforestationTotale88a91, function (data) {
                    document.getElementById("totale").innerHTML = parseInt((data.rows[0].sum)/1000000) + " km<sup>2</sup>";
                });
                break;
            case "4":
                annee = "de 1992 à 1994";
                deforestationTotale.setVisible(false);
                deforestation71a76.setVisible(false);
                deforestation77a87.setVisible(false);
                deforestation88a91.setVisible(false);
                deforestation92a94.setVisible(true);
                $("#zoneDeforestee").removeClass("btn-secondary");
                $("#zoneDeforestee").addClass("btn-danger");
                $.getJSON(url + "sql?q=" + requeteSommeDeforestationTotale92a94, function (data) {
                    document.getElementById("totale").innerHTML = parseInt((data.rows[0].sum)/1000000) + " km<sup>2</sup>";
                });
                break;
            default:
                annee = "";
                deforestationTotale.setVisible(true);
                deforestation71a76.setVisible(false);
                deforestation77a87.setVisible(false);
                deforestation88a91.setVisible(false);
                deforestation92a94.setVisible(false);
                $("#zoneDeforestee").removeClass("btn-secondary");
                $("#zoneDeforestee").addClass("btn-danger");
                $.getJSON(url + "sql?q=" + requeteSommeDeforestationTotale, function (data) {
                    document.getElementById("totale").innerHTML = parseInt((data.rows[0].sum)/1000000) + " km<sup>2</sup>";
                });
        }
        output.innerHTML = annee;
    }

    /***************************************
     * Changement de classes des boutons pour 
     * montrer si la couche est présente ou non
     */

    $("#zoneProtegee").click(function () {
        if ($(this).hasClass("btn-success")) {
            $(this).removeClass("btn-success");
            $(this).addClass("btn-secondary");
        } else {
            $(this).removeClass("btn-secondary");
            $(this).addClass("btn-success");
        };
    });

    $("#zoneDeforestee").click(function () {
        if ($(this).hasClass("btn-danger")) {
            $(this).removeClass("btn-danger");
            $(this).addClass("btn-secondary");
        } else {
            $(this).removeClass("btn-secondary");
            $(this).addClass("btn-danger");
        };
    });

    $("#totalZoneDeforestee").click(function () {
        if ($(this).hasClass("btn-danger")) {
            $(this).removeClass("btn-danger");
            $(this).addClass("btn-secondary");
        } else {
            $(this).removeClass("btn-secondary");
            $(this).addClass("btn-danger");
        };
    });

    $("#carteBresil").click(function () {
        if ($(this).hasClass("btn-info")) {
            $(this).removeClass("btn-info");
            $(this).addClass("btn-secondary");
        } else {
            $(this).removeClass("btn-secondary");
            $(this).addClass("btn-info");
        };
    });

    $("#frontiereMaritime").click(function () {
        if ($(this).hasClass("btn-primary")) {
            $(this).removeClass("btn-primary");
            $(this).addClass("btn-secondary");
        } else {
            $(this).removeClass("btn-secondary");
            $(this).addClass("btn-primary");
        };
    });

    $("#terrainIndigene").click(function () {
        if ($(this).hasClass("btn-warning")) {
            $(this).removeClass("btn-warning");
            $(this).addClass("btn-secondary");
        } else {
            $(this).removeClass("btn-secondary");
            $(this).addClass("btn-warning");
        };
    });
});
