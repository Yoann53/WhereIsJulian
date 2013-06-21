
function GrillWindow() {
	
	
	/*
	 * Initialize variables
	 */

	var idSelectedSection = 0;	
	var selectedLevel = 'Medium';
	
	/*
	 * Create ui elements
	 */
	
	var self = Ti.UI.createWindow({
		navBarHidden: true,
		backgroundColor:'#B0C4DE'
	});
	
	
	
	/*
	 * Create the grid of days
	 */
	
	var viewGridDay = Ti.UI.createView({
		top: 0,
		width: 'auto',
		height: 300,
		backgroundColor: '#E1E1E2',
		layout: 'horizontal' 
	});
	
	
	
	
	
	/*
	 * Create the grid's elements
	 */ 
	
	
	for(var i = 0; i < 9; i++){
		
		var btnGrill = Ti.UI.createButton({
			width: '33.33%',
			height: 100,
			titleid: i,
			borderColor: 'white',
			borderWidth: 0.75,
			backgroundColor: 'black'
		});
		
		viewGridDay.add(btnGrill);
		
	}

		
	/*
	 * Attach all components to window and create navgroup
	 */
	
	self.add(viewGridDay);	
	return self;	
	
}

module.exports = GrillWindow;