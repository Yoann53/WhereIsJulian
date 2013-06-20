
function selectActivityWindow(selectedType) {
	
	/*
	 * Initialize variables
	 */
	
	var jsonActivities = JSON.parse(Ti.App.Properties.getString('activites'));
	var idSelectedRow = null;
	
	var j = 1;
	
	//initialize idSelectedRow
	if(selectedType == L('none')){
		var idSelectedRow = 0;
	}else{
		
		for(var i = 0, max = jsonActivities.length; i < max; i++){
				
			if(jsonActivities[i].code == selectedType){
				var idSelectedRow = j;
			}
			
			//Férié is the first activity
			if(jsonActivities[i].libelle != "Férié"){
				j++;
			}
			
		}
		
	}
	
	var data = [];
	j = 0;
	
	
	/*
	 * Create window and tableView
	 */

	var self = Ti.UI.createWindow({
		title: L('type')
	});
	
	var row = Ti.UI.createTableViewRow({
		hasCheck: (j == idSelectedRow) ? true : false,
		height: 50,
		title: L('none'),
		color: (j == idSelectedRow) ? '#50719D' : '#343434',
		rowIndex: j,
		code: L('none')
	});
	
	selectedType = row.code;
	data.push(row);
	j++;
	
	for(var i = 0, max = jsonActivities.length; i < max; i++){
		
		//All activities except "Férié"
		if(jsonActivities[i].libelle != "Férié"){
			var row = Ti.UI.createTableViewRow({
				hasCheck: (j == idSelectedRow) ? true : false,
				height: 50,
				title: jsonActivities[i].code + ' - ' + jsonActivities[i].libelle,
				color: (j == idSelectedRow) ? '#50719D' : '#343434',
				rowIndex: j,
				code: jsonActivities[i].code
			});

			j++;
			data.push(row);	
		}		
	}
	
	
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
		selectedType = e.source.code;
		
		//Save selected type 
		Ti.App.Properties.setString('selectedType', selectedType);
		
		//Fire event to apply change
		Ti.App.fireEvent('applyType');
		
	});
	
	self.add(tableView);

	return self;

}


module.exports = selectActivityWindow;
