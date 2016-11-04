/**
 * Created by vkukhtin on 08/08/16.
 */
import {StateMachine, StateEvent} from '../../../dist/stateMachine';

let fsm = new StateMachine({
    initial: 'green',
    events: [
        new StateEvent({
            name: 'toGreen', from: ['yellow'], to: 'green'
        }),
        new StateEvent({
            name: 'toRed', from: ['yellow'], to: 'red'
        }),
        new StateEvent({
            name: 'toYellow', from: ['red', 'green'], to: 'yellow'
        })
    ]
});

describe('StateMachine', () => {

    describe('that we can use it ', () => {
        it(' using constructor', () => {
            expect(fsm instanceof StateMachine).toBe(true);
        });

        it(' Error exception', () => {
            try {
                new StateMachine({
                    initial: 'green',
                    events: [
                        new StateEvent({
                            name: 'toGreen', from: ['yellow'], to: 'green'
                        }),
                        new StateEvent({
                            name: 'toRed', from: ['yellow'], to: 'red'
                        }),
                        new StateEvent({
                            name: 'toYellow', from: ['red', 'green'], to: 'yellow'
                        }),
                        new StateEvent({
                            name: 'toGreen', from: ['yellow'], to: 'green'
                        })
                    ]
                });
            } catch(e) {
                expect(e instanceof Error).toBe(true);
                expect(e.message).toBe('You have to use unique names for all events');
            }
        });

        it('getCurrent', () => {
            expect(fsm.getCurrent()).toBe('green');
            fsm.fireAction('toYellow');
            expect(fsm.getCurrent()).toBe('yellow');
        });

        it('can', () => {
            expect(fsm.can('toRed')).toBe(true);
            expect(fsm.can('toGreen')).toBe(true);
            expect(fsm.can('toYellow')).toBe(false);
        });

        it('cannot', () => {
            expect(fsm.cannot('toRed')).toBe(false);
            expect(fsm.cannot('toGreen')).toBe(false);
            expect(fsm.cannot('toYellow')).toBe(true);
        });

        it('fireAction', () => {
            fsm.fireAction('toRed');
            expect(fsm.getCurrent()).toBe('red');
            fsm.fireAction('toYellow');
            expect(fsm.getCurrent()).toBe('yellow');
            fsm.fireAction('toGreen');
            expect(fsm.getCurrent()).toBe('green');
        });

        it('fireAction with Error', () => {
            try {
                fsm.fireAction('toRed');
            } catch(e) {
                expect(e instanceof Error).toBe(true);
                expect(e.message).toBe('You cannot switch to this state');
            }
        });

        it('getTransitions', () => {
            expect(fsm.getTransitions()[0]).toBe('toYellow');
        });

        it('getEvents', () => {
            expect(fsm.getEvents() instanceof Array).toBe(true);
            expect(fsm.getEvents().length).toBe(3);
            expect(fsm.getEvents()[0] instanceof StateEvent).toBe(true);
            expect(fsm.getEvents()[0].name).toBe('toGreen');
        });

        it('goToPreviousState', () => {
            fsm.goToPreviousState();
            expect(fsm.getCurrent()).toBe('yellow');
        });
    });
});
