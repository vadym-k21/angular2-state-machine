"use strict";
var core_1 = require('./core');
var fsm = new core_1.StateMachine({
    initial: 'green',
    events: [
        new core_1.StateEvent({
            name: 'toGreen', from: ['yellow'], to: 'green'
        }),
        new core_1.StateEvent({
            name: 'toRed', from: ['yellow'], to: 'red'
        }),
        new core_1.StateEvent({
            name: 'toYellow', from: ['red', 'green'], to: 'yellow'
        })
    ]
});
describe('StateMachine', function () {
    describe('that we can use it ', function () {
        it(' using constructor', function () {
            expect(fsm instanceof core_1.StateMachine).toBe(true);
        });
        it(' Error exception', function () {
            try {
                new core_1.StateMachine({
                    initial: 'green',
                    events: [
                        new core_1.StateEvent({
                            name: 'toGreen', from: ['yellow'], to: 'green'
                        }),
                        new core_1.StateEvent({
                            name: 'toRed', from: ['yellow'], to: 'red'
                        }),
                        new core_1.StateEvent({
                            name: 'toYellow', from: ['red', 'green'], to: 'yellow'
                        }),
                        new core_1.StateEvent({
                            name: 'toGreen', from: ['yellow'], to: 'green'
                        })
                    ]
                });
            }
            catch (e) {
                expect(e instanceof Error).toBe(true);
                expect(e.message).toBe('You have to use unique names for all events');
            }
        });
        it('getCurrent', function () {
            expect(fsm.getCurrent()).toBe('green');
            fsm.fireAction('toYellow');
            expect(fsm.getCurrent()).toBe('yellow');
        });
        it('can', function () {
            expect(fsm.can('toRed')).toBe(true);
            expect(fsm.can('toGreen')).toBe(true);
            expect(fsm.can('toYellow')).toBe(false);
        });
        it('cannot', function () {
            expect(fsm.cannot('toRed')).toBe(false);
            expect(fsm.cannot('toGreen')).toBe(false);
            expect(fsm.cannot('toYellow')).toBe(true);
        });
        it('fireAction', function () {
            fsm.fireAction('toRed');
            expect(fsm.getCurrent()).toBe('red');
            fsm.fireAction('toYellow');
            expect(fsm.getCurrent()).toBe('yellow');
            fsm.fireAction('toGreen');
            expect(fsm.getCurrent()).toBe('green');
        });
        it('fireAction with Error', function () {
            try {
                fsm.fireAction('toRed');
            }
            catch (e) {
                expect(e instanceof Error).toBe(true);
                expect(e.message).toBe('You cannot switch to this state');
            }
        });
        it('getTransitions', function () {
            expect(fsm.getTransitions()[0]).toBe('toYellow');
        });
        it('getEvents', function () {
            expect(fsm.getEvents() instanceof Array).toBe(true);
            expect(fsm.getEvents().length).toBe(3);
            expect(fsm.getEvents()[0] instanceof core_1.StateEvent).toBe(true);
            expect(fsm.getEvents()[0].name).toBe('toGreen');
        });
        it('goToPreviousState', function () {
            fsm.goToPreviousState();
            expect(fsm.getCurrent()).toBe('yellow');
        });
    });
});
