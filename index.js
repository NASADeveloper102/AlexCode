
let VariableArray = new Array(10);
let CurrentIndex = 0;
let CopiedPointer = null;
let CurrentString = "";
for( let i = 0 ; i < VariableArray.length; i++ ){
    VariableArray[i] = 0;
}
const ParseAndExecute = ( AlexCodeInput ) => {
    
    VariableArray = new Array(10);
    CurrentIndex = 0;
    CopiedPointer = null;
    CurrentString = "";
    document.getElementById('Output').value = "";
    for( let i = 0 ; i < VariableArray.length; i++ ){
        VariableArray[i] = 0;
    }
    let EvalString = "";
    for( let i = 0; i < AlexCodeInput.length; i++ ){
        if(AlexCodeInput[i] == "+" || AlexCodeInput[i] == "a"){
            EvalString += "VariableArray[CurrentIndex]++;";
        }
        if(AlexCodeInput[i] == "-" || AlexCodeInput[i] == 's'){
            EvalString += "VariableArray[CurrentIndex]--;";
        }
        if(AlexCodeInput[i] == "<" || AlexCodeInput[i] == 'l'){
            EvalString += "if(CurrentIndex == 0){CurrentIndex = VariableArray.length;} else {CurrentIndex--;}";
        }
        if(AlexCodeInput[i] == ">" || AlexCodeInput[i] == "r"){
            EvalString += "if(CurrentIndex == VariableArray.length - 1){CurrentIndex = 0;} else{CurrentIndex++;}";
        }
        if(AlexCodeInput[i] == "["){
            EvalString += "while(VariableArray[CurrentIndex] != 1){";
        }
        if(AlexCodeInput[i] == ']'){
            EvalString += "}";
        }
        if(AlexCodeInput[i] == '.' || AlexCodeInput[i] == "o"){
            EvalString += "CurrentString += (String.fromCharCode(VariableArray[CurrentIndex]));";
        }
        if(AlexCodeInput[i] == ','){
            console.error('Not implimented yet');
        }
        if(AlexCodeInput[i] == '~'){
            EvalString += "CopiedPointer = CurrentIndex;";
        }
        if(AlexCodeInput[i] == "{"){
            console.error('Not implimented yet');
        }
        if(AlexCodeInput[i] == "}"){
            console.error("Not implimented yet");
        }
        if(AlexCodeInput[i] == "#"){
            EvalString += "VariableArray[CurrentIndex] += VariableArray[CopiedPointer];"
        }
        if(AlexCodeInput[i] == ";"){
            console.error("Not implimented yet");
        }
        if(AlexCodeInput[i] == "$"){
            EvalString += "VariableArray = new Array(VariableArray[CurrentIndex]); for(let i = 0; i < VariableArray.length; i++){VariableArray[i] = 0;}";
        }
        if(AlexCodeInput[i] == "!"){
            EvalString += "console.error(VariableArray[CurrentIndex]);";
        }
        if(AlexCodeInput[i] == "?"){
            EvalString += "VariableArray[CurrentIndex] -= VariableArray[CopiedPointer];";
        }
        if(AlexCodeInput[i] == "*" || AlexCodeInput[i] == 'x'){
            EvalString += "VariableArray[CurrentIndex] *= VariableArray[CopiedPointer];";
        }
        if(AlexCodeInput[i] == "&"){
            EvalString += "document.getElementById('Output').value = '';";
        }
        if(AlexCodeInput[i] == "p"){
            EvalString += "document.getElementById('Output').value += CurrentString + '\\n'; CurrentString = '';"
        }
        if(AlexCodeInput[i] == "^"){
            EvalString += "if(VariableArray[CopiedPointer] == 0){if(CurrentIndex + 1 != VariableArray.length){VariableArray[CurrentIndex + 1] = Math.sin(VariableArray[CurrentIndex]);}else{VariableArray[0] = Math.sin(VariableArray[CurrentIndex]);}}if(VariableArray[CopiedPointer] == 1){if(CurrentIndex + 1 != VariableArray.length){VariableArray[CurrentIndex + 1] = Math.cos(VariableArray[CurrentIndex]);}else{VariableArray[0] = Math.cos(VariableArray[CurrentIndex]);}}if(VariableArray[CopiedPointer] == 2){if(CurrentIndex + 1 != VariableArray.length){VariableArray[CurrentIndex + 1] = Math.tan(VariableArray[CurrentIndex]);}else{VariableArray[0] = Math.tan(VariableArray[CurrentIndex]);}}";
        }
        if(AlexCodeInput[i] == "="){
            EvalString += "VariableArray[CurrentIndex] = VariableArray[CopiedPointer];"
        }
        
    }
    document.getElementById('Output').value = "Output: \n";
    eval(EvalString);
};
setInterval(function(){
    let StringText = "";
    for(let i = 0; i < VariableArray.length; i++){
        StringText += "|";
        if(CopiedPointer == i){
            StringText += "*";
        } 
        else{
            StringText += " ";
        }
        StringText += VariableArray[i];
        if(CurrentIndex == i){
            StringText += "^";
        }
        else{
            StringText == " ";
        }
    }
    document.getElementById("Variables").value = StringText;
}, 10);
