let defaultProperties = {
    "text": "",
    "font-weight": "",
    "font-style": "",
    "text-decoration": "",
    "text-align": "",
    "background-color": "white",
    "color": "black",
    "font-size": 14
}

let cellData = {
    "Sheet1": {}
}

let selectedSheet = "Sheet1";
let totalSheets = 1;

$(document).ready(function () {

    let CellContainer = $(".input-cell-container");

    for (let i = 1; i <= 100; i++) {
        let ans = "";

        let n = i;

        while (n > 0) {
            let rem = (n - 1) % 26;
            ans = String.fromCharCode(rem + 65) + ans;
            n = Math.floor((n - 1) / 26);
        }

        let column = $(`<div class="column-name colId-${i}" id="colCod-${ans}">${ans}</div>`);
        $(".column-name-container").append(column);
        let row = $(`<div class="row-name" id="rowId-${i}">${i}</div>`);
        $(".row-name-container").append(row);

    }

     for(let i = 1; i<=100; i++){
        let row = $(`<div class="cell-row"></div>`)
        for(let j = 1; j<=100; j++){
                let colCode = $(`.colId-${j}`).attr("id").split("-")[1]; 
                let column = $(`<div class="input-cell" contenteditable="false" id="row-${i}-col${j}" data="code-${colCode}"></div>`);
                row.append(column);
            }
    
            CellContainer.append(row);
        }  

        $(".align-icon").click(function(){
            $(".align-icon.selected").removeClass("selected");
            $(this).addClass("selected");
        });

        $(".style-icon").click(function(){
            $(this).toggleClass("selected");
        });

        $(".color-icon").click(function(){
            $(this).toggleClass("selected");
        });

        $(".input-cell").click(function(e){     //e = event
            // console.log(e);
            if(e.ctrlKey){
                let [rowId, colId] = getRowCol(this);
                if(rowId > 1){
                    let topcellSelected = $(`#row-${rowId - 1}-col-${colId}`).hasClass("selected");
                    if(topcellSelected){
                        $(this).addClass("top-cell-selected");
                        $(`#row-${rowId - 1}-col-${colId}`).addClass("bottom-cell-selected"); //given to the cell above
                    }
                }
                if(rowId < 100){
                    let bottomcellSelected = $(`#row-${rowId + 1}-col-${colId}`).hasClass("selected");
                    if(bottomcellSelected){
                        $(this).addClass("bottom-cell-selected");
                        $(`#row-${rowId + 1}-col-${colId}`).addClass("top-cell-selected"); // i am selected for bottom cell
                    }
                }
                if(colId < 100){
                    let rightcellSelected = $(`#row-${rowId}-col-${colId + 1}`).hasClass("selected");
                    if(rightcellSelected){
                        $(this).addClass("right-cell-selected");
                        $(`#row-${rowId}-col-${colId + 1}`).addClass("left-cell-selected");
                    }
                }   
                if(colId > 1){
                    let leftcellSelected = $(`#row-${rowId}-col-${colId - 1}`).hasClass("selected");
                    if(leftcellSelected){
                        $(this).addClass("left-cell-selected");
                        $(`#row-${rowId}-col-${colId - 1}`).addClass("right-cell-selected");
                    }
                }
            }

            else{
            $(".input-cell.selected").removeClass("selected");
            }
            $(this).addClass("selected");
            changeHeader(this);
        });

        function changeHeader(ele){
            let [rowId, colId] = getRowCol(ele);
            let cellInfo = defaultProperties;
            if(cellData[selectedSheet][rowId] && cellData[selectedSheet][rowId][colId]){
                cellInfo = cellData[selectedSheet][rowId][colId];
            }
            cellInfo["font-weight"] ? $(".icon-bold").addClass("selected") : $(".icon-bold").removeClass("selected");
            cellInfo["font-style"] ? $(".icon-italic").addClass("selected") : $(".icon-italic").removeClass("selected");
            cellInfo["text-decoration"] ? $(".icon-underlined").addClass("selected") : $(".icon-underlined").removeClass("selected");
            let alignment = cellInfo["text-align"];
            $(".align-icon.selected").removeClass("selected");
            $(".icon-align-" + alignment).addClass("selected");
        }0


        $(".input-cell").dblclick(function(){
            $(".input-cell.selected").removeClass("selected");
            $(this).addClass("selected");
            $(this).attr("contenteditable", "true");
            $(this).focus();
        });

        $(".input-cell").blur(function(){
            $(".input-cell.selected").attr("contenteditable", "false");
        })

        $(".input-cell-container").scroll(function(){
            $(".column-name-container").scrollLeft(this.scrollLeft);
            $(".row-name-container").scrollTop(this.scrollTop);
        });
        
 

});

