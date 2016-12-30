var app = app || {};

app.homeViews = (function() {
    function showHomePage(selector) {
        $.get('templates/home.html', function (templ) {
            var userData = {username:sessionStorage["username"], fullName:sessionStorage["userFullName"]};
            var rendered = Mustache.render(templ,userData);
            $(selector).html(rendered);
        });
    }
    function showWelcomePage(selector) {
        $.get('templates/welcome.html', function (templ) {
            $(selector).html(templ);
        })
    }
    function showNavigation(selector) {
        $.get('templates/navigation.html', function (templ) {
            var rendered = Mustache.render(templ,{username:sessionStorage['username']});
            $(selector).html(rendered);
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