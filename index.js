// display current day
var today = moment().format("YYYY-MM-DD");
$("#currentDay").html(today);

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

// create time blocks
function createTimeBlocks() {
    var html = "";
    var currentHour = Number(moment().format("HH"));

    var passed = "";

    for(var i = 9; i < 18; i++) {
        var hour = moment(today + " " + pad(i, 2)).format("hA");

        if( i < currentHour )
            passed = "past";
        else if( currentHour <= i && i < currentHour + 1) 
            passed = "present"
        else
            passed = "future";

        var text = localStorage.getItem(i);
        if( !text )
            text = "";
        
        var block = `
            <div id="${i}" class="row time-block">
                <div class="col-md-1 hour">
                    ${hour}
                </div>
                <textarea class="col-md-10 description ${passed}">${text}</textarea>
                <button class="btn saveBtn col-md-1"><i class="fas fa-save"></i></button>
            </div>
        `;

        html += block;
    }
    

    $(".container").html(html);

}

$(document).ready(function () {
    createTimeBlocks();
    
    $(".saveBtn").on("click", function () {        
        var text = $(this).siblings(".description").val();
        var hour = $(this).parent().attr("id");

        // Save text in local storage
        localStorage.setItem(hour, text);
    })
})

