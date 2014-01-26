var fs = require("fs");
var express = require("express");

console.log("Starting");
var config = JSON.parse(fs.readFileSync("config_server.json"));
var host = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;


var app = express();

app.use(app.router);
app.use(express.static(__dirname + "/public"));

app.get("/", function(request, response) {
	response.send("hello!");
});

app.get("/hello/:text", function(request, response) {
	response.send("Hello " + request.params.text);
});

var users = {
	"1":{
			"name": "Ollie Parsley",
			"twitter": "ollieparsley"
	},
	"2":{
			"name": "Jaffray Way",
			"twitter": "jaffray_way"
	}
};
			
app.get("/user/:id", function(request,response){
	var user = users[request.params.id];
	if (user) {
		response.send("<a href='http://twitter.com'"+ user.twitter + "'>Follow " + user.name + "on twitter</a>");
	} else {
		response.send("Sorry! We cannot find the user :[",404);
	}

});
			
		

app.listen(port,host);