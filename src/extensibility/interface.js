"use strict";
exports.__esModule = true;
exports.ExtensibleInterface = void 0;
var ExtensibleInterface = /** @class */ (function () {
    function ExtensibleInterface(id) {
        var baseInterfaces = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            baseInterfaces[_i - 1] = arguments[_i];
        }
        this.id = id;
        this.baseInterfaces = baseInterfaces;
    }
    return ExtensibleInterface;
}());
exports.ExtensibleInterface = ExtensibleInterface;
function intersection() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
}
function foo(array) {
    if (array.length == 0) {
        return 0;
    }
    var head = array[0], tail = array.slice(1);
    return 1 + foo(tail);
}
foo([1, 2, 3]);
function bar(tuple) {
}
function bat(tuple) {
}
bat([]);
function boo(a, b) { }
var tuple = [1, 'a'];
boo(tuple);
