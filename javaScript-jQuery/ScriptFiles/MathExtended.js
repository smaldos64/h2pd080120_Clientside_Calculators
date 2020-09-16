MathArray = [];

Counter = 0;
MathOperationValue = -1;

const CalculatorModeEnum = Object.freeze({ "NewCalculation": 1, "CalculationOnPrevioiusResult": 2 });
let CalculatorMode = CalculatorModeEnum.NewCalculation;

const CalculationTypeEnum = Object.freeze({ "CalculateOn2Numbers": 1, "CalculateOn1Number": 2 });
let CalculationType = CalculationTypeEnum.CalculateOn2Numbers;


CalculatorLine1 = null;
CalculatorLine2 = null;
TextBoxElements = null;

function MakeMathNumericKeys() {
    CalculatorLine1 = document.getElementById("txtCalculatorLine1");
    CalculatorLine2 = document.getElementById("txtCalculatorLine2");
    TextBoxElements = document.getElementsByName("txtCalculatorLine");

    for (Counter = 9; Counter >= 0; Counter--) {
        MathArray.push({
            //Text: Counter.toString(), ID: "btn" + Counter.toString(), BackgroundColor: "blue", TextColor: "white", MathOperation: function (Counter) { AddNumericCharacterToTextBox(Counter) }
            Text: Counter.toString(), ID: "btn" + Counter.toString(), OperatorValue: Counter, BackgroundColor: "blue", TextColor: "white", MathOperation: "AddNumericCharacterToTextBox(" + Counter + ")", MathOperationCalculate: null 
        });
    }

    Counter = MathArray.length;
    TextHolder = '.';
    MathArray.push({
        Text: TextHolder, ID: "btn" + TextHolder, OperatorValue: Counter++, BackgroundColor: "red", TextColor: "white", MathOperation: "AddNumericCharacterToTextBox('" + "." + "')", MathOperationCalculate: null
    });

    Counter = MathArray.length;
    TextHolder = '+/-';
    MathArray.push({
        Text: TextHolder, ID: "btnPlusMinus" + TextHolder, OperatorValue: Counter++, BackgroundColor: "red", TextColor: "white", MathOperation: "AddNumericCharacterToTextBox('" + "±" + "')", MathOperationCalculate: null
    });
}

function MakeMathOperationKeys() {
    Counter = MathArray.length;

    TextHolder = 'C';
    MathArray.push({
        Text: TextHolder, ID: "btn" + TextHolder, OperatorValue: Counter++, BackgroundColor: "red", TextColor: "white", MathOperation: "ClrDisplayAndStatus()", MathOperationCalculate: null 
    });

    TextHolder = '<-';
    MathArray.push({
        Text: TextHolder, ID: "btn" + TextHolder, OperatorValue: Counter++, BackgroundColor: "red", TextColor: "white", MathOperation: "ClrLastCharacter()", MathOperationCalculate: null
    });

    TextHolder = '=';
    MathArray.push({
        Text: TextHolder, ID: "btnEqual", OperatorValue: Counter++, BackgroundColor: "red", TextColor: "white", MathOperation: "CalcMathResult()", MathOperationCalculate: null
    });

    TextHolder = '+';
    MathArray.push({
        Text: TextHolder, ID: "btn" + TextHolder, OperatorValue: Counter, BackgroundColor: "green", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ",'" + TextHolder + "')", MathOperationCalculate: function (a, b) { return a + b }
    });
    Counter++;

    TextHolder = '-';
    MathArray.push({
        Text: TextHolder, ID: "btn" + TextHolder, OperatorValue: Counter, BackgroundColor: "green", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ",'" + TextHolder + "')", MathOperationCalculate: function (a, b) { return a - b }
    });
    Counter++;

    TextHolder = '*';
    MathArray.push({
        Text: TextHolder, ID: "btn" + TextHolder, OperatorValue: Counter, BackgroundColor: "green", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ",'" + TextHolder + "')", MathOperationCalculate: function (a, b) { return a * b }
    });
    Counter++;

    TextHolder = '/';
    MathArray.push({
        Text: TextHolder, ID: "btn" + TextHolder, OperatorValue: Counter, BackgroundColor: "green", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ",'" + TextHolder + "')", MathOperationCalculate: function (a, b) { return a / b }
    });
    Counter++;

    TextHolder = '%';
    MathArray.push({
        Text: TextHolder, ID: "btn" + TextHolder, OperatorValue: Counter, BackgroundColor: "green", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ",'" + TextHolder + "')", MathOperationCalculate: function (a, b) { return (b / 100) * a }
    });
    Counter++;

    TextHolder = '&';
    MathArray.push({
        Text: TextHolder, ID: "btn" + TextHolder, OperatorValue: Counter, BackgroundColor: "green", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ",'" + TextHolder + "')", MathOperationCalculate: function (a, b) { return a & b }
    });
    Counter++;

    TextHolder = '|';
    MathArray.push({
        Text: TextHolder, ID: "btn" + TextHolder, OperatorValue: Counter, BackgroundColor: "green", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ",'" + TextHolder + "')", MathOperationCalculate: function (a, b) { return a | b }
    });
    Counter++;

    TextHolder = 'x^y';
    MathArray.push({
        Text: TextHolder, ID: "btn" + TextHolder, OperatorValue: Counter, BackgroundColor: "green", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ",'" + TextHolder + "')", MathOperationCalculate: function (a, b) { return Math.pow(a, b) }
    });
    Counter++;

    TextHolder = 'x^2';
    MathArray.push({
        Text: TextHolder, ID: "btn" + TextHolder, OperatorValue: Counter, BackgroundColor: "green", TextColor: "white", MathOperation: "CalcMathResult(" + Counter + ")", MathOperationCalculate: function (a) { return Math.pow(a, 2) }
    });
    Counter++;
}

