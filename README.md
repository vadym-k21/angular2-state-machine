# Description

Angular 2 State Machine - Almost 100% copy of Jakes Gordon javascript-state-machine [https://github.com/jakesgordon/javascript-state-machine]

**Not actively supporting anymore** Can be used as guide of applying state machine on Angular 2.

# NPM Package:
 
 ```
npm i angular2-state-machine
```

# Documentation

State Machine is powerful tool to handle your app states. A lot of apps must handle states
and this little service will help you to do it as easy as possible.

## Initialization

You can check real example inside core.spec folder.

Here I will some code snippets to make it easier to start working with it.

Package itself consists of two parts:
 - StateMachine - service that will handle states changes.
 - StateEvent - typed class that StateMachine uses to define events.

First of all you need to import StateMachine and StateEvent from stateMachine.ts file.

```
import {StateMachine, StateEvent} from 'angular2-state-machine/core';
```

## Create State Machine

First of all, You need to create state machine itself. The you need to create StateEvent with transitional states.

For instance, we can create traffic lights:

```
import {StateMachine, StateEvent} from 'angular2-state-machine/core';

export class StateService {
    ngOnInit() {
        this.stateMachine = new StateMachine({
            initial: initial,
            events: [
                new StateEvent({
                     name: 'warn', from: ['green', 'red'], to: 'yellow'
                }),
                new StateEvent({
                     name: 'panic', from: ['yellow'], to: 'red'
                }),
                new StateEvent({
                    name: 'go', from: ['yellow'], to: 'green'
                })                          
            ]
            });
    }
}
```

So, whenever you will fire 'warn' event, StateMachine will check if status is green or red and change state to yellow.

## Changing states

You can change events using 'fireAction' method:

```
import {StateMachine, StateEvent} from 'angular2-state-machine/core';

export class StateService {
    ngOnInit() {
        this.stateMachine = new StateMachine({...});
    }
    onTrafficLightsChange() {
        this.stateMachine.fireAction('warn');
    }
}
```

Then you can switch to 'panic' or 'go' events:

```
    onTrafficLightsChange() {
        this.stateMachine.fireAction('warn');
        this.stateMachine.fireAction('go');
    }
```

## Get current state:

To get current state you can use 'getCurrent' method:

```
    getCurrentState() {
        this.stateMachine.getCurrent();
    }
```

## Get available events names:

You can also grab all available events names by using 'getEvents' method:

```
    getEventsNames() {
        this.stateMachine.getEvents();
    }
```

## Get transitions names:

It is easy to get all available transitions names ('to' property in StateEvent) using 'getTransitions':

```
    getAllAvailableTransitions() {
        this.stateMachine.getTransitions();
    }
```

## Possibility to change state:

If you are not sure about State Machine state and transitions availability, you can check if it is possible to switch to the specified state using 'can' and 'cannot':

```
    checkPossibilityToChangeState() {
        if(this.stateMachine.can('go')){ 
            ....   
        } else {
            ....    
        }
        ...
        if(this.stateMachine.cannot('go')){ 
            ....   
        } else {
            ....    
        }        
        
    }
```

## Previous state:

It is not a big deal to go to the previous state using 'goToPreviousState':

```
    goBack() {
        this.stateMachine.goToPreviousState();
    }
```

## Error Handling

If you will try to switch to those state that is not in 'from' or 'to' property, You will see an error:
```
'You cannot switch to this state'.
```
You also will see an error if you will try to create not unique events:
```
'You have to use unique names for all events'. 
```

 
