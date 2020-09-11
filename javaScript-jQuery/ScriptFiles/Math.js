MathArray = [];

Counter = 0;
MathArray.push({
    Operator: '+', OperatorValue: Counter++, MathOperation: function (a, b) { return a + b }
});

MathArray.push({
    Operator: '-', OperatorValue: Counter++, MathOperation: function (a, b) { return a - b }
});

MathArray.push({
    Operator: '*', OperatorValue: Counter++, MathOperation: function (a, b) { return a * b }
});

MathArray.push({
    Operator: '/', OperatorValue: Counter++, MathOperation: function (a, b) { return a / b }
});

MathArray.push({
    Operator: '%', OperatorValue: Counter++, MathOperation: function (a, b) { return a / b * 100 }
});

MathArray.push({
    Operator: '&', OperatorValue: Counter++, MathOperation: function (a, b) { return a & b}
});

MathArray.push({
    Operator: '2*a + 3*b', OperatorValue: Counter++, MathOperation: function (a, b) { return 2*a + 3*b }
});

MathArray.push({
    Operator: '|', OperatorValue: Counter++, MathOperation: function (a, b) { return a | b }
});

MathArray.push({
    Operator: 'Pow', OperatorValue: Counter++, MathOperation: function (a, b) { return Math.pow(a, b) }
});


function ClearTextBoxes(TextBoxArray) {
    Counter = 0;
    while (Counter < TextBoxArray.length) {
        TextBoxArray[Counter].value = "";
        Counter++;
    }
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