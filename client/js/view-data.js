
retrieveData();

function retrieveData(){
    $.ajax({
        url: "http://localhost:4000" + '/get-records',
        get: 'get',
        success: function(response){
            var data = JSON.parse(response);
            if(data.msg == "SUCCESS"){
                createTable(data.libraryData);
console.log(response);
            }else{
                console.log(data.msg);
            }

        },
        error: function(err) {
            console.log(err)
        }
    });
}

function createTable(data){
        var holding = "";
        for(i=0; i < data.length; i++){
          
            holding += "<tr>"
            holding += "<td>" + data[i].gameName +  "</td>";
            holding += "<td>" + data[i].yearReleased + "</td>";
            holding += "<td>" + data[i].playerType + "</td>";
            holding += "<td>" + data[i].platforms + "</td>";
            holding += "<td>" + data[i].rating + "</td>";

            holding += "<td>"
                holding += "<button class='btnDelete' data-id='" + data[i].id + "'>Delete</button> "
            holding += "</td>"

            holding += "</tr>"

            // <button class="btnDelete" data-id="">Delete</button> //delete data table

        }
        
        
        $("#dataTable").html(holding);

        deleteRow();


}

function deleteRow() {
    $('.btnDelete').click(function() {
        var deleteID = this.getAttribute("data-id");

        $.ajax({
            url:"http://localhost:4000" + "/delete-record",
            type: "delete",
            data: {deleteID: deleteID},
            success: function(response){
                if(response = "SUCCESS") {
                    retrieveData();
                }else {
                    alert(response);
                }
            } ,
            error: function(err){
                alert(err);
            }
        });
    })
}