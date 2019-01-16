$(document).ready(function () {
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
});

