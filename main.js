$(document).ready(function(){

	// containers
	var btd_default_priority = 0;
	var btd_is_new_entry = true;
	var btd_editing = false;

	// add default priority to the end of the text
	function loadDefaultPriority()
	{
		chrome.runtime.sendMessage(
				{"method": "loadDefaultPriority"},
				function (response) {
					btd_default_priority = response;
				});
	}

	loadDefaultPriority();

	$(document.body).on('focusin', '#editor .text_box_holder textarea,#quick_add_task .text_box_holder textarea', function(){
		btd_is_new_entry = ($(this).val()=='');
		btd_editing = true;
	});

	function btdAddPriority(t)
	{
		loadDefaultPriority();

		if(btd_default_priority>0){
			// append only to new entries
			btd_editing = false;
			if(btd_is_new_entry){
				var regex = new RegExp("!!"+btd_default_priority);
				if (!regex.test(t.val())) {
					t.val( t.val()+'!!'+btd_default_priority ); 
				}
			}
		}
	}
	// add default priority when lost focus
	$(document.body).on('focusout', '#editor .text_box_holder textarea,#quick_add_task .text_box_holder textarea', function(){ btdAddPriority($(this)); });
	$(document.body).on('mousedown', '#editor .submit_btn, #quick_add_task .submit_btn' , function(){ btdAddPriority($('#editor .text_box_holder textarea,#quick_add_task .text_box_holder textarea')); });

	// remove default priority string if priority has been changed

	$(document.body).on('click', '#editor .cmp_priority4,#editor .cmp_priority3,#editor .cmp_priority2,#editor .cmp_priority1,#quick_add_task .cmp_priority4,#quick_add_task .cmp_priority3,#quick_add_task .cmp_priority2,#quick_add_task .cmp_priority1', function(){
		t = $('#editor .text_box_holder textarea,#quick_add_task .text_box_holder textarea');
		t.val( t.val().replace("!!"+btd_default_priority,""));
		btd_is_new_entry = false;
	});

});
