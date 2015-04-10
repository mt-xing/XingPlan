(function () {
	"use strict";
	
	WinJS.UI.Pages.define("/pages/list/list.html", {
		// This function is called whenever a user navigates to this page. It
		// populates the page elements with the app's data.
		ready: function (element, options) {
			// TODO: Initialize the page here.
			document.getElementById("TaskAdder").addEventListener("keydown", function (e) {
				if (e.keyCode == WinJS.Utilities.Key.enter) {
					NewTask();
				}
			});
			
			var CheckIterators = document.querySelectorAll("input[type='radio']");
			for (var i = 0; i < CheckIterators.length; i++) {
				CheckIterators[i].addEventListener("mousedown", function (e) {
					e.preventDefault();
					if (e.currentTarget.checked) {
						e.currentTarget.checked = false;
						if (e.currentTarget.id == "Dat1" || e.currentTarget.id == "Dat2") {
							document.getElementById("Dat3").value = "";
						}
					} else {
						e.currentTarget.checked = true;
						if (e.currentTarget.id == "Dat1") {
							if (moment().format("d") == 5) {
								document.getElementById("Dat3").value = moment().add(3, 'days').format("MM/DD");
							} else if (moment().format("d") == 6) {
								document.getElementById("Dat3").value = moment().add(2, 'days').format("MM/DD");
							} else {
								document.getElementById("Dat3").value = moment().add(1, 'days').format("MM/DD");
							}
						} else if (e.currentTarget.id == "Dat2") {
							document.getElementById("Dat3").value = moment().add(2, 'days').format("MM/DD");
						}
					}
					
				});
				CheckIterators[i].addEventListener("click", function (e) {
					e.preventDefault();
				});
			}
			var picker1 = new Pikaday({ field: document.getElementById('Dat3'), theme: 'dark-theme', format: "MM/DD" });
			var picker2 = new Pikaday({ field: document.getElementById('CDue'), theme: 'dark-theme' });
			var picker3 = new Pikaday({ field: document.getElementById('CShould'), theme: 'dark-theme', minDate: new Date() });
		}
	});
	
	function NewTask() {
		var InBox = document.getElementById("TaskAdder");
	
		if (InBox.value == "") {
			//If you didn't type a name, cancel the operation
			return;
		}
	
		//Creates the Task object and stores it into the array
		AllTasks[AllTasks.length] = new Task(InBox.value, document.getElementById("Dat3").value, document.querySelector('input[name = "Class"]:checked').value);

		//Clears the box
		InBox.value = "";

		//Adds it to the list
		var task = document.createElement("LI");
		task.innerHTML = AllTasks[AllTasks.length - 1].name;
		document.getElementById("MainList").appendChild(task);
		
	}






	/*
	Helper Functions
	*/
	
})();