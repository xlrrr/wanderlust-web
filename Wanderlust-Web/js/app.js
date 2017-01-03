var app = app || {};

(function () {
     var router = $.sammy(function () {

         Parse.initialize("Aev0cw9ckqsWq9BGiGfnPXACPbLTHypE0ZpejrPQ",
             "lHPGMzWPyXm1NCW0JZkCi1lAxVs4jLLwSPHks3Ta");
         Parse.serverURL = 'https://parseapi.back4app.com';

        var selector = '#container';
        var nav = '#menu';

        //var userModel = app.userModel.load(requester);
       // //var noteModel = app.noteModel.load(requester);

        var notesViewBag = app.noteViews.load();
        var usersViewBag = app.userViews.load();
        var homeViewBag =app.homeViews.load();

        var usersController = app.userController.load(usersViewBag);
        var notesController = app.noteController.load( notesViewBag);
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
             notesController.loadOfficeNotes(selector);
         });
         this.get('#/myNotes/', function () {
             notesController.loadUserNotes(selector);
         });
         this.get('#/addNote/', function () {
             notesController.loadAddNotePage(selector);
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

        this.bind('add-note', function (e, data) {
            notesController.addNote(data);
        });
         this.bind('show-edit-note', function (e, data) {
             notesController.loadEditNotePage(selector,data);
         });
        this.bind('edit-note', function (e, data) {
            notesController.editNote(data);
        });
         this.bind('show-delete-note', function (e, data) {
             notesController.loadDeleteNotePage(selector,data);
         });
        this.bind('delete-note', function (e, id) {
            notesController.deleteNote(id);
        });
        this.get('#/',function(){

        });
    });

    router.run('#/');
}());

