var NoteInputModel = (function () {
    function NoteInputModel(id, title,text, author, deadline) {
        this._id = id;
        this.title = title;
        this.text = text;
        this.author = author;
        this.deadline = deadline;
    }

    return NoteInputModel;
}());