function AddButtonsToPage() {
    for (Counter = 0; Counter < MathArray.length; Counter++) {
        if (0 == Counter % 3) {
            
            var pre = document.createElement("pre");
            document.getElementsByClassName("CalculatorButtons")[0].appendChild(pre);
        }

        var button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('ID', MathArray[Counter].ID);
        button.setAttribute('value', MathArray[Counter].Text);
        button.setAttribute('onclick', MathArray[Counter].MathOperation);
        button.style.backgroundColor = MathArray[Counter].BackgroundColor;
        button.style.color = MathArray[Counter].TextColor;
        button.style.width = "100px";
        button.style.height = "40px";
        //document.body.appendChild(button);
        document.getElementsByClassName("CalculatorButtons")[0].appendChild(button);
    }
}

function ClrDisplayAndStatus() {
    Counter = 0;
    while (Counter < TextBoxElements.length) {
        TextBoxElements[Counter].value = "";
        Counter++;
    }
}

function ClrLastCharacter() {
    if (CalculatorLine2.value.length > 0) {
        CalculatorLine2.value = CalculatorLine2.value.substring(0, CalculatorLine2.value.length - 1);
    }
}

function AddNumericCharacterToTextBox(argument) {
    if (CalculatorModeEnum.CalculationOnPrevioiusResult == CalculatorMode) {
        CalculatorMode = CalculatorModeEnum.NewCalculation;
        ClrDisplayAndStatus();
    }

    if ('±' == argument) {
        if (CalculatorLine2.value.length > 0) {
            if (CalculatorLine2.value.charAt(0) != '-') {
                CalculatorLine2.value = '-' + CalculatorLine2.value;
            }
            else {
                CalculatorLine2.value = CalculatorLine2.value.substring(1);
            }
        }
        return;
    }

    if (0 == argument) {
        if ((1 == CalculatorLine2.value.length) && ('0' == CalculatorLine2.value)) {
            return;
        }
    }

    if (('.' == argument) && (CalculatorLine2.value.search('.') != -1)) {
            return;
    }
    
    if ((1 == CalculatorLine2.value.length) && ('0' == CalculatorLine2.value) &&
        (argument != '.')) {
        CalculatorLine2.value = argument;
        return;
    }

    CalculatorLine2.value = CalculatorLine2.value + argument.toString();
}

function GetMathStringFromCalculatorLine1(CalculatorLine1Here) {
    var SpacePosition = CalculatorLine1Here.search(' ');
    if (SpacePosition > 0) {
        CalculatorLine1Here = CalculatorLine1Here.substring(0, SpacePosition);
        return CalculatorLine1Here;
    }
}

function SetMathOperatorValue(Value, ValueText) {
    if ((0 != CalculatorLine2.value.length) || (0 != CalculatorLine1.value.length) ) {
        MathOperationValue = Value;
        if (CalculatorModeEnum.CalculationOnPrevioiusResult == CalculatorMode) {
            CalculatorLine1.value = CalculatorLine2.value + " " + ValueText;
        }
        else {
            if (0 == CalculatorLine1.value.length) {
                CalculatorLine1.value = CalculatorLine2.value + " " + ValueText;
                CalculatorLine2.value = "";
            }
            else {
                var SpacePosition = CalculatorLine1.value.search(' ');
                if (SpacePosition > 0) {
                    CalculatorLine1.value = CalculatorLine1.value.substring(0, SpacePosition);
                    CalculatorLine1.value += " " + ValueText;
                }
            }
        }
    }
}

function CalcMathResult(Value) {
    if ((null != Value) && (0 != CalculatorLine2.value.length)) {
        MathOperationValue = Value;
        CalculationType = CalculationTypeEnum.CalculateOn1Number;
        MathOperationResult = CalculateMathResult(MathOperationValue,
            GetMathStringFromCalculatorLine1(CalculatorLine1.value),
            CalculatorLine2.value);
        CalculatorLine2.value = MathOperationResult;
    }
    else {
        if ((0 != CalculatorLine1.value.length) && (0 != CalculatorLine2.value.length)) {
            CalculationType = CalculationTypeEnum.CalculateOn2Numbers;
            MathOperationResult = CalculateMathResult(MathOperationValue,
                GetMathStringFromCalculatorLine1(CalculatorLine1.value),
                CalculatorLine2.value);
            //ClrDisplayAndStatus();
            CalculatorLine2.value = MathOperationResult;
        }
    }
}

function CalculateMathResult(MathOperation, Value1String, Value2String) {
    Counter = 0;
    MathOperationFound = false;
    var Result;

    while ((Counter < MathArray.length) && (false == MathOperationFound)) {
        if (MathArray[Counter].OperatorValue == MathOperation) {
            MathOperationFound = true;
            if (CalculationTypeEnum.CalculateOn2Numbers == CalculationType) {
                CalculatorLine1.value = Value1String + " " + MathArray[Counter].Text + " " + Value2String + " " + "="
                Result = (MathArray[Counter].MathOperationCalculate(parseFloat(Value1String), parseFloat(Value2String)).toString());
            }
            else {
                CalculatorLine1.value = MathArray[Counter].Text + " " + Value2String + " " + "=";
                Result = (MathArray[Counter].MathOperationCalculate(parseFloat(Value2String)).toString());
            }
            CalculatorMode = CalculatorModeEnum.CalculationOnPrevioiusResult;
            return Result;
            //return (MathArray[Counter].MathOperationCalculate(parseFloat(Value1String), parseFloat(Value2String)).toString());
        }
        else {
            Counter++;
        }
    }

    if (false == MathOperationFound) {
        alert("Der er noget galt i dit program ---> Spaghetti programmør !!!");
    }
}