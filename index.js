let BufferArray = [];
let OpenWhileLoopIDs = [];
let ClosedWhileLoopIDs = [];
let IfIDs = [];
let CurrentIndex = 0;
let CopiedIndex = undefined;
let CodeIndex = 0;
let CodeString;
let codeInterval = undefined;
let DrawObject = {};
let Vertices = 0;
let CurrentDraw = "";
const Clear = () => {
    BufferArray = [];
    for(let i = 0; i < 10; i++){
        BufferArray.push(0);
    }
};

const UpdateBuffer = () => {
    document.getElementById("Buffer").value = "";
    for(let i = 0; i < BufferArray.length; i++){
        document.getElementById("Buffer").value += "|";
        if(CurrentIndex == i){
            document.getElementById("Buffer").value += "^";
        }
        else{
            document.getElementById("Buffer").value += " ";
        }
        document.getElementById("Buffer").value += BufferArray[i];
        if(CopiedIndex == i){
            document.getElementById("Buffer").value += "*";
        }
        else{
            document.getElementById("Buffer").value += " ";
        }
    }
};

const Execute = (char, index) => {
    if(char == "+"){
        BufferArray[CurrentIndex]++;
        UpdateBuffer();
    }
    if(char == "-"){
        BufferArray[CurrentIndex]--;
        UpdateBuffer();
    }
    if(char == "<"){
        CurrentIndex--;
        if(CurrentIndex == -1){
            CurrentIndex = BufferArray.length;
        }
        UpdateBuffer();
    }
    if(char == ">"){
        CurrentIndex++;
        if(CurrentIndex == BufferArray.length){
            CurrentIndex = 0;
        }
        UpdateBuffer();
    }
    if(char == "["){
        if(BufferArray[CurrentIndex] == 0){
            let NumberOfLoops = 0;
            for(let i = CodeIndex; i < CodeString.length; i++){
                if(CodeString[i] == "["){
                    NumberOfLoops++;
                }
                if(CodeString[i] == "]"){
                    NumberOfLoops--;
                    if(NumberOfLoops == 0){
                        CodeIndex = i;
                        break;
                    }
                }
            }
        }
        else{
            OpenWhileLoopIDs.push(CodeIndex);
        }
    }
    if(char == "]"){
        if(OpenWhileLoopIDs[OpenWhileLoopIDs.length - 1] != undefined && ClosedWhileLoopIDs[OpenWhileLoopIDs.length - 1] != undefined){
            if(BufferArray[CurrentIndex] == 0){
                delete OpenWhileLoopIDs[OpenWhileLoopIDs.length - 1];
                delete ClosedWhileLoopIDs[OpenWhileLoopIDs.length - 1];
            }
            else{
                CodeIndex = OpenWhileLoopIDs[OpenWhileLoopIDs.length - 1];
            }
        }
        else{
            ClosedWhileLoopIDs.push(CurrentIndex);
            CodeIndex = OpenWhileLoopIDs[OpenWhileLoopIDs.length - 1];
        }
    }
    if(char == "."){
        document.getElementById('Output').value += String.fromCharCode(BufferArray[CurrentIndex]);
    }
    if(char == ","){
        BufferArray[CurrentIndex] = prompt().charCodeAt(0);
        UpdateBuffer();
    }
    if(char == ","){
        BufferArray[CurrentIndex] = prompt().charCodeAt(0);
        UpdateBuffer();
    }
    if(char == "#"){
        $("canvas").clearCanvas();
    }
    if(char == "@"){
        Vertices++;
        DrawObject["x" + Vertices] = BufferArray[CopiedIndex];
        DrawObject["y" + Vertices] = BufferArray[CurrentIndex];
    }
    if(char == "%"){
        if(CurrentDraw == "LINE"){
            if(DrawObject["strokeStyle"] == undefined){
                DrawObject["strokeStyle"] = "#";
            }
            DrawObject["strokeStyle"] += BufferArray[CurrentIndex];
        }
        else{
            if(DrawObject["fillStyle"] == undefined){
                DrawObject["fillStyle"] = "#";
            }
            DrawObject["fillStyle"] += BufferArray[CurrentIndex];
        }
    }
    if(char == "&"){
        DrawObject["strokeWidth"] = BufferArray[CurrentIndex];
    }
    if(char == "!"){
        if(CurrentDraw == "LINE")
            DrawObject["closed"] = true;
            $("canvas").drawLine(DrawObject);
        else{
            $('canvas').drawPolygon(DrawObject);
        }
    }
    if(char == "?"){
        if(CurrentDraw == "LINE")
            $("canvas").drawLine(DrawObject);
        else{
            $("canvas").drawPolygon(DrawObject);
        }
    }
    if(char == "~"){
        CopiedIndex = CurrentIndex;
    }
    if(char == "`"){

    }
    CodeIndex++;
    if(CodeIndex + 1 <= $("#CodeInput").val().length){
        setTimeout(function(){Execute($("#CodeInput").val()[CodeIndex], CodeIndex)}, 400);
    }
};

$("#ActionButton").click((event) => {
    Clear();
    Execute($("#CodeInput").val()[CodeIndex], CodeIndex);
});
