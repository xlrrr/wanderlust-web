var LocationInputModel = (function () {
    function LocationInputModel(id, name, desc, loc) {
        this._id = id;
        this.name = name;
        this.desc = desc;
        this.location = loc;
    }

    return LocationInputModel;
}());