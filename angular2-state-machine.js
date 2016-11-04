"use strict";
var StateMachine = (function () {
    function StateMachine(options) {
        var _this = this;
        this.events = [];
        this.transitions = {};
        var seen = [];
        this.initial = options.initial;
        this.events = options.events;
        this.events.forEach(function (event) {
            _this.defineTransitions(event);
            _this.current = _this.initial;
            _this.checkUnique(seen, event.name);
        });
    }
    StateMachine.prototype.defineTransitions = function (event) {
        var _this = this;
        event.from.forEach(function (fromState) {
            if (!_this.transitions[fromState]) {
                _this.transitions[fromState] = [event.name];
            }
            else {
                if (_this.transitions[fromState].indexOf(event.name) === -1) {
                    _this.transitions[fromState].push(event.name);
                }
            }
        });
    };
    StateMachine.prototype.checkUnique = function (seen, eventName) {
        if (seen.indexOf(eventName) === -1) {
            seen.push(eventName);
        }
        else {
            seen = null;
            throw new Error('You have to use unique names for all events');
        }
    };
    StateMachine.prototype.getCurrent = function () {
        return this.current;
    };
    StateMachine.prototype.can = function (eventName) {
        var canFlag = false;
        this.transitions[this.current].map(function (transition) {
            if (transition === eventName) {
                canFlag = true;
            }
        });
        return canFlag;
    };
    StateMachine.prototype.cannot = function (eventName) {
        return !this.can(eventName);
    };
    StateMachine.prototype.getTransitions = function () {
        return this.transitions[this.current];
    };
    StateMachine.prototype.fireAction = function (eventName) {
        if (this.can(eventName)) {
            var event_1 = this.events.filter(function (stateEvent) {
                return stateEvent.name === eventName;
            })[0];
            this.prevState = this.current;
            this.current = event_1.to;
        }
        else {
            throw new Error('You cannot switch to this state');
        }
    };
    StateMachine.prototype.getEvents = function () {
        return this.events;
    };
    StateMachine.prototype.goToPreviousState = function () {
        var _this = this;
        var event = this.events.filter(function (stateEvent) {
            return stateEvent.to === _this.prevState && stateEvent.from.indexOf(_this.current) !== -1;
        })[0];
        this.fireAction(event.name);
    };
    return StateMachine;
}());
exports.StateMachine = StateMachine;
var StateEvent = (function () {
    function StateEvent(options) {
        this.name = options.name;
        this.from = options.from;
        this.to = options.to;
    }
    return StateEvent;
}());
exports.StateEvent = StateEvent;
