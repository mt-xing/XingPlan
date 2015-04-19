(function () {
	"use strict";

	WinJS.UI.Pages.define("/pages/list/list.html", {
		// This function is called whenever a user navigates to this page. It
		// populates the page elements with the app's data.
		ready: function (element, options) {
			// Initialize the page here.
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
			var picker2 = new Pikaday({ field: document.getElementById('CDue'), theme: 'dark-theme', format: "dddd, MMMM Do, YYYY" });
			var picker3 = new Pikaday({ field: document.getElementById('CShould'), theme: 'dark-theme', minDate: new Date(), format: "dddd, MMMM Do, YYYY" });


			document.getElementById("CDue").addEventListener("change", ChangeD);
			document.getElementById("CShould").addEventListener("change", ChangeD);
			document.getElementById("CClass").addEventListener("change", ChangeD);

			//Populates the list with HW
			if (AllTasks.length > 0) {
				for (var i = 0; i < AllTasks.length; i++) {
					AddList(AllTasks[i]);
				}
			}
		}
	});
	
	//Adding Tasks
	function NewTask() {
		var InBox = document.getElementById("TaskAdder");
	
		if (InBox.value == "") {
			//If you didn't type a name, cancel the operation
			return;
		}
		
		//Creates the Task object and stores it into the array
		AllTasks[AllTasks.length] = new Task(InBox.value, document.getElementById("Dat3").value, document.querySelector('input[name = "Class"]:checked').id);
			//TODO: Make the Task store the year as well

		//Clears the box
		InBox.value = "";

		//Adds it to the list
		AddList(AllTasks[AllTasks.length - 1]);
		
		SaveState();
	}

	//Messing With the Master List
	function AddList(e) {
		var task = document.createElement("LI");
		var checkBox = document.createElement("INPUT");
		checkBox.type = "checkbox";
		task.appendChild(checkBox);
		//task.innerHTML += e.name;
		document.getElementById("MainList").appendChild(task);
		task.addEventListener("click", OpenInfo);
		checkBox.addEventListener("change", CheckRemoveList);

		var name = document.createElement("SPAN");
		name.textContent = e.name;
		task.appendChild(name);
	}
	function RemoveList(e) {
		if (AllTasks[getElementIndex(e)].pendDelete == false) {
			return;
		}
		AllTasks.splice(getElementIndex(e), 1);
		SaveState();
		e.parentElement.removeChild(e);
	}
		function CheckRemoveList(e) {
			//Only works of el is an event listener from a checkbox; breaks if otherwise
			if (e.target.checked) {
				window.setTimeout(function () { RemoveList(e.target.parentElement) }, 2000);
				AllTasks[getElementIndex(e.target.parentElement)].pendDelete = true;
			} else {
				AllTasks[getElementIndex(e.target.parentElement)].pendDelete = false;
			}
			
		}

	//Manipulating the Display
	function OpenInfo(e) {
		for (var i = 0; i < AllTasks.length; i++) {
			document.getElementById("MainList").getElementsByTagName("LI")[i].style.color = "";
			document.getElementById("MainList").getElementsByTagName("LI")[i].style.background = "";
		}

		var TargetHolder;
		if (e.target.tagName == "INPUT" || e.target.tagName == "SPAN") {
			TargetHolder = e.target.parentElement;
		} else {
			TargetHolder = e.target;
		}
		WinJS.UI.Animation.pointerDown(TargetHolder).done(
			function () {
				WinJS.UI.Animation.pointerUp(TargetHolder).done();
			});

		TargetHolder.style.background = "black";
		TargetHolder.style.color = "white";
		var el = AllTasks[getElementIndex(TargetHolder)];
		document.getElementById("CDue").value = moment(el.dueDate).format("dddd, MMMM Do, YYYY");
		document.getElementById("CShould").value = moment(el.shouldDate).format("dddd, MMMM Do, YYYY");
		document.getElementById("CClass").getElementsByTagName("OPTION")[el.className].selected = true;
		document.getElementById("CName").textContent = el.name;
		document.getElementById("CID").textContent = getElementIndex(TargetHolder);
	}
	function ChangeD(e) {
		var el = e.target;
		var cid = document.getElementById("CID").textContent;
		if (el.id == "CDue") {
			AllTasks[cid].dueDate = moment(el.value, "dddd, MMMM Do, YYYY");
		} else if(el.id == "CShould"){
			AllTasks[cid].shouldDate = moment(el.value, "dddd, MMMM Do, YYYY");
		} else if (el.id == "CClass") {
			AllTasks[cid].className = el.value;
		}
		SaveState();
	}
	
	function SaveState() {
		var appData = Windows.Storage.ApplicationData.current;
		var roamingSettings = appData.roamingSettings;
		roamingSettings.values["AllTasks"] = JSON.stringify(AllTasks);
		//alert(JSON.stringify(AllTasks));
	}


	/*
	Helper Functions
	*/
	function getElementIndex(elem) {
		var i = 0;
		while (elem = elem.previousElementSibling) i++;
		return i;
	}
	
})();