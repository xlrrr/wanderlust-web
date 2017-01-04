var app = app || {};

(function () {
     var router = $.sammy(function () {

         Parse.initialize("Aev0cw9ckqsWq9BGiGfnPXACPbLTHypE0ZpejrPQ",
             "lHPGMzWPyXm1NCW0JZkCi1lAxVs4jLLwSPHks3Ta");
         Parse.serverURL = 'https://parseapi.back4app.com';

        var selector = '#container';
        var nav = '#menu';

        var locationsViewBag = app.locationViews.load();
        var usersViewBag = app.userViews.load();
        var homeViewBag = app.homeViews.load();

        var usersController = app.userController.load(usersViewBag);
        var locationsController = app.locationController.load(locationsViewBag);
        var homeController = app.homeController.load(homeViewBag);


        this.before(function () {

            if (!Parse.User.current()) {
                this.redirect('#/welcome/');
                $("#menu").hide();
            }else{
                homeController.loadNavigation(nav);
                $("#menu").show();
            }

        });

        //Redirects
         this.get('#/welcome/', function () {
             homeController.loadWelcomePage(selector);
         });
         this.get('#/home/', function () {
             homeController.loadHomePage(selector);
         });
        this.get('#/login/', function () {
            usersController.loadLoginPage(selector);
        });
        this.get('#/register/', function () {
            usersController.loadRegisterPage(selector);
        });
         this.get('#/logout/', function () {
             usersController.logout().done();
         });
         this.get('#/office/', function () {
             locationsController.loadAllNotes(selector);
         });
         this.get('#/addLocation/', function () {
             locationsController.loadAddLocationPage(selector);
         });

        //User events
        this.bind('login', function (e, data) {
            usersController.login(data);
        });
        this.bind('register', function (e, data) {
            usersController.register(data);
        });
         this.bind('redirectUrl', function(e,data) {
             this.redirect(data.url);
         });

        //Note event

        this.bind('add-location', function (e, data) {
            locationsController.addLocation(data);
        });
         this.bind('show-edit-note', function (e, data) {
             locationsController.showEditLocationPage(selector, data);
         });
        this.bind('edit-note', function (e, data) {
            locationsController.editLocation(data);
        });
         this.bind('show-delete-note', function (e, data) {
             locationsController.loadDeleteLocationPage(selector,data);
         });
        this.bind('delete-note', function (e, id) {
            locationsController.deleteLocation(id);
        });
        this.get('#/',function(){

        });
    });

    router.run('#/');
}());

