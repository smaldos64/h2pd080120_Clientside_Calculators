MathArray = [];

Counter = 0;
MathOperationValue = -1;

function MaKeMathNumericKeys() {
    for (Counter = 9; Counter >= 0; Counter--) {
        MathArray.push({
            //Text: Counter.toString(), ID: "btn" + Counter.toString(), BackgroundColor: "blue", TextColor: "white", MathOperation: function (Counter) { AddNumericCharacterToTextBox(Counter) }
            Text: Counter.toString(), ID: "btn" + Counter.toString(), OperatorValue: Counter++, BackgroundColor: "blue", TextColor: "white", MathOperation: "AddNumericCharacterToTextBox(" + Counter + ")", MathOperationCalculate: null 
        });
    }
}

function MakeMathOperationKeys() {
    Counter = MathArray.length;

    MathArray.push({
        Text: 'Clr', ID: "btnClr", OperatorValue: Counter++, BackgroundColor: "blue", TextColor: "white", MathOperation: "ClrDisplayAndStatus()", MathOperationCalculate: null 
    });

    MathArray.push({
        Text: '=', ID: "btnEqual", OperatorValue: Counter++, BackgroundColor: "blue", TextColor: "white", MathOperation: function () { ClrDisplayAndStatus() }
    });

    MathArray.push({
        Text: '+', ID: "btn+", OperatorValue: Counter, BackgroundColor: "blue", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ")",  MathOperationCalculate: function (a, b) { return a + b }
    });
    Counter++;

    MathArray.push({
        Text: '-', ID: "btn-", OperatorValue: Counter, BackgroundColor: "blue", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ")", MathOperationCalculate: function (a, b) { return a - b }
    });
    Counter++;

    MathArray.push({
        Text: '*', ID: "btn*", OperatorValue: Counter, BackgroundColor: "blue", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ")", MathOperationCalculate: function (a, b) { return a * b }
    });
    Counter++;

    MathArray.push({
        Text: '/', ID: "btn/", OperatorValue: Counter, BackgroundColor: "blue", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ")", MathOperationCalculate: function (a, b) { return a / b }
    });
    Counter++;

    MathArray.push({
        Text: '%', ID: "btn%", OperatorValue: Counter, BackgroundColor: "blue", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ")", MathOperationCalculate: function (a, b) { return a / b * 100 }
    });
    Counter++;

    MathArray.push({
        Text: '&', ID: "btn&", OperatorValue: Counter, BackgroundColor: "blue", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ")", MathOperationCalculate: function (a, b) { return a & b }
    });
    Counter++;

    MathArray.push({
        Text: '|', ID: "btn|", OperatorValue: Counter, BackgroundColor: "blue", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ")", MathOperationCalculate: function (a, b) { return a | b }
    });
    Counter++;

    MathArray.push({
        Text: 'Pow', ID: "btnPow", OperatorValue: Counter, BackgroundColor: "green", TextColor: "white", MathOperation: "SetMathOperatorValue(" + Counter + ")", MathOperationCalculate: function (a, b) { return Math.pow(a, b) }
    });
    Counter++;
}

function AddButtonsToPage() {
    for (Counter = 0; Counter < MathArray.length; Counter++) {
        if (0 == Counter % 3) {
            document.body.write("\n");
        }

        var button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('ID', MathArray[Counter].ID);
        button.setAttribute('value', MathArray[Counter].Text);
        button.setAttribute('onclick', MathArray[Counter].MathOperation);
        //button.setAttribute('form', 'myform');
        button.style.backgroundColor = MathArray[Counter].BackgroundColor;
        button.style.color = MathArray[Counter].TextColor;
        button.style.width = "150";
        document.body.appendChild(button);
        //button.setAttribute("class", "btn btn-primary");
        //$('#button').addClass('myClass');
        //$('#btnSendMailClone').css("margin-right", "100px")
        //$('#btnSendMailClone').css("width", "98");
    }
}

function ClrDisplayAndStatus() {
    TextBoxElements = document.getElementsByName("txtCalculatorLine");

    Counter = 0;
    while (Counter < TextBoxElements.length) {
        TextBoxElements[Counter].value = "";
        Counter++;
    }
    //document.getElementById("txtCalculatorLine").value = "";
}

function AddNumericCharacterToTextBox(argument) {
    document.getElementById("txtCalculatorLine2").value =
        document.getElementById("txtCalculatorLine2").value + argument.toString();
}

function ClearTextBoxes(TextBoxArray) {
    Counter = 0;
    while (Counter < TextBoxArray.length) {
        TextBoxArray[Counter].value = "";
        Counter++;
    }
}

function SetMathOperatorValue(Argument) {
    MathOperationValue = Argument;
}

function CalcMathResult() {
    Value = parseInt(document.getElementById("SelectMathOperation").value);
    MathOperationResult = CalculateMathResult(Value,
        document.getElementById("txtCalculatorLine1").value,
        document.getElementById("txtCalculatorLine2").value);
    document.getElementById("txtResult").value = MathOperationResult;
}

function CalculateMathResult(MathOperation, Value1String, Value2String) {
    Counter = 0;
    MathOperationFound = false;

    while ((Counter < MathArray.length) && (false == MathOperationFound)) {
        if (MathArray[Counter].OperatorValue == MathOperation) {
            MathOperationFound = true;
            return (MathArray[Counter].MathOperation(parseFloat(Value1String), parseFloat(Value2String)).toString());
        }
        else {
            Counter++;
        }
    }

    if (false == MathOperationFound) {
        alert("Der er noget galt i dit program ---> Spaghetti programmør !!!");
    }
}