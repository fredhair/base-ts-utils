if (!Array.prototype.last) {
    Array.prototype.last = {
        get: function () {
            return this.length ? this[this.length - 1] : undefined
        },
        set: function (value: never) {
            if (this.length) {
                this[this.length - 1] = value;
            }
        }
    }
}

if (!Array.prototype.replaceAt) {
    Array.prototype.replaceAt = function (index, value) {
        return this.splice(index, 1, value);
    }
}

if (!Array.prototype.removeAt) {
    Array.prototype.removeAt = function (index) {
        return this.splice(index, 1);
    }
}

export { };