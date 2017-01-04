var app = app || {};

app.locationViews = (function () {
    function showAllLocations(selector, data) {
        $.get('templates/allLocationsTemplate.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
        })
    }

    function showAddLocationPage(selector) {
        $.get('templates/addLocation.html', function (templ) {
            $(selector).html(templ);
        }).then(function () {
            $('#addNoteButton').on('click', function () {
                var title = $('#title').val();
                var desc = $('#desc').val();
                var lat = $('#lat').val();
                var long = $('#long').val();

                //add othere coloumns bellow

                $.sammy(function () {
                    this.trigger('add-location', {title: title, desc: desc, lat: lat, long:long})
                });
            });
        })

    }

    function showEditLocationPage(selector,note) {
        $.get('templates/editLocation.html', function (templ) {
            var rendered = Mustache.render(templ, note);
            $(selector).html(rendered);
        }).then(function () {
            $('#editNoteButton').on('click', function () {
                console.log("clicked")
                var title = $('#title').val();
                var text = $('#text').val();
                var deadline = $('#deadline').val();
                $.sammy(function () {
                    this.trigger('edit-note', {title: title, text: text, deadline: deadline, _id:note._id})
                });
            });
        })

    }

    function showDeleteLocationPage(selector,note) {
        $.get('templates/deleteLocation.html', function (templ) {
            var rendered = Mustache.render(templ, note);
            $(selector).html(rendered);
        }).then(function () {
            $('#deleteNoteButton').on('click', function () {

                $.sammy(function () {
                    this.trigger('delete-note', note._id)
                });
            });
        })

    }

    return {
        load: function () {
            return {
                showAllLocations: showAllLocations,
                showAddLocationPage: showAddLocationPage,
                showEditLocationPage: showEditLocationPage,
                showDeleteLocationPage: showDeleteLocationPage
            }
        }
    }
}());