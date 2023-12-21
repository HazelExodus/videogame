var data = [];
var activeData = 0;

var app = angular.module("browseApp", []);

app.controller('browseCTRL', function($scope, $http) {
    $scope.obj = {};

    $scope.get_records = function() {
        $http({
            method: "get",
            url: "http://localhost:4000" + "/get-records"
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                data = response.data.libraryData;
                console.log(data);
                $scope.obj = data[activeData];$scope.showHide();
            }else{
                console.log(response.data.msg);
            }
        }, function(response) {
            console.log(response);
        })
    }

    $scope.get_records();

    $scope.redrawTable = function() {
        var yearReleased = $scope.selectedType.value;
    
        $http({
            method: "get",
            url: "http://localhost:4000" + "/get-record",
            params: {yearReleased: yearReleased}
        
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                $scope.records = response.data.records;
            }
    
        }, function(response) {
            console.log(response);
        });
    } 

    $scope.changeData = function(direction){
        activeData += direction;
        $scope.obj = data[activeData];
        $scope.showHide(); //calling $scope.showHide();
    }

    $scope.showHide = function() {
        $scope.hidePrev = (activeData === 0) ? true: false; //setting hidePrev to true otherwise false
        $scope.hideNext = (activeData === data.length-1) ? true: false; //setting hideNext to true otherwise false
    }
});