function getRowCol(ele){
    let idArray = $(ele).attr("id").split("-");     //row-1-col-1 (1st & 3rd index)
    let rowId = parseInt(idArray[1]);
    let colId = parseInt(idArray[3]);
    return [rowId, colId];
}

function updateCell(property, value, defaultPossible){
    $(".input-cell.selected").each(function(){      //each = for loop
        $(this).css(property, value);
        let[rowId,colId] = getRowCol(this);
        if(cellData[selectedSheet][rowId]){
            if(cellData[selectedSheet][rowId][colId]){ //possible if one col exist, another doesnt
                cellData[selectedSheet][rowId][colId][property] = value;
            }
            else{   //initializing w default prop if col doesnt exist
                cellData[selectedSheet][rowId][colId] = {...defaultProperties}; //spread operator ... used for creating copies
                cellData[selectedSheet][rowId][colId][property] = value;
            }
        }
        else{   //if row doesnt exist column doesnt exist fosho
            cellData[selectedSheet][rowId] = {};        //row created
            cellData[selectedSheet][rowId][colId] = {...defaultProperties};
            cellData[selectedSheet][rowId][colId][property] = value;
        }
        //console.log(defaultPossible, JSON.stringify(cellData[selectedSheet][rowId][colId]) === JSON.stringify(defaultProperties));
        if(defaultPossible && (JSON.stringify(cellData[selectedSheet][rowId][colId]) === JSON.stringify(defaultProperties))){
            delete cellData[selectedSheet][rowId][colId];
            if(Object.keys(cellData[selectedSheet][rowId]).length == 0){
                cellData[selectedSheet][rowId];
            }
        }

    });
    console.log(cellData);
}

$(".icon-bold").click(function(){
    if($(this).hasClass("selected")){
        updateCell("font-weight", "", true);
    }
    else{
        updateCell("font-weight", "bold", false);
    }
})

$(".icon-italic").click(function(){
    if($(this).hasClass("selected")){
        updateCell("font-style", "", true);
    }
    else{
        updateCell("font-style", "italic", false);
    }
})

$(".icon-underlined").click(function(){
    if($(this).hasClass("selected")){
        updateCell("text-decoration", "", true);
    }
    else{
        updateCell("text-decoration", "underline", false);
    }
})

$(".icon-align-left").click(function(){
    if(!$(this).hasClass("selected")){
        updateCell("text-align", "left", true); //default
    }
})

$(".icon-align-right").click(function(){
    if(!$(this).hasClass("selected")){
        updateCell("text-align", "right", false); 
    }
})

$(".icon-align-center").click(function(){
    if(!$(this).hasClass("selected")){
        updateCell("text-align", "center", false);
    }
})

$(".icon-color-fill").click(function(){
    if($(this).hasClass("selected")){
        updateCell("background-color", "white", true);
    }
    else{
        updateCell("background-color", "green", false);
    }
})

$(".icon-color-text").click(function(){
    if($(this).hasClass("selected")){
        updateCell("color", "black", true);
    }
    else{
        updateCell("color", "red", false);
    }
})



//



/*let ans = "";

let n = 27;

while(n > 0){
    let rem = n % 26;
    if(rem == 0){
        ans = "Z" + ans;
        n = Math.floor(n/26) - 1;
    }
    else{
        ans = String.fromCharCode((rem-1)+26) + ans;
        n = Math.floor(n/26);
    }
}

console.log(ans);
*/
