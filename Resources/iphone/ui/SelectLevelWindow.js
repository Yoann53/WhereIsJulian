
function selectLevelWindow(selectedType) {
	
	/*
	 * Initialize variables
	 */
	
	var idSelectedRow = null;
	var data = [];
	
	
	/*
	 * Create window and tableView
	 */

	var self = Ti.UI.createWindow({
		title: 'Level'
	});
	
	var rowLow = Ti.UI.createTableViewRow({
		hasCheck: (selectedLevel == "Low") ? true : false,
		height: 50,
		title: 'Low',
		color: (selectedLevel == "Low") ? '#50719D' : '#343434',
		rowIndex: 0
	});
	
	var rowMedium = Ti.UI.createTableViewRow({
		hasCheck: (selectedLevel == "Medium") ? true : false,
		height: 50,
		title: 'Medium',
		color: (selectedLevel == "Medium") ? '#50719D' : '#343434',
		rowIndex: 1
	});
	
	var rowHigh = Ti.UI.createTableViewRow({
		hasCheck: (selectedLevel == "High") ? true : false,
		height: 50,
		title: 'High',
		color: (selectedLevel == "High") ? '#50719D' : '#343434',
		rowIndex: 2
	});
	
	data.push(rowLow);
	data.push(rowMedium);
	data.push(rowHigh);
	
	
	var tableView = Ti.UI.createTableView({
		style: Ti.UI.iPhone.TableViewStyle.GROUPED,
		data : data
	});
	
	tableView.addEventListener('click', function(e){
		
		var tableData = tableView.getData();
		var sectionData = tableData[0];
		var rowsData = sectionData.getRows();
		
		//Uncheck old selected row
		var rowData = rowsData[idSelectedRow];
		rowData.setHasCheck(false);
		rowData.setColor('#343434');
		
		//Check new row selected
		rowData = rowsData[e.source.rowIndex];
		rowData.setHasCheck(true);
		rowData.setColor('#50719D');
		idSelectedRow = e.source.rowIndex;
		selectedType = e.source.title;
		
		//Save selected type 
		Ti.App.Properties.setString('selectedLevel', selectedLevel);
		
		//Fire event to apply change
		Ti.App.fireEvent('applyLevel');
		
	});
	
	self.add(tableView);

	return self;

}


module.exports = selectLevelWindow;
