var app = app || {};

app.userViews = (function() {
    function showLoginPage(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);
            $('#loginButton').on('click', function () {
                var username = $('#username').val();
                var password = $('#password').val();

                $.sammy(function() {
                    this.trigger('login', {username: username, password: password});
                });
            })
        })
    }

    function showRegisterPage(selector) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);
            $('#registerButton').on('click', function () {
                var username = $('#username').val();
                var password = $('#password').val();
                var fullName = $('#fullName').val();

                $.sammy(function() {
                    this.trigger('register', {username: username, password: password, fullName:fullName});
                });
            })
        })
    }

    return {
        load: function() {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage:showRegisterPage
            }
        }
    }
}());