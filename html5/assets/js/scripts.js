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
		this.topics = [];
	}
	return {
		sharedInstance: sharedInstance
	}
})();

function Model() {
	return model.sharedInstance();
}

function sign_in_request(account, password, fn) {
	$.ajax({
		'type': 'POST',
		'url': "http://121.42.192.153/user/signIn",
		'contentType': 'application/json',
		'data': JSON.stringify({"account":account, "password":password}),
		'dataType': 'json',
		'success': function (data, status) {
			if (data.success) {
				var m = model.sharedInstance();
				m.account = account;
				m.password = password;
				m.name = data.name;
				m.locality = data.locality;
				m.region = data.region;
				m.authority = data.authority;
				m.session = data.session;
			}

			fn(data, status);
		}
	});
}

function sign_up_request(account, password, name, locality, region, fn) {
	$.ajax({
		'type': 'POST',
		'url': "http://121.42.192.153/user/signUp",
		'contentType': 'application/json',
		'data': JSON.stringify({"account":account, "password":password, "name":name, "locality":locality, "region":region}),
		'dataType': 'json',
		'success': function (data, status) {
			if (data.success) {
				var m = model.sharedInstance();
				m.account = account.value;
				m.password = password.value;
				m.name = name.value;
				m.locality = locality.value;
				m.region = region.value;
				m.authority = data.authority;
				m.session = data.session;
			}

			fn(data, status);
		}
	});	
}

function query_request(fn) {
	var m = model.sharedInstance();

	$.ajax({
		'type': 'POST',
		'url': "http://121.42.192.153/topics/query",
		'contentType': 'application/json',
		'data': JSON.stringify({"session":m.session}),
		'dataType': 'json',
		'success': function (data, status) {
			if (data.success) {
				m.topics = new Array();
				$(data.topics).each(function(index, element) {
					m.topics.push({"id":element.topicID, "timestamp":element.timestamp});
				});
			}
			fn(data, status);
		}
	});
}

function get_topics_request(fn) {
	var m = model.sharedInstance();
	m.selectedTopics = new Array();

	return append_topics_request(fn);
}

function append_topics_request(fn) {
	var m = model.sharedInstance();

	var randoms = new Array();
	while(randoms.length != 20) {
		var random = Math.floor(Math.random() * (m.topics.length));
		var description = m.topics[random].description;
		var invalid = (description === null || description === undefined ||  description == "");
		if ($.inArray(m.topics[random].id, randoms) == -1 && invalid) {
			randoms.push(m.topics[random].id);
		}
	}

	$.ajax({
		'type': 'POST',
		'url': "http://121.42.192.153/topics/get",
		'contentType': 'application/json',
		'data': JSON.stringify({"session":m.session, topics:randoms}),
		'dataType': 'json',
		'success': function (data, status) {
			$(data.topics).each(function(index, element) {
				var topic;
				$(m.topics).each(function(index, elementt) {
					if (elementt.id == element.topicID) {
						topic = elementt;
						return false;
					}
				});
				topic.description = element.description;
				topic.options = element.options;
				topic.correct = element.correct;
				m.selectedTopics.push(topic);
			});
			fn(data, status);
		}
	});	
}

