function createTable(id, total) {

    var parentDiv = $('.' + id);
    var table = document.createElement('table');
    $(table).attr('id', id);
    var p = document.createElement('p');
    $(p).attr('id', total).text('Hits: 0');

    for (var i = 0; i < 10; i++) {
        var tr = document.createElement('tr');

        for (var j = 0; j < 10; j++) {

            var td = document.createElement('td');
            var div = document.createElement('div');
            $(div).addClass('shipCol');
            tr.appendChild(td);
            td.appendChild(div);
        }

        table.appendChild(tr);
    }

    var append = [table, p];
    $(parentDiv).html(append);

    for (var m = 0; m <= 100; m++) {
        var shipCol = $('#' + id + ' .shipCol');
        $(shipCol[m]).attr('id', m + 1);
    }

}

function random() {
    return Math.floor(Math.random() * 100) + 1;
};

var allTens = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
var allJs = [91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

function drawShips(tableId) {

    var usedPoints = [];

    function horizontal() {
        return Math.floor(Math.random() * 2) + 1;
    }

    function buildShip(randomNr, colCount) {

        var points = [];

        for (var j = 0; j <= colCount; j++) {
            points.push(randomNr++);
        }

        for (var j in points) {

            if (points.length == 1) {
                var checkused = usedPoints.indexOf(points[j]);
                if (checkused !== -1) {
                    points.length = 0;
                    buildShip(random(), colCount);
                }
            } else if (points.length == 2) {
                var checkserv = allTens.indexOf(points[0]);
                var checkused = usedPoints.indexOf(points[j]);
                if (checkserv !== -1 || checkused !== -1) {
                    points.length = 0;
                    buildShip(random(), colCount);
                }
            } else if (points.length == 3) {
                var checkserv1 = allTens.indexOf(points[0]);
                var checkserv2 = allTens.indexOf(points[1]);
                var checkused = usedPoints.indexOf(points[j]);
                if (checkserv1 !== -1 || checkused !== -1 || checkserv2 !== -1) {
                    points.length = 0;
                    buildShip(random(), colCount);
                }
            } else {
                var checkserv = allTens.indexOf(points[j]);
                var checkused = usedPoints.indexOf(points[j]);
                if (checkserv !== -1 || checkused !== -1) {
                    points.length = 0;
                    buildShip(random(), colCount);
                }
            }
        }

        for (var j in points) {
            var lastCol = points[points.length - 1];
            $("#" + tableId + " div#" + points[j]).addClass('used');
            usedPoints.push(points[j]);
            usedPoints.push(points[j] + 10);
            usedPoints.push(points[j] - 10);
        }

        usedPoints.push(points[0] - 1);
        usedPoints.push(points[0] - 11);
        usedPoints.push(points[0] + 9);
        usedPoints.push(lastCol + 1);
        usedPoints.push(lastCol + 11);
        usedPoints.push(lastCol - 9);

    }

    function buildShipH(randomNr, colCount) {

        var points = [];
        points.push(randomNr);

        for (var j = 0; j < colCount; j++) {
            points.push(randomNr += 10);
        }

        for (var j in points) {

            if (points.length == 2) {
                var checkserv = allJs.indexOf(points[0]);
                var checkused = usedPoints.indexOf(points[j]);
                if (checkserv !== -1 || checkused !== -1) {
                    points.length = 0;
                    buildShipH(random(), colCount);
                }
            } else if (points.length == 3) {
                var checkserv1 = allJs.indexOf(points[0]);
                var checkserv2 = allJs.indexOf(points[1]);
                var checkused = usedPoints.indexOf(points[j]);
                if (checkserv1 !== -1 || checkused !== -1 || checkserv2 !== -1) {
                    points.length = 0;
                    buildShipH(random(), colCount);
                }
            } else {
                var checkserv = allJs.indexOf(points[j]);
                var checkused = usedPoints.indexOf(points[j]);
                if (checkserv !== -1 || checkused !== -1) {
                    points.length = 0;
                    buildShipH(random(), colCount);
                }
            }
        }

        for (var j in points) {
            var lastCol = points[points.length - 1];
            $("#" + tableId + " div#" + points[j]).addClass('used');
            usedPoints.push(points[j]);
            usedPoints.push(points[j] + 1);
            usedPoints.push(points[j] - 1);
        }

        usedPoints.push(points[0] - 10);
        usedPoints.push(points[0] - 11);
        usedPoints.push(points[0] - 9);
        usedPoints.push(lastCol + 9);
        usedPoints.push(lastCol + 10);
        usedPoints.push(lastCol + 11);

    }

    (horizontal() == 2 ? buildShipH(random(), 3) : buildShip(random(), 3));
    (horizontal() == 2 ? buildShipH(random(), 2) : buildShip(random(), 2));
    (horizontal() == 2 ? buildShipH(random(), 2) : buildShip(random(), 2));
    (horizontal() == 2 ? buildShipH(random(), 1) : buildShip(random(), 1));
    (horizontal() == 2 ? buildShipH(random(), 1) : buildShip(random(), 1));
    (horizontal() == 2 ? buildShipH(random(), 1) : buildShip(random(), 1));

    for (var i = 0; i < 4; i++) {
        buildShip(random(), 0);
    }

};


function play() {

    var usedDivsCompTbl = $('#compTable .used').map(function() {
        $(this).addClass('cover');
        return parseInt($(this).attr("id"));
    }).get();

    var usedDivsPlayerTbl = $('#playerTable .used').map(function() {
        return parseInt($(this).attr("id"));
    }).get();

    var totalcomp = 0;
    var totalplayer = 0;
    var allElevens = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 101];

    $("#compTable .shipCol").click(function() {

        var divId = parseInt($(this).attr("id"));
        var tblId = $(this).closest("table").attr("id");
        var checkusedpoints = usedDivsCompTbl.indexOf(divId);

        if (tblId === 'compTable') {

            var checkusedpoints = usedDivsCompTbl.indexOf(divId);

            if (checkusedpoints !== -1) {
                $("#compTable" + " div#" + divId).removeClass("cover").text("X").addClass('clicked');
                totalplayer = totalplayer + 1;
                $('#playerTotal').replaceWith('<p id="playerTotal">Hits: ' + totalplayer + ' </p>');
                checkScore();
            } else {
                $("#compTable" + " div#" + divId).text("•").addClass('clicked');
                count++;
                returnRandom();
            }
        }
    });

    var bombedPoints = [];
    var dir = 0;
    var count = 0;
    var randomNr = 0;
    var vertical = 0;
    var pointsToCheckShipLength = [];
    var checkShipLength = 4;

    function compClickDown(random1) {

        randomNr = random1;
        var x = randomNr;
        var y = randomNr;
        var checkusedpoints = usedDivsPlayerTbl.indexOf(randomNr);
        var checkbombedpoints = bombedPoints.indexOf(randomNr);
        var border = allJs.indexOf(randomNr);
        console.log('uus random ' + randomNr);

        if (checkbombedpoints === -1) {

            if (checkusedpoints !== -1) {
                $("#playerTable" + " div#" + randomNr).text("X");
                totalcomp = totalcomp + 1;
                vertical = 0;
                $('#compTotal').replaceWith('<p id="compTotal">Hits: ' + totalcomp + ' </p>');
                checkScore();
                bombedPoints.push(randomNr);
                pointsToCheckShipLength.push(randomNr);

                var pommitavadPunktid = [];
                var usedOrNotPointsArrayPlusTen = [];
                var colEmptyOrNotarrayPlusTen = [];
                var pointsVsBorderArray = [];

                if (border === -1) {

                    for (var j = 0; j <= 3; j++) {
                        pommitavadPunktid.push(x += 10);
                        usedOrNotPointsArrayPlusTen.push(bombedPoints.indexOf(pommitavadPunktid[j]));
                        colEmptyOrNotarrayPlusTen.push(usedDivsPlayerTbl.indexOf(pommitavadPunktid[j]));
                        pointsVsBorderArray.push(allJs.indexOf(pommitavadPunktid[j]));

                        if (usedOrNotPointsArrayPlusTen[j] === -1) { //kas juba pommitatud
                            if (colEmptyOrNotarrayPlusTen[j] !== -1) {
                                $("#playerTable" + " div#" + pommitavadPunktid[j]).text("X");
                                vertical = 1;
                                bombedPoints.push(pommitavadPunktid[j]);
                                bombedPoints.push((pommitavadPunktid[j]) + 1);
                                bombedPoints.push((pommitavadPunktid[j]) - 1);
                                bombedPoints.push(randomNr + 1);
                                bombedPoints.push(randomNr - 1);
                                totalcomp = totalcomp + 1;
                                $('#compTotal').replaceWith('<p id="compTotal">Hits: ' + totalcomp + ' </p>');
                                checkScore();
                                pointsToCheckShipLength.push(pommitavadPunktid[j]);
                                console.log('laevapikkus alla' + pointsToCheckShipLength);
                                if (pointsVsBorderArray[j] !== -1) {
                                    if (pointsToCheckShipLength.length === 3 && checkShipLength === 3) {
                                        bombedPoints.push(pommitavadPunktid[j] + 10);
                                        bombedPoints.push((pommitavadPunktid[j] + 9));
                                        bombedPoints.push((pommitavadPunktid[j] + 11));
                                        checkShipLength = 3;
                                        pointsToCheckShipLength.length = 0;
                                        compClickDown(random());
                                        return;
                                    } else {
                                        pointsToCheckShipLength.length = 0;
                                        bombedPoints.push(pommitavadPunktid[j] + 10);
                                        bombedPoints.push((pommitavadPunktid[j] + 9));
                                        bombedPoints.push((pommitavadPunktid[j] + 11));
                                        compClickUp(randomNr);
                                        return;
                                    }
                                }
                                if (pointsToCheckShipLength.length === 4 && checkShipLength === 4) {
                                    bombedPoints.push(pommitavadPunktid[j] + 10);
                                    bombedPoints.push((pommitavadPunktid[j] + 9));
                                    bombedPoints.push((pommitavadPunktid[j] + 11));
                                    checkShipLength = 3;
                                    pointsToCheckShipLength.length = 0;
                                    compClickDown(random());
                                    return;
                                } else if (pointsToCheckShipLength.length === 3 && checkShipLength === 3) {
                                    bombedPoints.push(pommitavadPunktid[j] + 10);
                                    bombedPoints.push((pommitavadPunktid[j] + 9));
                                    bombedPoints.push((pommitavadPunktid[j] + 11));
                                    checkShipLength = 3;
                                    pointsToCheckShipLength.length = 0;
                                    compClickDown(random());
                                    return;
                                }
                            } else {
                                $("#playerTable" + " div#" + pommitavadPunktid[j]).text("•");
                                bombedPoints.push(pommitavadPunktid[j]);
                                bombedPoints.push((pommitavadPunktid[j] - 1));
                                bombedPoints.push((pommitavadPunktid[j] + 1));
                                console.log('vert1 ' + vertical);
                                dir = 1;
                                return;
                            }
                        } else {
                            console.log('kattub, liigun yles');
                            bombedPoints.push(pommitavadPunktid[j]);
                            bombedPoints.push((pommitavadPunktid[j] - 1));
                            bombedPoints.push((pommitavadPunktid[j] + 1));
                            compClickUp(randomNr);
                            return;
                        }
                    }

                } else {
                    console.log('alumine serv, liigun yles, vert2 ' + vertical);
                    vertical = 0;
                    compClickUp(randomNr);
                    return;

                }

            } else {
                $("#playerTable" + " div#" + randomNr).text("•");
                vertical = 0;
                dir = 0;
                bombedPoints.push(randomNr);
                pointsToCheckShipLength.length = 0;
                return;
            }
        } else {
            dir = 0;
            vertical = 0;
            pointsToCheckShipLength.length = 0;
            compClickDown(random());
            return;
        }

    }

    function compClickUp(random1) {

        var randomNr = random1;
        var x = randomNr;
        var pommitavadPunktid = [];
        var usedOrNotPointsArrayMinusTen = [];
        var colEmptyOrNotarrayMinusTen = [];
        var ylemineServ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var border = ylemineServ.indexOf(randomNr);
        var checkusedpoints = usedDivsPlayerTbl.indexOf(randomNr);
        var pointsVsBorderArray = [];

        if (checkusedpoints !== -1) {

            if (border === -1) {

                for (var j = 0; j <= 3; j++) {

                    pommitavadPunktid.push(x -= 10);
                    usedOrNotPointsArrayMinusTen.push(bombedPoints.indexOf(pommitavadPunktid[j]));
                    colEmptyOrNotarrayMinusTen.push(usedDivsPlayerTbl.indexOf(pommitavadPunktid[j]));
                    pointsVsBorderArray.push(ylemineServ.indexOf(pommitavadPunktid[j]));

                    if (usedOrNotPointsArrayMinusTen[j] === -1) {
                        if (colEmptyOrNotarrayMinusTen[j] !== -1) {
                            $("#playerTable" + " div#" + pommitavadPunktid[j]).text("X");
                            vertical = 2;
                            bombedPoints.push(pommitavadPunktid[j]);
                            bombedPoints.push(pommitavadPunktid[j] + 1);
                            bombedPoints.push(pommitavadPunktid[j] - 1);
                            bombedPoints.push(randomNr + 1);
                            bombedPoints.push(randomNr - 1);
                            totalcomp = totalcomp + 1;
                            $('#compTotal').replaceWith('<p id="compTotal">Hits: ' + totalcomp + ' </p>');
                            checkScore();
                            pointsToCheckShipLength.push(pommitavadPunktid[j]);
                            console.log('laevapikkus yles' + pointsToCheckShipLength);
                            if (pointsVsBorderArray[j] !== -1) {
                                bombedPoints.push(pommitavadPunktid[j] - 10);
                                bombedPoints.push((pommitavadPunktid[j] - 11));
                                bombedPoints.push((pommitavadPunktid[j] - 9));
                                pointsToCheckShipLength.length = 0;
                                compClickDown(random());
                                return;
                            }
                            if (pointsToCheckShipLength.length === 4 && checkShipLength === 4) {
                                bombedPoints.push(pommitavadPunktid[j] - 10);
                                bombedPoints.push((pommitavadPunktid[j] - 11));
                                bombedPoints.push((pommitavadPunktid[j] - 9));
                                checkShipLength = 3;
                                pointsToCheckShipLength.length = 0;
                                compClickDown(random());
                                return;
                            } else if (pointsToCheckShipLength.length === 3 && checkShipLength === 3) {
                                bombedPoints.push(pommitavadPunktid[j] - 10);
                                bombedPoints.push((pommitavadPunktid[j] - 11));
                                bombedPoints.push((pommitavadPunktid[j] - 9));
                                checkShipLength = 3;
                                pointsToCheckShipLength.length = 0;
                                compClickDown(random());
                                return;
                            }
                        } else {
                            $("#playerTable" + " div#" + pommitavadPunktid[j]).text("•");
                            bombedPoints.push(pommitavadPunktid[j]);
                            bombedPoints.push((pommitavadPunktid[j] - 1));
                            bombedPoints.push((pommitavadPunktid[j] + 1));
                            dir = 2;
                            return;
                        }
                    } else {

                        if (vertical === 1 || vertical === 2) {
                            console.log('vertical olemas, võtan uue numbri, vert4 ' + vertical);
                            pointsToCheckShipLength.length = 0;
                            compClickDown(random());
                            return;

                        } else {
                            console.log('kattub, liigun paremale, vert4 ' + vertical);
                            bombedPoints.push(pommitavadPunktid[j]);
                            bombedPoints.push((pommitavadPunktid[j] - 1));
                            bombedPoints.push((pommitavadPunktid[j] + 1));
                            compClickRight(randomNr);
                            return;
                        }
                    }

                }
            } else {
                if (vertical === 1 || vertical === 2) {
                    console.log('vertical olemas, võtan uue numbri, vert ' + vertical);
                    pointsToCheckShipLength.length = 0;
                    compClickDown(random());
                    return;

                } else {
                    console.log('ylemine serv, liigun paremale, vert5 ' + vertical);
                    compClickRight(randomNr);
                    return;
                }
            }

        } else {
            return;
        }
    }

    function compClickRight(random1) {

        var randomNr = random1;
        var x = randomNr;
        var checkusedpoints = usedDivsPlayerTbl.indexOf(randomNr);
        var border = allTens.indexOf(randomNr);
        var checkusedpoints = usedDivsPlayerTbl.indexOf(randomNr);
        var pointsVsBorderArray = [];

        if (checkusedpoints !== -1) {

            if (border === -1) {

                var pommitavadPunktid = [];
                var usedOrNotPointsArrayPlusOne = [];
                var colEmptyOrNotarrayPlusOne = [];

                for (var j = 0; j <= 3; j++) {
                    pommitavadPunktid.push(x += 1);
                    usedOrNotPointsArrayPlusOne.push(bombedPoints.indexOf(pommitavadPunktid[j]));
                    colEmptyOrNotarrayPlusOne.push(usedDivsPlayerTbl.indexOf(pommitavadPunktid[j]));
                    pointsVsBorderArray.push(allElevens.indexOf(pommitavadPunktid[j]));

                    if (usedOrNotPointsArrayPlusOne[j] === -1) {
                        if (colEmptyOrNotarrayPlusOne[j] !== -1) {

                            bombedPoints.push(pommitavadPunktid[j]);
                            bombedPoints.push(pommitavadPunktid[j] + 10);
                            bombedPoints.push(pommitavadPunktid[j] - 10);
                            bombedPoints.push(randomNr + 10);
                            bombedPoints.push(randomNr - 10);
                            $("#playerTable" + " div#" + pommitavadPunktid[j]).text("X");
                            totalcomp = totalcomp + 1;
                            $('#compTotal').replaceWith('<p id="compTotal">Hits: ' + totalcomp + ' </p>');
                            checkScore();
                            pointsToCheckShipLength.push(pommitavadPunktid[j]);
                            console.log('laevapikkus paremale' + pointsToCheckShipLength);
                            if (pointsVsBorderArray[j] !== -1) {
                                if (pointsToCheckShipLength.length === 3 && checkShipLength === 3) {
                                    bombedPoints.push(pommitavadPunktid[j] + 1);
                                    bombedPoints.push((pommitavadPunktid[j] - 11));
                                    bombedPoints.push((pommitavadPunktid[j] + 9));
                                    checkShipLength = 3;
                                    pointsToCheckShipLength.length = 0;
                                    compClickDown(random());
                                    return;
                                } else {
                                    pointsToCheckShipLength.length = 0;
                                    bombedPoints.push(pommitavadPunktid[j] + 1);
                                    bombedPoints.push((pommitavadPunktid[j] + 9));
                                    bombedPoints.push((pommitavadPunktid[j] - 11));
                                    compClickLeft(randomNr);
                                    return;
                                }
                            } else if (pointsToCheckShipLength.length === 4 && checkShipLength === 4) {
                                bombedPoints.push(pommitavadPunktid[j] + 1);
                                bombedPoints.push((pommitavadPunktid[j] - 11));
                                bombedPoints.push((pommitavadPunktid[j] + 9));
                                checkShipLength = 3;
                                pointsToCheckShipLength.length = 0;
                                compClickDown(random());
                                return;
                            } else if (pointsToCheckShipLength.length === 3 && checkShipLength === 3) {
                                bombedPoints.push(pommitavadPunktid[j] + 1);
                                bombedPoints.push((pommitavadPunktid[j] - 11));
                                bombedPoints.push((pommitavadPunktid[j] + 9));
                                checkShipLength = 3;
                                pointsToCheckShipLength.length = 0;
                                compClickDown(random());
                                return;
                            }

                        } else {

                            bombedPoints.push(pommitavadPunktid[j]);
                            bombedPoints.push((pommitavadPunktid[j] - 10));
                            bombedPoints.push((pommitavadPunktid[j] + 10));
                            $("#playerTable" + " div#" + pommitavadPunktid[j]).text("•");
                            dir = 3;
                            return;
                        }
                    } else {
                        if (vertical === 1 || vertical === 2) {
                            console.log('vertical olemas, võtan uue numbri, vert ' + vertical);
                            pointsToCheckShipLength.length = 0;
                            compClickDown(random());
                            return;

                        } else {
                            console.log('kattub, liigun vasakule, vert4 ' + vertical);
                            bombedPoints.push(pommitavadPunktid[j]);
                            bombedPoints.push((pommitavadPunktid[j] - 10));
                            bombedPoints.push((pommitavadPunktid[j] + 10));
                            compClickLeft(randomNr);
                            return;
                        }

                    }
                }
            } else {
                console.log("parem serv, liigun vasakule");
                compClickLeft(randomNr);
                return;

            }
        } else {
            return;
        }

    }

    function compClickLeft(random1) {

        randomNr = random1;
        var x = randomNr;
        var checkusedpoints = usedDivsPlayerTbl.indexOf(randomNr);
        var border = allElevens.indexOf(randomNr);
        var checkusedpoints = usedDivsPlayerTbl.indexOf(randomNr);
        var pointsVsBorderArray = [];

        if (checkusedpoints !== -1) {

            if (border === -1) {

                var pommitavadPunktid = [];
                var usedOrNotPointsArrayMinusOne = [];
                var colEmptyOrNotarrayMinusOne = [];

                for (var j = 0; j <= 3; j++) {

                    pommitavadPunktid.push(x -= 1);
                    usedOrNotPointsArrayMinusOne.push(bombedPoints.indexOf(pommitavadPunktid[j]));
                    colEmptyOrNotarrayMinusOne.push(usedDivsPlayerTbl.indexOf(pommitavadPunktid[j]));
                    pointsVsBorderArray.push(allTens.indexOf(pommitavadPunktid[j]));

                    if (usedOrNotPointsArrayMinusOne[j] === -1) {
                        if (colEmptyOrNotarrayMinusOne[j] !== -1) {
                            bombedPoints.push(pommitavadPunktid[j]);
                            bombedPoints.push(pommitavadPunktid[j] + 10);
                            bombedPoints.push(pommitavadPunktid[j] - 10);
                            bombedPoints.push(randomNr + 10);
                            bombedPoints.push(randomNr - 10);
                            $("#playerTable" + " div#" + pommitavadPunktid[j]).text("X");
                            totalcomp = totalcomp + 1;
                            $('#compTotal').replaceWith('<p id="compTotal">Hits: ' + totalcomp + ' </p>');
                            checkScore();
                            pointsToCheckShipLength.push(pommitavadPunktid[j]);
                            console.log('laevapikkus vasakule' + pointsToCheckShipLength);
                            if (pointsVsBorderArray[j] !== -1) {
                                console.log('vasak serv ' + pointsVsBorderArray);
                                pointsToCheckShipLength.length = 0;
                                bombedPoints.push(pommitavadPunktid[j] -1 );
                                bombedPoints.push((pommitavadPunktid[j] - 11));
                                bombedPoints.push((pommitavadPunktid[j] + 9));
                                compClickDown(random());
                                return;
                            }
                            if (pointsToCheckShipLength.length === 4 && checkShipLength === 4) {
                                bombedPoints.push(pommitavadPunktid[j] - 1);
                                bombedPoints.push((pommitavadPunktid[j] - 11));
                                bombedPoints.push((pommitavadPunktid[j] + 9));
                                checkShipLength = 3;
                                pointsToCheckShipLength.length = 0;
                                compClickDown(random());
                                return;
                            } else if (pointsToCheckShipLength.length === 3 && checkShipLength === 3) {
                                bombedPoints.push(pommitavadPunktid[j] - 1);
                                bombedPoints.push((pommitavadPunktid[j] - 11));
                                bombedPoints.push((pommitavadPunktid[j] + 9));
                                checkShipLength = 3;
                                pointsToCheckShipLength.length = 0;
                                compClickDown(random());
                                return;
                            }

                        } else {
                            pointsToCheckShipLength.length = 0;
                            bombedPoints.push(pommitavadPunktid[j]);
                            bombedPoints.push((pommitavadPunktid[j] - 10));
                            bombedPoints.push((pommitavadPunktid[j] + 10));
                            $("#playerTable" + " div#" + pommitavadPunktid[j]).text("•");
                            dir = 4;
                            return;
                        }
                    } else {
                        console.log('pommitatud, võtan uue numbri');
                        bombedPoints.push(pommitavadPunktid[j]);
                        bombedPoints.push((pommitavadPunktid[j] - 10));
                        bombedPoints.push((pommitavadPunktid[j] + 10));
                        checkScore();
                        compClickDown(random());
                        return;
                    }
                }
            } else {
                console.log("vasak serv, võtan uue numbri");
                checkScore();
                pointsToCheckShipLength.length = 0;
                compClickDown(random());
                return;
            }
        } else {
            return;
        }

    }

    function returnRandom() {

        if (count === 1) {
            compClickDown(random());
        } else if (dir === 1) {
            compClickUp(randomNr);
        } else if (dir === 2) {
            if (vertical === 1 || vertical === 2) {
                pointsToCheckShipLength.length = 0;
                compClickDown(random());
            } else {
                compClickRight(randomNr);
            }
        } else if (dir === 3) {
            compClickLeft(randomNr);
        } else if (dir === 4) {
            compClickDown(random());
        } else {
            compClickDown(random());
        }

    }

    function checkScore() {
        if (totalplayer === 20 || totalcomp === 20) {
            $('.shipCol').addClass('clicked');
            $("#playButtonDiv").show();

            if (totalcomp === 20) {
                $('#compTotal').replaceWith('<p id="compTable">Hits: ' + totalcomp + '</p>');
                $("#playButton").show().html('I won!<div id="playAgain">Play again</div>');
            } else {
                $('#playerTotal').replaceWith('<p id="playerTable">Hits: ' + totalplayer + '</p>');
                $("#playButton").show().html('You won! <div id="playAgain">Play again</div>');
            }
        }
    }

    $("#playButton").click(function() {
        $("#playButtonDiv").hide();
        drawTablesAndPlay();
    });
}

function drawTablesAndPlay() {
    createTable("compTable", 'playerTotal');
    createTable("playerTable", 'compTotal');
    drawShips("compTable");
    drawShips("playerTable");
    play();
    $("#playButtonDiv").hide();
}