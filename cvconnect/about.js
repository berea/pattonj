var hobsonsPage;

//Add openMyPage() as a listener to clicks on the chrome action.
chrome.browserAction.onClicked.addListener(openAboutPage);
//Check url when the page is updated. 
chrome.tabs.onUpdated.addListener(handleUpdated); 
//Check url when the tab is changed. 
chrome.tabs.onActivated.addListener(handleActivated);


//Open a new tab, and load "about.html" into it.
function openAboutPage() {
	if(hobsonsPage === true){
		chrome.tabs.create({"url": "/about.html" });
	}
}

//function to get url when tab is activated. 
function handleActivated(activeInfo) {
 chrome.tabs.query({  active: true,  currentWindow: true}, function(tabs) {
     setBereaIcon(tabs[0].url);
   //https://stackoverflow.com/questions/6451693/chrome-extension-how-to-get-current-webpage-url-from-background-html
   
});
}

//function to get url when page is updated. 
function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.url) {
   // console.log("Tab: " + tabId +" URL changed to " + changeInfo.url);
	setBereaIcon(changeInfo.url)
  }
}


//Function to set icon color based on URL. 
function setBereaIcon(myURL){
	var urlCheck = new RegExp("^https://berea.askadmissions.net/admin/");
    var Hobsons = urlCheck.test(myURL);
    	
	if( Hobsons === true){
		chrome.browserAction.setIcon({path: "icons/berea_college_autofill_icon_48.png"});
		chrome.browserAction.setPopup({popup: ""});
		hobsonsPage = true;
	}else{
		chrome.browserAction.setIcon({path: "icons/berea_college_autofill_icon_48(gray).png"});
		hobsonsPage = false;
		chrome.browserAction.setPopup({popup: "/fail.html"});
	}
}



