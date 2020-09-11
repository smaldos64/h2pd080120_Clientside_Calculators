//LTPE kommentar 1 : Indsæt en ny entry i enum erklæringen herunder. Denne entry kan med fordel være sigende omkring
//hvilken matematisk operation den skal udføre.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MathOperation_ENUM;
(function (MathOperation_ENUM) {
    MathOperation_ENUM[MathOperation_ENUM["Add_Operation"] = 0] = "Add_Operation";
    MathOperation_ENUM[MathOperation_ENUM["Subtract_Operation"] = 1] = "Subtract_Operation";
    MathOperation_ENUM[MathOperation_ENUM["Multiply_Operation"] = 2] = "Multiply_Operation";
    MathOperation_ENUM[MathOperation_ENUM["Divide_Operation"] = 3] = "Divide_Operation";
    MathOperation_ENUM[MathOperation_ENUM["Percentage_Operation"] = 4] = "Percentage_Operation";
    MathOperation_ENUM[MathOperation_ENUM["BitWise_And_Operation"] = 5] = "BitWise_And_Operation";
    MathOperation_ENUM[MathOperation_ENUM["BitWise_Or_Operation"] = 6] = "BitWise_Or_Operation";
    MathOperation_ENUM[MathOperation_ENUM["Raised_To_Power"] = 7] = "Raised_To_Power";
    MathOperation_ENUM[MathOperation_ENUM["Kombinations"] = 8] = "Kombinations";
})(MathOperation_ENUM || (MathOperation_ENUM = {}));
var MathOperationIndex = -1;
var MathOperationIndexNumberInList = 0;
var MathOperationHistoryList = [];
var MathOperation = /** @class */ (function () {
    function MathOperation(params) {
        var _this = this;
        this.toString = function () {
            return "(" + _this.ThisMathOperationResult + ")";
        };
        this.ThisMathOperation = params.ThisMathOperation;
        this.ThisMathOperationString = params.ThisMathOperationString;
        this.ThisMathDelegate = params.ThisMathDelegate;
        this.ThisMathOperationResult = 0;
        this.ThisValue1 = 0;
        this.ThisValue2 = 0;
    }
    MathOperation.prototype.PerformMathOperation = function (params) {
        this.ThisMathOperationResult = this.ThisMathDelegate({ Value1: params.Value1, Value2: params.Value2 });
        this.ThisValue1 = params.Value1;
        this.ThisValue2 = params.Value2;
        return (this.ThisMathOperationResult.toString());
    };
    return MathOperation;
}());
var MathOperationHistory = /** @class */ (function (_super) {
    __extends(MathOperationHistory, _super);
    function MathOperationHistory(params) {
        var _this = _super.call(this, {
            ThisMathOperation: params.MathOperation_Object.ThisMathOperation,
            ThisMathOperationString: params.MathOperation_Object.ThisMathOperationString,
            ThisMathDelegate: params.MathOperation_Object.ThisMathDelegate
        }) || this;
        _this.ThisIndexInList = params.ThisIndexInList;
        return _this;
    }
    return MathOperationHistory;
}(MathOperation));
function Add(params) {
    return (params.Value1 + params.Value2);
}
function Subtract(params) {
    return (params.Value1 - params.Value2);
}
//function Kombinations(Value1: number): number {
function Kombinations(params) {
    var StartNumber = params.Value1;
    var KombinationResult = 1;
    while (StartNumber > 0) {
        KombinationResult = KombinationResult * StartNumber;
        StartNumber--;
    }
    return (KombinationResult);
}
//LTPE kommentar 2 : Brug den nye entry i enum erklæringen herunder. Det burde være ok selvforklarende ved at se på 
// de allerede eksiterende entries i listen herunder, hvordan en ny matematisk operation defineres.
var TypeScriptMathArray = [
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.Add_Operation, ThisMathOperationString: "+", ThisMathDelegate: Add }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.Subtract_Operation, ThisMathOperationString: "-", ThisMathDelegate: function (params) { return (params.Value1 - params.Value2); } }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.Multiply_Operation, ThisMathOperationString: "*", ThisMathDelegate: function (params) { return (params.Value1 * params.Value2); } }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.Divide_Operation, ThisMathOperationString: "/", ThisMathDelegate: function (params) { return (params.Value1 / params.Value2); } }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.Percentage_Operation, ThisMathOperationString: "%", ThisMathDelegate: function (params) { return (params.Value1 / params.Value2 * 100); } }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.BitWise_And_Operation, ThisMathOperationString: "&", ThisMathDelegate: function (params) { return (params.Value1 & params.Value2); } }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.BitWise_Or_Operation, ThisMathOperationString: "|", ThisMathDelegate: function (params) { return (params.Value1 | params.Value2); } }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.Raised_To_Power, ThisMathOperationString: "^", ThisMathDelegate: function (params) { return (Math.pow(params.Value1, params.Value2)); } }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.Kombinations, ThisMathOperationString: "Komb", ThisMathDelegate: Kombinations })
];
function TypeScriptClearTextBoxes(params) {
    var Counter = 0;
    while (Counter < params.TextBoxArray.length) {
        params.TextBoxArray[Counter].value = "";
        Counter++;
    }
}
function TypeScriptCalculateMathResult(params) {
    var Counter = 0;
    var MathOperationFound = false;
    while ((Counter < TypeScriptMathArray.length) && (false == MathOperationFound)) {
        if (TypeScriptMathArray[Counter].ThisMathOperation == params.MathOperation) {
            MathOperationFound = true;
            MathOperationIndex = Counter;
            return (TypeScriptMathArray[Counter].PerformMathOperation({ Value1: parseFloat(params.Value1String), Value2: parseFloat(params.Value2String) }).toString());
        }
        else {
            Counter++;
        }
    }
    if (false == MathOperationFound) {
        alert("Der er noget galt i dit program ---> Spaghetti programmør !!!");
    }
}
function GetTemplateStringFromMathOperation(params) {
    var MathTemplateString = "";
    MathTemplateString =
        params.MathOperation_Object.ThisMathOperationString +
            " : " +
            params.MathOperation_Object.ThisValue1 +
            params.MathOperation_Object.ThisMathOperationString +
            params.MathOperation_Object.ThisValue2 +
            " = " +
            params.MathOperation_Object.ThisMathOperationResult;
    return (MathTemplateString);
}
function AddMathOperationToMathOperationStack(params) {
    MathOperationIndexNumberInList++;
    MathOperationHistoryList.push(new MathOperationHistory({
        MathOperation_Object: params.MathOperation_Object,
        ThisIndexInList: MathOperationIndexNumberInList
    }));
    MathOperationHistoryList[MathOperationHistoryList.length - 1].ThisValue1 =
        params.MathOperation_Object.ThisValue1;
    MathOperationHistoryList[MathOperationHistoryList.length - 1].ThisValue2 =
        params.MathOperation_Object.ThisValue2;
    MathOperationHistoryList[MathOperationHistoryList.length - 1].ThisMathOperationResult =
        params.MathOperation_Object.ThisMathOperationResult;
    return (MathOperationIndexNumberInList);
}
function FindIndexInMathOperationList(params) {
    var Counter = 0;
    while (Counter < MathOperationHistoryList.length) {
        if (MathOperationHistoryList[Counter].ThisIndexInList == params.IndexInArray) {
            return (Counter);
        }
        else {
            Counter++;
        }
    }
    return (-1);
}
function DeleteTypeScriptMathOperationInList(params) {
    var Counter = -1;
    Counter = FindIndexInMathOperationList({ IndexInArray: params.IndexInArray });
    if (Counter >= 0) {
        MathOperationHistoryList.splice(Counter, 1);
        return (true);
    }
    return (false);
}
function GetMathOperationInStack(params) {
    var Counter = -1;
    Counter = FindIndexInMathOperationList({ IndexInArray: params.IndexInArray });
    if (Counter >= 0) {
        return (MathOperationHistoryList[Counter]);
    }
    else {
        return (null);
    }
}
function GetNumberOfMathOperationsInStack() {
    return (MathOperationHistoryList.length);
}
//# sourceMappingURL=Math_TypeScript.js.map