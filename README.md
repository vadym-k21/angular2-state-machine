### Description

Angular 2 State Machine - Almost 100% copy of Jakes Gordon javascript-state-machine [https://github.com/jakesgordon/javascript-state-machine]

You can run the example in example folder and You can find all instructions inside example repo README.

### Documentation

State Machine is powerful tool to handle your app states. A lot of apps must handle states
and this little service will help you to do it as easy as possible.

## Initialization

You can check real example inside example folder.

Here I will some code snippets to make it easier to start working with it.

Package itself consists of two parts:
1. StateMachine - service that will handle states changes.
2. StateEvent - typed class that StateMachine uses to define events that StateMachine will change.

First of all you need to import StateMachine and StateEvent from stateMachine.ts file.

```
import {StateMachine, StateEvent} from 'angular2-state-machine';
```