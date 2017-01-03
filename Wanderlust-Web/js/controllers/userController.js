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

        //this._model.login(userOutputModel)
        //   .then(function (success) {
        //       sessionStorage['session//Auth'] = success._kmd.authtoken;
        //       sessionStorage['username'] = success.username;
        //       sessionStorage['userId'] = success._id;
        //       sessionStorage['userFullName'] = success.fullName;
        //       $.sammy(function () {
        //           this.trigger('redirectUrl', {url:'#/home/'});
        //       })
        //   }).done()
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

        //v//ar userOutputModel = {
        //    username: data.username,
        //    password: data.password,
        //    fullName: data.fullName
        //};
        //var _this = this;
        //this._model.register(userOutputModel)
        //    .then(function (success) {
        //        //TODO notify successfull login
        //        _this.login({username:success.username,password:success.password});
        //    }).done()
    };

    UserController.prototype.logout = function() {
        return this._model.logout()
            .then(function() {
                sessionStorage.clear();
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/welcome/'});
                })
            })
    };

    return {
        load: function (viewBag) {
            return new UserController(viewBag)
        }
    }
}());