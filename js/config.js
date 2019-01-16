/***************************************************
 * Definition of global JS application parameters
 **************************************************/

/*
 * Insertion of <script> and <stylesheet> elements to load required libraries :
 *
 * @requires lib/ol3.20.1/build/ol.js
 * @requires lib/jquery-2.1.4.min.js
 *
 */
stylesheetTag = '<link rel="stylesheet" href="https://openlayers.org/en/v3.20.1/css/ol.css" type="text/css">'
document.write(stylesheetTag);

scriptTag = '<script src="https://openlayers.org/en/v3.20.1/build/ol-debug.js" type="text/javascript"></script>';
document.write(scriptTag);

scriptTag = '<script src="https://code.jquery.com/jquery-2.1.4.min.js" type="text/javascript"></script>';
document.write(scriptTag);


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

