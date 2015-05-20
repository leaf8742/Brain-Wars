function storage() {
	var storage = window.localStorage;
	storage.setItem("model", JSON.stringify(model.sharedInstance()));
}

var model = (function(){
	var unique;

	function sharedInstance(){
		if(unique === undefined) {
			var storage = window.localStorage;
			unique = JSON.parse(storage.getItem("model"));
			if (unique === null || unique === undefined ||  unique == "") {
				unique = new Construct();
			}
		}
		return unique;
	}

	function Construct(){
		this.session = "session",
		this.currentIdx = 0, 
		this.account = "account", 
		this.name = "name", 
		this.locality = "locality", 
		this.region = "region", 
		this.authority = "authority", 
		this.topics = [
{"id":"3832A1F7-8CCC-4819-A48C-F4413EE1666F", "description":"description_1", "options":["option1", "option2", "option3", "option4"], "correct":[0, 1], "timestamp":"3832A1F7-8CCC-4819-A48C-F4413EE1666F"},
{"id":"A9ADD3E2-BA6B-4840-8873-FE7FC73BC26B", "description":"description_2", "options":["option1", "option2", "option3", "option4"], "correct":[0, 1], "timestamp":"A9ADD3E2-BA6B-4840-8873-FE7FC73BC26B"},
{"id":"F3A3AC9E-DFA9-473A-9867-A6EC260AFAFA", "description":"description_3", "options":["option1", "option2", "option3", "option4"], "correct":[0, 1], "timestamp":"F3A3AC9E-DFA9-473A-9867-A6EC260AFAFA"},
{"id":"65187716-D536-4829-9861-B7FD16D1FFF9", "description":"description_4", "options":["option1", "option2", "option3", "option4"], "correct":[0, 1], "timestamp":"65187716-D536-4829-9861-B7FD16D1FFF9"},
{"id":"6F7F830F-4BC3-469A-89D1-4F337C82A9F5", "description":"description_5", "options":["option1", "option2", "option3", "option4"], "correct":[0, 1], "timestamp":"6F7F830F-4BC3-469A-89D1-4F337C82A9F5"},
{"id":"ECDDA95E-797E-466B-8DB0-B642C6E450EA", "description":"description_6", "options":["option1", "option2", "option3", "option4"], "correct":[0, 1], "timestamp":"ECDDA95E-797E-466B-8DB0-B642C6E450EA"}];
	}
	return {
		sharedInstance: sharedInstance
	}
})();

function Model() {
	return model.sharedInstance();
}

