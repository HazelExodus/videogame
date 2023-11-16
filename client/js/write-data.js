const buttonListener = document.getElementById("submit");
/*buttonListener.addEventListener("click", function() {
    const firstTextBox = document.getElementById("input1");
    const secondTextBox = document.getElementById("input2");
   
    var input1 = firstTextBox.value;
    var input2 = secondTextBox.value;

    var input3 = $("#input3").val();

    console.log(input1);
    console.log(input2);
    console.log(input3);

    alert(input1 + "\n" + input2 + "\n" + input3);

    return false;
});*/
//Hello


$('#data-submit').click(function(){
    var gameName = $('#gameName').val();
    var yearReleased = $('#yearReleased').val()
    var playerType = $('#playerType').val()
    var platforms = $('#platforms').val()
    var rating = $('#rating').val()

    var jsonObject = {
        gameName: gameName, 
        yearReleased: yearReleased,
        playerType: playerType,
        platforms: platforms,
        rating: rating
    };

    $.ajax({
        url: "http://localhost:4000" + "/write-record",
        type: "post",
        data: jsonObject,
        success: function(response) {
            var data = JSON.parse(response);
            if(data.msg == "SUCCESS") {
                alert("Data successfully saved!")
            }else{
                console.log(data.msg);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
});


$("#data-clear").click(function() {
    $("#gameName").val("")
    $("#yearReleased").val("")
    $("#playerType").val("")
    $("#platforms").val("")
    $("#rating").val("")
});


