//LTPE kommentar 1 : Indsæt en ny entry i enum erklæringen herunder. Denne entry kan med fordel være sigende omkring
//hvilken matematisk operation den skal udføre.

enum MathOperation_ENUM {
    Add_Operation,
    Subtract_Operation,
    Multiply_Operation,
    Divide_Operation,
    Percentage_Operation,
    BitWise_And_Operation,
    BitWise_Or_Operation,
    Raised_To_Power,
    Kombinations
}

type MathFunctionParams = { Value1: number, Value2: number }
type MathDelegate = (params: MathFunctionParams) => number;
type MathDelegateOld = (Value1: number, Value2: number) => number;

let MathOperationIndex : number = -1;
let MathOperationIndexNumberInList: number = 0;
let MathOperationHistoryList = [];

class MathOperation {
    public ThisMathOperation : MathOperation_ENUM;
    public ThisMathOperationString : string;
    public ThisMathDelegate : MathDelegate;
    public ThisMathOperationResult : number;
    public ThisValue1 : number;
    public ThisValue2 : number;

    constructor(params: {
        ThisMathOperation : MathOperation_ENUM,
        ThisMathOperationString : string,
        ThisMathDelegate : MathDelegate} ) {
        this.ThisMathOperation = params.ThisMathOperation;
        this.ThisMathOperationString = params.ThisMathOperationString;
        this.ThisMathDelegate = params.ThisMathDelegate;

        this.ThisMathOperationResult = 0;
        this.ThisValue1 = 0;
        this.ThisValue2 = 0;
    }

    public PerformMathOperation(params: { Value1 : number, Value2 : number }) : string {
        this.ThisMathOperationResult = this.ThisMathDelegate({ Value1: params.Value1, Value2: params.Value2 });
        this.ThisValue1 = params.Value1;
        this.ThisValue2 = params.Value2;
        return (this.ThisMathOperationResult.toString());
    }

    public toString = () : string => {
        return `(${this.ThisMathOperationResult})`;
    }
}

class MathOperationHistory extends MathOperation {
    public ThisIndexInList: number;

    constructor(params: {
        MathOperation_Object : MathOperation,
        ThisIndexInList : number
    }) {
        super({
            ThisMathOperation: params.MathOperation_Object.ThisMathOperation,
            ThisMathOperationString: params.MathOperation_Object.ThisMathOperationString,
            ThisMathDelegate: params.MathOperation_Object.ThisMathDelegate
        });
        this.ThisIndexInList = params.ThisIndexInList;
    }
}

function Add(params: MathFunctionParams) : number{
    return (params.Value1 + params.Value2);
}

function Subtract(params: { Value1 : number, Value2 : number }) : number {
    return (params.Value1 - params.Value2);
}

//function Kombinations(Value1: number): number {
function Kombinations(params: { Value1: number, Value2: number }): number {
    let StartNumber: number = params.Value1;
    let KombinationResult: number = 1;

    while (StartNumber > 0) {
        KombinationResult = KombinationResult * StartNumber;
        StartNumber--;
    }
    return (KombinationResult);
}

//LTPE kommentar 2 : Brug den nye entry i enum erklæringen herunder. Det burde være ok selvforklarende ved at se på 
// de allerede eksiterende entries i listen herunder, hvordan en ny matematisk operation defineres.
let TypeScriptMathArray = [
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.Add_Operation, ThisMathOperationString: "+", ThisMathDelegate: Add }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.Subtract_Operation, ThisMathOperationString: "-", ThisMathDelegate: function (params: { Value1: number, Value2: number }) { return (params.Value1 - params.Value2) } }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.Multiply_Operation, ThisMathOperationString: "*", ThisMathDelegate: function (params: { Value1: number, Value2: number }) { return (params.Value1 * params.Value2) } }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.Divide_Operation, ThisMathOperationString: "/", ThisMathDelegate: function (params: { Value1: number, Value2: number }) { return (params.Value1 / params.Value2) } }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.Percentage_Operation, ThisMathOperationString: "%", ThisMathDelegate: function (params: { Value1: number, Value2: number }) { return (params.Value1 / params.Value2 * 100) } }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.BitWise_And_Operation, ThisMathOperationString: "&", ThisMathDelegate: function (params) { return (params.Value1 & params.Value2); } }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.BitWise_Or_Operation, ThisMathOperationString: "|", ThisMathDelegate: function (params) { return (params.Value1 | params.Value2); } }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.Raised_To_Power, ThisMathOperationString: "^", ThisMathDelegate: function (params) { return (Math.pow(params.Value1, params.Value2)); } }),
    new MathOperation({ ThisMathOperation: MathOperation_ENUM.Kombinations, ThisMathOperationString: "Komb", ThisMathDelegate: Kombinations } )
];

function TypeScriptClearTextBoxes(params: { TextBoxArray: HTMLInputElement[] } ) : void {
    let Counter : number = 0;
    while (Counter < params.TextBoxArray.length) {
        params.TextBoxArray[Counter].value = "";
        Counter++;
    }
}

function TypeScriptCalculateMathResult(params : { MathOperation : number, Value1String: string, Value2String: string }) : string {
    let Counter : number = 0;
    let MathOperationFound : boolean = false;

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

function GetTemplateStringFromMathOperation(params: { MathOperation_Object : MathOperation}) : string {
    let MathTemplateString: string = "";

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

function AddMathOperationToMathOperationStack(params: { MathOperation_Object: MathOperation }) : number {
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

function FindIndexInMathOperationList(params: { IndexInArray: number }): number {
    let Counter: number = 0;

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

function DeleteTypeScriptMathOperationInList(params: { IndexInArray: number }): boolean {
    let Counter: number = -1;
    
    Counter = FindIndexInMathOperationList({ IndexInArray: params.IndexInArray });
    if (Counter >= 0) {
        MathOperationHistoryList.splice(Counter, 1);
        return (true);
    }

    return (false);
}

function GetMathOperationInStack(params: { IndexInArray: number }): MathOperationHistory {
    let Counter: number = -1;

    Counter = FindIndexInMathOperationList({ IndexInArray: params.IndexInArray });

    if (Counter >= 0) {
        return (MathOperationHistoryList[Counter]);
    }
    else {
        return (null);
    }
}

function GetNumberOfMathOperationsInStack(): number {
    return (MathOperationHistoryList.length);
}

