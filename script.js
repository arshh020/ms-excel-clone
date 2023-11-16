$(document).ready(function () {

    let CellContainer = $(".input-cell-container");

    for (let i = 1; i <= 50; i++) {
        let ans = "";

        let n = i;

        while (n > 0) {
            let rem = (n - 1) % 26;
            ans = String.fromCharCode(rem + 65) + ans;
            n = Math.floor((n - 1) / 26);
        }

        let column = $(`<div class="column-name" id="colCod-${ans} colId- ${i}">${ans}</div>`);
        $(".column-name-container").append(column);
        let row = $(`<div class="row-name" id="rowId-${i}">${i}</div>`);
        $(".row-name-container").append(row);

    }

     for(let i = 1; i<=50; i++){
        let cell = $(`<div class="cell-row"></div>`)
        for(let j = 1; j<=50; j++){
                let cellrow = $(`<div class="input-cell" contenteditable="true"></div>`);
                cell.append(cellrow);
            }
    
            CellContainer.append(cell);
        } 
    

});




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
