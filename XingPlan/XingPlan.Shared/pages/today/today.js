// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/today/today.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
        	// TODO: Initialize the page here.

        	var HasNoTasks = true;
        	for (var i = 0; i < AllTasks.length; i++) {
        		if (moment(AllTasks[i].dueDate).format("MMDDYYYY") == moment().add(1, "days").format("MMDDYYYY")) {
        			var task = document.createElement("LI");
        			var checkBox = document.createElement("INPUT");
        			checkBox.type = "checkbox";
        			task.appendChild(checkBox);
        			document.getElementById("MasterList").appendChild(task);
        			//task.addEventListener("click", OpenInfo);
        			//checkBox.addEventListener("change", CheckRemoveList);

        			var name = document.createElement("SPAN");
        			name.textContent = AllTasks[i].name;
        			task.appendChild(name);
        			HasNoTasks = false;
        		}
        	}

        	if (HasNoTasks) {
        		document.getElementById("MasterList").textContent = "Hmm, there seems to be nothing here...";
        	}
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
})();
