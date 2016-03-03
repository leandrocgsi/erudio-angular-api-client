"use strict";

function TableSelection() {
    var self = this;
    self.selecteds = [];
    self.allSelected = false;

    self.toggleAllSelected = function() {
        if (self.isAllSelected()) {
            self.allSelected = false;
        } else {
            self.allSelected = true;
        }
        self.selecteds = [];
    };

    self.isAllSelected = function() {
        return (self.allSelected && isSelectedsVazio());
    };

    self.toggleItem = function(item){
        if ((self.allSelected && self.isItemSelected(item)) || (!self.allSelected && !self.isItemSelected(item))) {
            self.selecteds.push(item);
        } else {
            removeItem(item);
        }
    };

    self.isItemSelected = function (item) {
        if (self.allSelected && isSelectedsVazio()) {
            return true;
        } else if (!self.allSelected && isSelectedsVazio()) {
            return false;
        } else {
            return (!self.allSelected && Boolean(getItem(item))) || (self.allSelected && !Boolean(getItem(item)));
        }
    };

    self.existeItemSelected = function(totalRegistros) {
        return (!self.allSelected && self.selecteds.length !== 0) || (self.allSelected && (self.selecteds.length !== totalRegistros));
    };

    function getItem(item) {
        for (var i of self.selecteds) {
            if (angular.equals(i, item)) {
                return i;
            }
        }
        return null;
    }

    function removeItem(item) {
        var index = getItemIndex(item);
        self.selecteds.splice(index, 1);
    }

    function getItemIndex(item) {
        return self.selecteds.indexOf(item);
    }

    function isSelectedsVazio() {
        return self.selecteds.length === 0;
    }
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
