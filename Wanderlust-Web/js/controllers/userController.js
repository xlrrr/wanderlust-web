var app = app || {};

app.userController = (function () {
    function UserController(viewBag) {
        var _this = this;

        this._viewBag = viewBag;

    }

    UserController.prototype.loadLoginPage = function(selector) {
        this._viewBag.showLoginPage(selector)
    };

    UserController.prototype.loadRegisterPage = function(selector) {
        this._viewBag.showRegisterPage(selector)
    };

    UserController.prototype.login = function(data) {
        Parse.User.logIn(data.username, data.password, {
            success: function(user) {

                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/home/'});
                })
            },
            error: function(user, error) {
                // The login failed. Check error to see why.
            }
        });
    };

    UserController.prototype.register = function(data) {
        var user = new Parse.User();
        user.set("username", data.username);
        user.set("password", data.password);

        user.signUp(null, {
            success: function(user) {
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/home/'});
                })
            },
            error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + "\n\nwhat is the error \n\n " + JSON.stringify(error.message));
            }
        });
    };

    UserController.prototype.logout = function() {
        Parse.User.logOut();

    };

    return {
        load: function (viewBag) {
            return new UserController(viewBag)
        }
    }
}());