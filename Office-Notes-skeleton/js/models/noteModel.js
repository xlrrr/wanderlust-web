var app = app || {};

app.noteModel = (function () {
    function NoteModel(requester) {
        this.requester = requester;
        this.serviceUrl = this.requester.baseUrl +
            'appdata/' +
            this.requester.appId +
            '/notes';
    }

    NoteModel.prototype.getOfficeNotes = function () {
        console.log(getCurrentDate());
        var requestUrl = this.serviceUrl+ '?query={"deadline":"' + getCurrentDate() + '"}'
        return this.requester.get(requestUrl, true);
    };
    NoteModel.prototype.getUserNotes = function () {
        var requestUrl = this.serviceUrl+ '?query={"author._id":"' + sessionStorage['userId'] + '"}'
        return this.requester.get(requestUrl, true);
    };

    NoteModel.prototype.addNote = function(data) {
        return this.requester.post(this.serviceUrl, data, true);
    };

    NoteModel.prototype.editNote = function(noteId,data) {
        return this.requester.put(this.serviceUrl+"/"+noteId, data, true);
    };
    NoteModel.prototype.deleteNote = function(noteId) {
        return this.requester.delete(this.serviceUrl+"/"+noteId, null, true);
    };
    function getCurrentDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = yyyy+'-'+mm+'-'+dd;
        return today;
    }

    return {
        load: function(requester) {
            return new NoteModel(requester);
        }
    }
}());

