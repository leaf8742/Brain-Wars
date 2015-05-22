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

// javascript传函数
function a(){
  alert('this is a');
}

function b(test){
  test();//调用传入的函数
}

function c()
{
  b(a);
}

