var btd_default_priority_start = 2;

function loadDefaultPriority(){

	var default_priority = localStorage['default_priority'];

	if(default_priority == undefined)
	{
		localStorage['default_priority'] = btd_default_priority_start;
		return btd_default_priority_start;
	}
	else
	{
		return default_priority;
	}
}

function saveDefaultPriority()
{
	localStorage['default_priority'] = $('#priority').val();
}

function loadOptions()
{
	$('#priority').val(loadDefaultPriority());
}

function saveOptions()
{
	saveDefaultPriority();
	alert('Saved!');
}

$(document).ready(function(){
	$('#saveButton').click(function(){
		saveOptions();
	});
	loadOptions();
});
