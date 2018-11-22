$('.login-form').submit(function (event) {
    event.preventDefault();
    $('.login-page').hide();
    $('.home-page').show();
});

$('.btn-exit').click(function (event) {
    event.preventDefault();
    $('.home-page').hide();
    $('.login-page').show();
});

$('.search-form').submit(function (event) {
    event.preventDefault();

    var maps = [
        '1a.png',
        '1b.png',
        '2a.png',
        '3a.png',
        '3b.png'
    ];
    var mapDescriptions = [
        'se encuentra en el 4to piso',
        'se encuentra en el 4to piso',
        'se encuentra en la sala Gokú (3er piso)',
        'se encuentra en el 3er piso',
        'se encuentra en el 3er piso',
    ];

    var accessPoint = $('#myInputData').val();
    
    if (!accessPoint || accessPoint === '') {
        $('.map-description').html('No se ha encontrado');
        $('.map-img').attr('src', '')
        $('.map-container').show();
        return;
    }

    var mapDescription = '<strong>' + $('#myInput').val() + '</strong> ' + mapDescriptions[accessPoint - 1];
    $('.map-description').html(mapDescription);

    $('.map-img').attr('src', 'img/maps/' + maps[accessPoint - 1])
    $('.map-container').show();
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        var container = document.getElementsByClassName("autocomplete-list-container");
        a = document.createElement("UL");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items list-group");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);


        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].nombre.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("LI");
                b.setAttribute("class", "list-group-item");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].nombre.substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].nombre.substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' email='" + arr[i].email + "' value='" + arr[i].nombre + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    var email = this.getElementsByTagName("input")[0].getAttribute('email');
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                    $('.search-btn').removeAttr('disabled');
                    $('.clear-search-btn').show();

                    getUserLocation(email, function (accessPoint) {
                        $('#myInputData').val(accessPoint);
                    });
                });
                a.appendChild(b);
            }
            container[0].appendChild(a);
        }
    });
    $('.clear-search-btn').click(function (event) {
        $('#myInput').val('');
        $('.search-btn').attr('disabled', 'disabled');
        $('.clear-search-btn').hide();
        $('.map-container').hide();
    });
    
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

var employees = [
    { nombre: "Fabio Sarcansky", email: "usuario@virtualmind.io" },
    { nombre: "Sebasti\u00E1n Pucheta", email: "usuario1@virtualmind.io" },
    { nombre: "Micaela Raiter", email: "usuario2@virtualmind.io" },
    { nombre: "Jean Pierre Sosa", email: "usuario3@virtualmind.io" },
    { nombre: "Ezequiel Falabella", email: "usuario4@virtualmind.io" },
    { nombre: "Gustavo Serrano", email: "usuario5@virtualmind.io" }
];

function getUserLocation(email, callback) {
    $.ajax({
        url: "https://hackaton-phi.herokuapp.com/usuarioUbicado/" + email,
    }).done(function (d) {
        console.log(d);

        var accessPoint;
        if (d && d.length > 0) {
            var data = d[0];
            accessPoint = data.fk_router;
        }

        callback(accessPoint);
    });
}

autocomplete(document.getElementById("myInput"), employees);