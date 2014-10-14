chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if(request.method == "loadDefaultPriority")
			{
				sendResponse(localStorage['default_priority']);
			}
			else
			{	
				sendResponse({});
			}
		});
