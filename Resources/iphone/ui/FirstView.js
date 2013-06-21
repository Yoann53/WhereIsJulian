//FirstView Component Constructor
function FirstView(currentWin) {
	
	/*
	 * Initialize variables
	 */
	
	
	var idSelectedSection = 0;	
	var selectedLevel = 'Medium';
	
	/*
	 * Create ui elements
	 */
	
	var self = Ti.UI.createWindow({
		navBarHidden: true
	});
	
	
	var winEdit = Ti.UI.createWindow({
	    title: 'Where is Julian ?'	
	});
		
	//type activity
	var sectionLevel = Ti.UI.createTableViewSection({
		id: 'level'
	});
	
	var rowLevel = Ti.UI.createTableViewRow({
		title: 'level',
		hasChild: true,
		height: 40
	});
	
	var labSelectedLevel = Ti.UI.createLabel({
		right: 10,
		text: selectedLevel,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color: '#50719D'
	});
	
	var tableView = Ti.UI.createTableView({
		style: Ti.UI.iPhone.TableViewStyle.GROUPED,
		sections: [sectionLevel],
		height: Ti.UI.FILL
	});	
	
	
	var btnStart = Ti.UI.createButton({
			width: 100,
			height: 40,
			title: "Start"
		});
		
		
	btnStart.addEventListener('click', function(e){
		
		//load component dependencies
		var GrillWindow = require('ui/GrillWindow');
		
		//construct UI
		var GrillWindow = new GrillWindow();
		self.hide();
		currentWin.add(GrillWindow);
		
		currentWin.animate({
			view:GrillWindow,
			transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
		});
		
	});
	
	
	rowLevel.addEventListener('click', function(e){
		
		var SelectLevelWindow = require('ui/SelectLevelWindow');
		var selectLevelWindow = new SelectLevelWindow(labSelectedLevel.getText());
		
		navgroup.open(selectLevelWindow, {animated: true});
		
	});
	
	//Apply selected values
	
	
	var applyLevel = function(){
		
		selectedLevel = Ti.App.Properties.getString('selectedLevel');
		labSelectedLevel.setText(selectedLevel);
		
	}
	
	//Apply selected values
	Ti.App.addEventListener('applyLevel', applyLevel);
	
		
	
	/*
	 * Attach all components to window and create navgroup
	 */
	
	rowLevel.add(labSelectedLevel);
	sectionLevel.add(rowLevel);
	
	winEdit.add(tableView);
	winEdit.add(btnStart);
	
	var navgroup = Titanium.UI.iPhone.createNavigationGroup({
	   window: winEdit
	});
	
	self.add(navgroup);	
		
	return self;	

}

module.exports = FirstView;



