var app = app || {};

app.noteController = (function() {
    function NoteController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }
    NoteController.prototype.loadAddNotePage = function(selector) {
        this._viewBag.showAddNotePage(selector)
    };
    NoteController.prototype.loadEditNotePage = function(selector,note) {
        console.log(note);
        this._viewBag.showEditNotePage(selector,note)
    };
    NoteController.prototype.loadDeleteNotePage = function(selector,note) {
        this._viewBag.showDeleteNotePage(selector,note)
    };

    NoteController.prototype.loadOfficeNotes = function(selector) {
        var _this =this;

        this._model.getOfficeNotes()
            .then(function (notes) {
                var result = {
                    notes: []
                };

                notes.forEach(function (note) {
                    result.notes.push(new NoteInputModel(note._id, note.title, note.text, note.author.name, note.deadline));
                });

                _this._viewBag.showOfficeNotes(selector, result);
            }).done();
    };

    NoteController.prototype.loadUserNotes = function(selector) {
        var _this =this;

        this._model.getUserNotes()
            .then(function (notes) {
                var result = {
                    notes: []
                };

                notes.forEach(function (note) {
                    result.notes.push(new NoteInputModel(note._id, note.title, note.text, note.author.name, note.deadline));
                });

                _this._viewBag.showUserNotes(selector, result);
            }).done();
    };

    NoteController.prototype.addNote = function(data) {

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

        this._model.addNote(noteOutputModel)
            .then(function() {
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/myNotes/'});
                })
            })
    };
    NoteController.prototype.editNote = function(data) {
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

        this._model.editNote(data._id,noteOutputModel)
            .then(function() {
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/myNotes/'});
                })
            })
    };
    NoteController.prototype.deleteNote = function(id) {
        var _this = this;

        this._model.deleteNote(id)
            .then(function() {
                $.sammy(function () {
                    this.trigger('redirectUrl', {url:'#/myNotes/'});
                })
            })
    };

    return {
        load: function(model, viewBag) {
            return new NoteController(model, viewBag);
        }
    };
}());