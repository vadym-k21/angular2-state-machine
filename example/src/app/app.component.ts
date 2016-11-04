import { Component } from '@angular/core';
import { StateMachine, StateEvent} from '../../../dist/stateMachine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public fsm: StateMachine;
  public changeState(): void {
    this.fsm.fireAction(this.fsm.getTransitions()[0]);
  }
  ngOnInit(): void {
    this.fsm = new StateMachine({
      initial: 'green',
      events: [
        new StateEvent({
          name: 'toGreen', from: ['yellow'], to: 'green'
        }),
        new StateEvent({
          name: 'toRed', from: ['yellow'], to: 'red'
        }),
        new StateEvent({
          name: 'toYellowFromRed', from: ['red'], to: 'yellow'
        }),
        new StateEvent({
          name: 'toYellowFromGreen', from: ['green'], to: 'yellow'
        })
      ]
    });
  }
}
