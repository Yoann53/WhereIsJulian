//Application Window Component Constructor
function ApplicationWindow() {
	
	//load component dependencies
	var FirstView = require('ui/FirstView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#B0C4DE'
	});
		
	//construct UI
	var firstView = new FirstView(self);
	self.add(firstView);
	
	return self;
	
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
