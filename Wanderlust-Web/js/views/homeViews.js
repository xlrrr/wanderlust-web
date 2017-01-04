var app = app || {};

app.homeViews = (function() {
    function showHomePage(selector) {
        $.get('templates/home.html', function (templ) {
            Parse.User.current().fetch().then(function(fetchedUser){
                var fname = fetchedUser.get('first_name');
                var lname = fetchedUser.get('last_name');
                var userData = {username:fetchedUser.getUsername(), fullName:fname + ' ' + lname};
                var rendered = Mustache.render(templ,userData);
                $(selector).html(rendered);
            }, function(error){
                //Handle the error
            });

        });
    }
    function showWelcomePage(selector) {
        $.get('templates/welcome.html', function (templ) {
            $(selector).html(templ);
        })
    }
    function showNavigation(selector) {
        $.get('templates/navigation.html', function (templ) {
            Parse.User.current().fetch().then(function(fetchedUser){
                var name = fetchedUser.get('first_name');
                var rendered = Mustache.render(templ,{username:name});
                $(selector).html(rendered);
            }, function(error){
                //Handle the error
            });
        })
    }
   return {
       load: function() {
           return {
               showHomePage: showHomePage,
               showWelcomePage: showWelcomePage,
               showNavigation: showNavigation
           }
       }
   }
}());