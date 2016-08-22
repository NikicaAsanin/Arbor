var app = angular.module('arborApp', []);
app.controller('homePageController', function($scope, $http) {

  $scope.present = [];
  $scope.absent = [];
  $scope.late = [];
  $scope.unmarked = 0;

  $http.get("students.json").then(function(response) {
      $scope.students = response.data;
      $scope.unmarked = response.data.length;
  });

  $scope.doReset = function(){
  	for(var i=1;i<=$scope.students.length;i++){
  		$("#marked"+i).hide();
  		$("#list"+i).show();

  	}
  	$scope.present = [];
  	$scope.absent = [];
  	$scope.late = [];
  	$scope.unmarked = $scope.students.length;

 
  }

 

  $scope.doDone = function(){
  	if($scope.unmarked == 0){
  		$("#statsModal").modal("show");
  	}else{
		$("#warningModal").modal("show");
  	}
  }

   

  $scope.doPresent = function(student){
  		$scope.present.push(student);
  		$scope.unmarked = $scope.unmarked - 1;
  		$("#marked"+student.id).show();
  		$("#icon"+student.id).addClass("glyphicon glyphicon-ok icon-present");
      $("#icon"+student.id).removeClass("glyphicon-time icon-late glyphicon-remove icon-absent");
  		$("#text"+student.id).text("Attanded");
      $("#text"+student.id).addClass("icon-present");
      $("#text"+student.id).removeClass("icon-late icon-absent");
  		$("#list"+student.id).hide();
  }
  $scope.doLate = function(student){
  		$scope.late.push(student);
  		$scope.unmarked = $scope.unmarked - 1;
  		$("#marked"+student.id).show();
  		$("#icon"+student.id).addClass("glyphicon glyphicon-time icon-late");
      $("#icon"+student.id).removeClass("glyphicon-ok icon-present glyphicon-remove icon-absent");
  		$("#text"+student.id).text("Late");
      $("#text"+student.id).addClass("icon-late");
      $("#text"+student.id).removeClass("icon-present icon-absent");
  		$("#list"+student.id).hide();
  }
  $scope.doAbsent = function(student){
  		$scope.absent.push(student);
  		$scope.unmarked = $scope.unmarked - 1;
  		$("#marked"+student.id).show();
  		$("#icon"+student.id).addClass("glyphicon glyphicon-remove icon-absent");
      $("#icon"+student.id).removeClass("glyphicon-ok icon-present glyphicon-time icon-late");
  		$("#text"+student.id).text("Absent");
      $("#text"+student.id).addClass("icon-absent");
      $("#text"+student.id).removeClass("icon-present icon-late");
  		$("#list"+student.id).hide();
  }
});
