myapp.factory('chatSocket', function (socketFactory) {
      var chatSocket = socketFactory();
      chatSocket.forward('broadcast');
      return chatSocket;
  });

myapp.factory('socket', function() {
    var socket = io.connect();
    return socket;
})


myapp.controller('chatCtrl', function ($log, $scope, chatSocket,socket) {
          $scope.username = "";
          $scope.messageLog = [];//'Ready to chat!';

           socket.emit('getAllMessage','new user joined');

          
	      $scope.sendMessage = function() {
		      console.log("message ",$scope.message)
			  $log.debug('sending message', $scope.message);
			  chatSocket.emit('message',  $scope.username, $scope.message);
			  $log.debug('message sent', $scope.message);
			  $scope.message = '';
			  var messages = $('.messages');
			  // messages.animate({ scrollTop: messages.prop('scrollHeight') }, 300);
			 messages.animate({ scrollTop: messages[0].scrollHeight }, 300);
		  };

		 $scope.$on('socket:broadcast', function(event, data) {
		      $scope.$apply(function() {

		      	if(data.messages !=undefined && data.messages !==null){

		      		console.log(data)
		     
		    		 //$scope.messageLog.push({'source':data.source,'message':data.message})
		    		$scope.messageLog=data.messages;
		    		$scope.messageLog.sort(dynamicSort1("date"));
		    		$scope.messageBasedOnDate = groupBy( $scope.messageLog, 'date');

		    		for (i in $scope.messageBasedOnDate){
		    			$scope.messageBasedOnDate[i].sort(dynamicSort2("created_at"));
		    		}

		    		
		    		console.log("$scope.messageBasedOnDate",$scope.messageBasedOnDate);
		    		var messages = $('.messages');
		    		setTimeout(function () {
				      messages.animate({ scrollTop: messages[0].scrollHeight }, 300);
				    }, 0);

		      	}

			    if(data.totalUser!=undefined && data.totalUser!=null){
			      	console.log("data.totalUser",data.totalUser)
			      	$scope.totalUser=data.totalUser;
			    }
			    
		  	});

		});

	socket.on('connect', function() {
         console.log("new user connected")
         socket.emit('newUserAdded','new user joined');
         socket.emit('getAllMessage','new user joined');
    })

    socket.on('typing', function(data) {
        	$scope.name=data.name;
    		
    		$scope.$apply(function () {
	            $scope.typeMessage = $scope.name + " is typing...";
		    });

    		setTimeout(function () {
    			$scope.$apply(function () {
		            $scope.typeMessage = "";
		        });
		    }, 3000);
    })




    $scope.keyUp=function(event){
    	//console.log(event.message);
    	 socket.emit('typing',{"name":$scope.username});
    }

    function groupBy(arr, property) {
	  return arr.reduce(function(memo, x) {
	    if (!memo[x[property]]) { memo[x[property]] = []; }
	    memo[x[property]].push(x);
	    return memo;
	  }, {});
	}

	function dynamicSort1(property) {
	    var sortOrder = 1;
	    if(property[0] === "-") {
	        sortOrder = -1;
	        property = property.substr(1);
	    }
	    return function (a,b) {
	        var result = (a[property] < b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
	        return result * sortOrder;
	    }
	}

	function dynamicSort2(property) {
	    var sortOrder = 1;
	    if(property[0] === "-") {
	        sortOrder = -1;
	        property = property.substr(1);
	    }
	    return function (a,b) {
	        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
	        return result * sortOrder;
	    }
	}
});
