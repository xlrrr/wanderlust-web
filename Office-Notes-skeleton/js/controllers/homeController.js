var app = app || {};

app.homeController = (function() {
    function HomeController(viewBag) {
        this._viewBag = viewBag;
    }

    HomeController.prototype.loadHomePage = function(selector) {
        this._viewBag.showHomePage(selector);
    };
    HomeController.prototype.loadWelcomePage = function(selector) {
        this._viewBag.showWelcomePage(selector);
    };
    HomeController.prototype.loadNavigation = function(selector) {
        this._viewBag.showNavigation(selector);
    };

    return {
        load: function (viewBag) {
            return new HomeController(viewBag);
        }
    }
}());