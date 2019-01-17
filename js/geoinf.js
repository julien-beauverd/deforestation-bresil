/****************************************************************************
 * Variables définies pour intéragir avec les fichiers sur wwww.carto.com
 */
var url = "https://julien-beauverd.carto.com/api/v2/";
var requeteDeforestation = "select*from%20deforestation";
var requeteZoneProtegee = "select*from%20bresil_zone_protegee";
var requeteCarteBresil = "select*from%20carte_bresil";
var requeteFrontiereMaritime = "select*from%20frontiere_maritime";
var requeteTerrainsClassesIndigenes = "select*from%20terrain_classer_indigene";
var format = "geojson";
var apiKey = "c9219f2fee613c8bf58a861a523d8493519f5f57";

$(document).ready(function () {

    /*****************************************************************************
     * map de l'application, utilisation de OpenStreetMap
     */
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

    /****************************************************************
     * Fonction qui crée la coueh
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
    var deforestation = creationCouche("déforestation", "#ce1414", "#ce1414", 1, 1, url, requeteDeforestation, format, apiKey);

    /*****************************************************************************
     * Interaction des différentes couches
     */
    var selectInteraction = new ol.interaction.Select({
        condition: ol.events.condition.singleClick,
        // the interactive layers on which the selection is possible (they may be more than one)
        layers: [deforestation, zoneProtegee]
    });
    map.addInteraction(selectInteraction);

    // add a listener to fire when one or more feature from the interactive layer(s) is(are) selected
    selectInteraction.on('select', function (e) {
        if (e.selected.length > 0) {
            var title = e.selected[0].get("cartodb_id");
            $("#info").html(title);
        }
    });

    /******************************************************************************
     * switch permettant d'affichant les différentes cartes
     */
    $('#zoneProtegee').click(function () {
        zoneProtegee.setVisible(!zoneProtegee.getVisible());
    });

    $('#zoneDeforestee').click(function () {
        deforestation.setVisible(!deforestation.getVisible());
    });

    $('#totalZoneDeforestee').click(function () {
        deforestation.setVisible(!deforestation.getVisible());
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
