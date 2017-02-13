var output = "";

function add(src){
    output += src + "\n";
}

function compileLine(line){
    var l = line.split(" ");

    if(l[0] == "CLR") add("0x000");
    
    else if(l[0] == "PIX") add("1x001");
    
    else if(l[0] == "VAR"){
           add("3x" + l[2] + l[1]);
    }

    else if(l[0] == "SET"){
           add("4x" + l[1] + "2" + l[2]);
    }

    else if(l[0] == "ADD"){
           add("5x000");
    }

    else if(l[0] == "SUB"){
           add("5x001");
    }

    else if(l[0] == "MUL"){
           add("5x002");
    }

    else if(l[0] == "DIV"){
           add("5x003");
    }

    else if(l[0] == "BEG"){
           add("6x" + l[1] + "0");
    }

    else if(l[0] == "END"){
           add("6x" + l[1] + "1");
    }

    else if(l[0] == "JMP"){
           add("6x" + l[1] + "2");
    }

    else if(l[0] == "FVR"){
           add("7x" + l[1] + "0");
    }

    else if(l[0] == "KEY"){
           add("8x" + l[1] + l[2]);
    }

}