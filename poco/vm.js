var _body = document.getElementById("body");
var _canvas;
var _width = 256;
var _height = 256;
var _context;

function start(){
    document.writeln("<canvas id='pocovm' width=" + _width + " height=" + _height + "></canvas>");
    _context = document.getElementById("pocovm");
    _canvas = _context.getContext("2d");
    _context.style.width = _width * 2;
    _context.style.height = _height * 2;
    _canvas.scale(2, 2);
    document.writeln("<br><button tabindex='-1' onclick='run()'>Turn On</button>");
    document.writeln("<br><button tabindex='-1' onclick='compile()'>Compile</button>");
}

var compileTime = 0;

function run(){
    var file = document.getElementById('cart').files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(evt){
        var fileString = evt.target.result;
        fileString = fileString.split('\n');

        compileTime = performance.now();

        for(var line in fileString){
            var l = fileString[line].split("x");
            if(!functionFlag || l[0] == "6") parse_rom(l);
            else functionBuffer.push(fileString[line]);
        }

        compileTime = performance.now() - compileTime;
        console.log(compileTime);
    }
}

function compile(){
    var file = document.getElementById('cart').files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(evt){
        var fileString = evt.target.result;
        fileString = fileString.split('\n');

        for(var line in fileString){
            compileLine(fileString[line]);
        }

        console.log(output);
    }
}

/* ------------------------------ */
/* VIRTUAL MACHINE IMPLEMENTATION */
/* ------------------------------ */

var storage = {};

var functionBuffer = [];
var functionFlag = false;

function parse_rom(line){

    /* screen manager */
    if(line[0] == "0"){
        screen(line);
    }

    /* pixel manager */
    if(line[0] == "1"){
        pixel(line);
    }

    /* memory */
    if(line[0] == "3"){
        store(line);
    }

    /* set data */
    if(line[0] == "4"){
        set(line);
    }

    /* math operations */
    if(line[0] == "5"){
        math(line);
    }

    /* function */
    if(line[0] == "6"){
        func(line);
    }

    /* loop */
    if(line[0] == "7"){
        loop(line);
    }

    /* input */
    if(line[0] == "8"){
        input(line);
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

function func(line){

    /* begin function flag */
    if(line[1].substring(2, 3) == "0"){
        storage[line[1].substring(0, 2)] = [];

        functionFlag = true;
    }

    /* end function flag */
    if(line[1].substring(2, 3) == "1"){
        /* first 2 characters are the name of the function */
        storage[line[1].substring(0, 2)] = functionBuffer;

        functionBuffer = [];
        functionFlag = false;
    }

    /* run function flag */
    if(line[1].substring(2, 3) == "2"){
        var _func = storage[line[1].substring(0, 2)];
        for(var l in _func){
            parse_rom(_func[l].split("x"));
        }
    }

}

function loop(line){
    var updater = storage[line[1].substring(0, 2)];
    setInterval(function(){
        for(var l in updater){
            parse_rom(updater[l].split("x"));
        }
    }, 100);
}

function input(line){
    if(line[1].substring(0, 2) == "00"){
        storage[line[1].substring(2, 3)] = keys[38];
    }

    if(line[1].substring(0, 2) == "01"){
        storage[line[1].substring(2, 3)] = keys[40];
    }

    if(line[1].substring(0, 2) == "02"){
        storage[line[1].substring(2, 3)] = keys[37];
    }

    if(line[1].substring(0, 2) == "03"){
        storage[line[1].substring(2, 3)] = keys[39];
    }

    if(line[1].substring(0, 2) == "04"){
        storage[line[1].substring(2, 3)] = keys[32];
    }
}

function setKeyStatusDown(event){
    keys[event.which] = 1;
}

function setKeyStatusUp(event){
    keys[event.which] = 0;
}

var keys = {
    38: 0,
    40: 0,
    37: 0,
    39: 0,
    32: 0
};

window.addEventListener("keydown", setKeyStatusDown);
window.addEventListener("keyup", setKeyStatusUp);

start();
