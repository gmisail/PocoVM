var _body = document.getElementById("body");
var _canvas;
var _width = 256;
var _height = 256;

function start(){
    document.writeln("<canvas id='pocovm' width=" + _width + " height=" + _height + "></canvas>");
    var _tempContext = document.getElementById("pocovm");
    _canvas = _tempContext.getContext("2d");
    _tempContext.style.width = _width * 2;
    _tempContext.style.height = _height * 2;
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
            var l = fileString[line].split("x");
            if(!functionFlag || l[0] == "6") parse_rom(l);
            else functionBuffer.push(fileString[line]);
        }
    }
}

/* ------------------------------ */
/* VIRTUAL MACHINE IMPLEMENTATION */
/* ------------------------------ */

var storage = {};

var functionBuffer = [];
var functionFlag = false;

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

    if(line[0] == "6"){
        /*
        
        6x000
        
        
        */
        func(line);
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
            //console.log(_func[l]);
            parse_rom(_func[l].split("x"));
            //parse each line
        }
    }
}

start();
