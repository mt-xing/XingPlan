(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
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
        					document.getElementById("Dat3").value = moment().add(1, 'days').format("MM/DD");
        				} else if (e.currentTarget.id == "Dat2") {
        					document.getElementById("Dat3").value = moment().add(2, 'days').format("MM/DD");
        				}
        			}
        			
        		});
        		CheckIterators[i].addEventListener("click", function (e) {
        			e.preventDefault();
        		});
        	}
        	var picker = new Pikaday({ field: document.getElementById('Dat3'), theme: 'dark-theme', format: "MM/DD" });
			//minDate: new Date()
        }
    });

    function NewTask() {
    	if (document.getElementById("TaskAdder").value == "") {
    		return;
    	}


    	
    }
})();