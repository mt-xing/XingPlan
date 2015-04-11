(function () {
	"use strict";
	
	WinJS.UI.Pages.define("/pages/home/home.html", {
		// This function is called whenever a user navigates to this page. It
		// populates the page elements with the app's data.
		ready: function (element, options) {
			// TODO: Initialize the page here.
			WinJS.Utilities.query("a").listen("click", this.linkClickEventHandler, false);
			WinJS.Utilities.query("a").listen("mousedown", this.linkDownHandler, false);
			WinJS.Utilities.query("a").listen("pointerout", this.linkUpHandler, false);

			var TempDel = document.getElementsByClassName("pika-single");

			//alert(TempDel.length); Quickly clears away leftover calendar pickers
			for (var i = TempDel.length - 1; i >= 0 ; i--) {
				TempDel[i].parentNode.removeChild(TempDel[i]);
			}
		},

		linkClickEventHandler: function (eventInfo) {
			eventInfo.preventDefault();
			var link = eventInfo.target;
			if (link.className != "ALink") {
				link = link.parentElement;
			}
			WinJS.UI.Animation.pointerUp(link).done(
				function completed() {
					WinJS.Navigation.navigate(link.href);
				});

		},
		linkDownHandler: function (eventInfo) {
			eventInfo.preventDefault();
			var link = eventInfo.target;
			if (link.className != "ALink") {
				link = link.parentElement;
			}
			WinJS.UI.Animation.pointerDown(link).done();
		},
		linkUpHandler: function (eventInfo) {
			eventInfo.preventDefault();
			var link = eventInfo.target;
			if (link.className != "ALink") {
				link = link.parentElement;
			}
			WinJS.UI.Animation.pointerUp(link).done();
		}
	});
	

})();