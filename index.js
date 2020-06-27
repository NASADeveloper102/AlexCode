
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
        if(AlexCodeInput[i] == "("){
            EvalString += "VariableArray[CurrentIndex] = function(){";
        }
        if(AlexCodeInput[i] == ")"){
            EvalString += "}";
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
            EvalString += "VariableArray[CurrentIndex]();"
        }
        if(AlexCodeInput[i] == "p"){
            EvalString += "document.getElementById('Output').value += CurrentString + '\\n'; CurrentString = '';"
        }
        if(AlexCodeInput[i] == "^"){
            console.error("NOT IMPLIMENTED");
        }
    }
    document.getElementById('Output').value = "Output: \n";
    eval(EvalString);
};

