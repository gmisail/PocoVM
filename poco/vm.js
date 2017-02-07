var _body = document.getElementById("body");
var _canvas;
var _width = 64;
var _height = 64;

function start(){
    document.writeln("<canvas id='pocovm' width=" + _width + " height=" + _height + "></canvas>");
    var _tempContext = document.getElementById("pocovm");
    _canvas = _tempContext.getContext("2d");
    _tempContext.style.width = 640;
    _tempContext.style.height = 640;
    _canvas.scale(2, 2);
    document.writeln("<br><button tabindex='-1' onclick='run()'>Turn On</button>");

}

function run(){
    var file = document.getElementById('cart').files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(evt){
        var fileString = evt.target.result;
        fileString = fileString.split('\n');

        for(var line in fileString){
            parse_rom(fileString[line].split("x"));
        }


    }
}

/* ------------------------------ */
/* VIRTUAL MACHINE IMPLEMENTATION */
/* ------------------------------ */

var storage = {};

function parse_rom(line){
    if(line[0] == "0"){
        screen(line);
    }

    if(line[0] == "1"){
        pixel(line);
    }

    if(line[0] == "3"){
        store(line);
    }

    if(line[0] == "4"){
        set(line);
    }

    if(line[0] == "5"){
        math(line);
    }
}

function screen(line){
    if(line[1] == "000"){
        _canvas.fillStyle = "black";
        _canvas.fillRect(0, 0, _width, _height);
    }
}

function pixel(line){
    if(line[1] == "001"){
        _canvas.fillStyle = "white";
        _canvas.fillRect(storage.a, storage.b, 1, 1);
    }
}

function store(line){
    var variable = line[1].substring(0, 2);
    storage[line[1].substring(2, 3)] = variable;
}

function set(line){
    storage[line[1].substring(0, 1)] = storage[line[1].substring(2, 3)];
}

function math(line){
    if(line[1] == "000"){
        storage.c = parseInt(storage.a) + parseInt(storage.b);
        console.log(storage.c);
    }

    if(line[1] == "001"){
        storage.c = parseInt(storage.a) - parseInt(storage.b);
    }

    if(line[1] == "002"){
        storage.c = parseInt(storage.a) * parseInt(storage.b);
    }

    if(line[1] == "003"){
        storage.c = parseInt(storage.a) / parseInt(storage.b);
    }
}

start();
