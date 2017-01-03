var app = app || {};

app.noteViews = (function () {
    function showOfficeNotes(selector, data) {
        $.get('templates/officeNoteTemplate.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
        })
    }

    function showUserNotes(selector, data) {
        $.get('templates/myNoteTemplate.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('.edit').on('click', function () {
               var noteId = $(this).parent().attr("data-id");
                var currentNote = data.notes.filter(function (e) {
                    return e._id===noteId;
                });
                if(currentNote.length){
                    $.sammy(function () {
                        this.trigger('show-edit-note', currentNote[0]);
                    });
                }
            });

            $('.delete').on('click', function () {
                var noteId = $(this).parent().attr("data-id");
                var currentNote = data.notes.filter(function (e) {
                    return e._id===noteId;
                });
                if(currentNote.length){
                    $.sammy(function () {
                        this.trigger('show-delete-note', currentNote[0]);
                    });
                }
            });

        })
    }

    function showAddNotePage(selector) {
        $.get('templates/addNote.html', function (templ) {
            $(selector).html(templ);
        }).then(function () {
            $('#addNoteButton').on('click', function () {
                var title = $('#title').val();
                var text = $('#text').val();
                var deadline = $('#deadline').val();
                $.sammy(function () {
                    this.trigger('add-note', {title: title, text: text, deadline: deadline})
                });
            });
        })

    }

    function showEditNotePage(selector,note) {
        $.get('templates/editNote.html', function (templ) {
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

    function showDeleteNotePage(selector,note) {
        $.get('templates/deleteNote.html', function (templ) {
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
                showOfficeNotes: showOfficeNotes,
                showUserNotes: showUserNotes,
                showAddNotePage: showAddNotePage,
                showEditNotePage: showEditNotePage,
                showDeleteNotePage: showDeleteNotePage
            }
        }
    }
}());