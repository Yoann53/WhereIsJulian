//FirstView Component Constructor
function FirstView(currentWin) {
	
	
	//create element
	var win = currentWin;
	var self = Ti.UI.createView();
	
	
	var labelIntro = Ti.UI.createLabel({
		color: '#000000',
		text: L('welcome'), //see strings.xml
		height: 'auto',
		width: 'auto',
		top: 35
	});
	
	
	var inputLogin = Titanium.UI.createTextField({
		color: '#336699',
		top: 100,
		left: 35,
		width: 250,
		height: 40,
		hintText: L('login'),
		enableReturnKey: true,
		keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType: Titanium.UI.RETURNKEY_NEXT,
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	

	var inputPassword = Titanium.UI.createTextField({
		color: '#336699',
		top: 160,
		left: 35,
		width: 250,
		height: 40,
		hintText: L('password'),
		passwordMask: true,
		enableReturnKey: true,
		keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType: Titanium.UI.RETURNKEY_GO,
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	
	
	
	

	/*
	 * Event handlers
	 */
	
	
	
	Ti.App.addEventListener('getFocus', function(){
		inputLogin.focus();
	})
	
	inputLogin.addEventListener('return', function(e) {
		inputPassword.focus();	
	});

	
	inputPassword.addEventListener('return', function(e) {
		
		if(inputLogin.value != "" && inputPassword.value != ""){
			
			var svc_web = require('services/web');
			//Check login from database on ees-assurance.fr
			svc_web.login({ login : inputLogin.value, password : inputPassword.value }, { next: afterCheckLogin });	
		
		}else{
		
			afterCheckLogin(false);
		
		}
		
	});
	
	/*
	 * Callback functions
	 */
	
	//Next logic after check login
	function afterCheckLogin(json){
		
		if(!json){
			
			var dialog = Ti.UI.createAlertDialog({
		    	message: L('textLoginFailed'),
		    	title: L('alertTitleLoginFailed')
		  	}).show();
		  	inputLogin.focus();

		}else{
			
			//save json for the session
			Ti.App.Properties.setString('user', JSON.stringify(json));
			
			//Get calendar datas from database on ees-assurance.fr
			var svc_web = require('services/web');
			svc_web.getServerDatas({ idCollab : json.id_collaborateur }, { next : afterGetServerData });
		}
	}
	
	

	//Next logic after got datas
	function afterGetServerData(json){
		
		if(!json){
			
			var dialog = Ti.UI.createAlertDialog({
		    	message: L('textLoginFailed'),
		    	title: L('alertTitleLoginFailed')
		  	}).show();
		  	inputLogin.focus();
		  	
		}else{
			
			//save json for the session
			Ti.App.Properties.setString('gest', JSON.stringify(json.gest));
			Ti.App.Properties.setString('collab', JSON.stringify(json.collab));
			Ti.App.Properties.setString('droitAbs', JSON.stringify(json.droitAbs));
			Ti.App.Properties.setString('customers', JSON.stringify(json.clients));
			Ti.App.Properties.setString('holidays', JSON.stringify(json.feries));
			Ti.App.Properties.setString('activites', JSON.stringify(json.activites));
			//Ti.App.Properties.setString('sousActivites', JSON.stringify(json.sousActivites));
			Ti.App.Properties.setString('annees', JSON.stringify(json.annees));	
			
			//load component dependencies
			var CalendarWindow = require('ui/CalendarWindow');
			//construct UI
			var calendarWindow = new CalendarWindow();
			self.hide();
			win.add(calendarWindow);
			
			win.animate({
				view:calendarWindow,
				transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
			});
			
		}
	}
	
	
	//Force to gain focus when view starting
	Ti.App.fireEvent('getFocus');
	
	
	
	/*
	 * Attach all component to the view
	 */
	
	
	self.add(labelIntro);
	self.add(inputLogin);
	self.add(inputPassword);
	
	return self;
}

module.exports = FirstView;



