var app = app || {};

app.locationController = (function() {
    function LocationController(viewBag) {
        this._viewBag = viewBag;
    }
    LocationController.prototype.loadAddLocationPage = function(selector) {
        this._viewBag.showAddLocationPage(selector)
    };
    LocationController.prototype.loadEditLocationPage = function(selector,note) {
        console.log(note);
        this._viewBag.showEditLocationPage(selector,note)
    };
    LocationController.prototype.loadDeleteLocationPage = function(selector,note) {
        this._viewBag.showDeleteLocationPage(selector,note)
    };

    LocationController.prototype.loadAllNotes = function(selector) {
        var _this = this;
        var Location = Parse.Object.extend("Location");
        var query = new Parse.Query(Location);
        query.find({
            success: function(results) {
                var result = {
                    notes: []
                };
                for (var i = 0; i < results.length; i++) {
                    var currentResult = results[i];
                    result.notes.push(new LocationInputModel(currentResult.id, currentResult.get('name'), currentResult.get('description'), currentResult.get('location')));
                }
                _this._viewBag.showAllLocations(selector, result);
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    };

    LocationController.prototype.addLocation = function(data) {
        var Location = Parse.Object.extend("Location");
        var currLocation = new Location();

        currLocation.set("name", data.title);
        currLocation.set("description", data.desc);

        var point = new Parse.GeoPoint({latitude: data.lat, longitude: data.long});
        currLocation.set("location", point);

        currLocation.save(null, {
            success: function(currLocation) {
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/myNotes/'});
                })
            },
            error: function(currLocation, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });
    };

    LocationController.prototype.editLocation = function(data) {
        var _this = this;

        var noteOutputModel = {
            title: data.title,
            text: data.text,
            deadline: data.deadline,
            author: {
                _type:'KinveyRef',
                _collection:'users',
                _id: sessionStorage['userId'],
                name: sessionStorage['username']
            }
        };

        //this._model.editNote(data._id,noteOutputModel)
        //    .then(function() {
        //        $.sammy(function () {
        //            this.trigger('redirectUrl', {url:'#/myNotes/'});
        //        })
        //    })
    };
    LocationController.prototype.deleteLocation = function(id) {
        var _this = this;

        //this._model.deleteNote(id)
        //    .then(function() {
        //        $.sammy(function () {
        //            this.trigger('redirectUrl', {url:'#/myNotes/'});
        //        })
        //    })
    };

    return {
        load: function(viewBag) {
            return new LocationController(viewBag);
        }
    };
}());