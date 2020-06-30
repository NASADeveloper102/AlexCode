let BufferArray = [];
let OpenWhileLoopIDs = [];
let ClosedWhileLoopIDs = [];
let OpenFunctionIDs = [];
let ClosedFunctionIDs = [];
let IfIDs = [];
let CurrentIndex = 0;
let CopiedIndex = undefined;
let CodeIndex = 0;
let CodeString;
let codeInterval = undefined;
let DrawObject = {Vertices : [], Colors : []};
let Vertices = 0;
let CurrentDraw = "";
let ExSpeed = 400;
let Characters = [];
let canvas = document.querySelector("#Canvas");
let ctx = canvas.getContext('2d');
let place = undefined;
let lastKeyPressed = undefined;

document.addEventListener('keydown', function(event){
    lastKeyPressed = event.which;
});

const Clear = () => {
    CurrentIndex = 0;
    CurrentDraw = "";
    CopiedIndex = undefined;
    CodeIndex = 0;
    BufferArray = [];
    ExSpeed = 400;
    ctx.fillStyle = "#000000";
    document.getElementById("Output").value = "";
    ctx.fillRect(0, 0, 870, 500);
    for(let i = 0; i < 10; i++){
        BufferArray.push(0);
    }
    BufferArray[0] = 1;
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
    if(char == "\\"){
        for(let i = CodeIndex; i < CodeString.length; i++){
            if(CodeString[i] == "\\"){
                CodeIndex = i;
                
            }
        }
    }
    if(char == "+" || char == "a"){
        BufferArray[CurrentIndex]++;
        UpdateBuffer();
    }
    if(char == "-" || char == "s"){
        BufferArray[CurrentIndex]--;
        UpdateBuffer();
    }
    if(char == "<" || char == "l"){
        CurrentIndex--;
        if(CurrentIndex == -1){
            CurrentIndex = BufferArray.length;
        }
        UpdateBuffer();
    }
    if(char == ">" || char == "r"){
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
            if(BufferArray[CurrentIndex] != 0){
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
    if(char == "." || char == "p"){
        document.getElementById('Output').value += String.fromCharCode(BufferArray[CurrentIndex]);
    }
    if(char == "," || char == "i"){
        BufferArray[CurrentIndex] = prompt().charCodeAt(0);
        UpdateBuffer();
    }
    if(char == "c"){
        $("canvas").clearCanvas();
    }
    if(char == "Z"){
        BufferArray = [];
        for (var i = 0; i < 10; i++) {
            BufferArray.push(0);
        }
    }
    if(char == "L"){
        ctx.lineTo(BufferArray[CurrentIndex], BufferArray[CopiedIndex]);
    }
    if(char == "C"){
        DrawObject.Colors.push(BufferArray[CurrentIndex]);
    }
    if(char == "W"){
        ctx.lineWidth = BufferArray[CurrentIndex];
    }
    if(char == "S"){
        ctx.strokeStyle = "rgb(" + DrawObject.Colors[0].toString() + ", " + DrawObject.Colors[1].toString() + ", " + DrawObject.Colors[2].toString() + ")";
    }
    if(char == "F"){
        ctx.fillStyle = "rgb(" + DrawObject.Colors[0] + ", " + DrawObject.Colors[1] + ", " + DrawObject.Colors[2] + ")";
    }
    if(char == "{"){
        ctx.beginPath();
    }
    if(char == "}"){
        ctx.fill();
    }
    if(char == "M"){
        ctx.moveTo(BufferArray[CurrentIndex], BufferArray[CopiedIndex]);
    }
    if(char == "~"){
        CopiedIndex = CurrentIndex;
    }
    if(char == "E"){
        ExSpeed = BufferArray[CurrentIndex];
    }
    if(char == "d"){
        BufferArray[CurrentIndex] = BufferArray[CurrentIndex]/BufferArray[CopiedIndex];
        UpdateBuffer();
    }
    if(char == "m"){
        BufferArray[CurrentIndex] = BufferArray[CurrentIndex] * BufferArray[CopiedIndex];
        UpdateBuffer();

    }
    if(char == "'"){
        BufferArray[CurrentIndex] = Math.pow(BufferArray[CurrentIndex], 2);
        UpdateBuffer();
    }
    if(char == '"'){
        BufferArray[CurrentIndex] = Math.sqrt(BufferArray[CurrentIndex]);
        UpdateBuffer();
    }
    if(char == "B"){
        for(let i = 0; i < BufferArray[CurrentIndex]; i++){
            BufferArray.push(0);
        }
        UpdateBuffer();
    }
    if(char == "V"){
        BufferArray[CurrentIndex] = BufferArray[CopiedIndex];
        UpdateBuffer();
    }
    if(char == ")"){
        CodeIndex = place;
    }
    if(char == "("){
        OpenFunctionIDs.push([CodeIndex, BufferArray[CurrentIndex]]);
        for(let i = CodeIndex; i < CodeString.length; i++){
            if(CodeString[i] == ")"){
                ClosedFunctionIDs.push([i, BufferArray[CurrentIndex]]);
                CodeIndex = i;
            }
        }
    }
    if(char == "R"){
        let found = false;
        for(let i = 0; i < OpenFunctionIDs.length; i++){
            if(OpenFunctionIDs[i][1] == BufferArray[CurrentIndex] && found == false){
                place = CodeIndex;
                CodeIndex = OpenFunctionIDs[i][0];
                found = true;
            }
        }
    }
    if(char == "k"){
        BufferArray[CurrentIndex] = lastKeyPressed;
        UpdateBuffer();
    }
    CodeIndex++;
    if(CodeIndex + 1 <= CodeString.length){
        setTimeout(function(){Execute(CodeString[CodeIndex], CodeIndex)}, ExSpeed);
    }
};

$("#ActionButton").click((event) => {
    Clear();
    CodeString = $("#CodeInput").val();
    Execute(CodeInput[0], CodeIndex);
});
