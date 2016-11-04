/**
 * Created by vkukhtin on 08/08/16.
 */
// TODO: Add possibility to add array of event.from
export class StateMachine {
    private initial: string;
    private current: string;
    private events: Array<StateEvent> = [];
    private transitions: any = {};
    private prevState: String;
    private defineTransitions(event: StateEvent): void {
        event.from.forEach((fromState: string) => {
            if (!this.transitions[fromState]) {
                this.transitions[fromState] = [event.name];
            } else {
                if (this.transitions[fromState].indexOf(event.name) === -1) {
                    this.transitions[fromState].push(event.name);
                }
            }
        });
    }

    private checkUnique(seen: Array<string>, eventName: string): void {
        if (seen.indexOf(eventName) === -1) {
            seen.push(eventName);
        } else {
            seen = null;
            throw new Error('You have to use unique names for all events');
        }
    }

    constructor(options: any) {
        let seen: Array<string> = [];
        this.initial = options.initial;
        this.events = options.events;
        this.events.forEach((event: StateEvent) => {
            this.defineTransitions(event);
            this.current = this.initial;
            this.checkUnique(seen, event.name);
        });
    }

    public getCurrent(): string {
        return this.current;
    }

    public can(eventName: string): boolean {
        let canFlag: boolean = false;
        this.transitions[this.current].map((transition: string) => {
            if (transition === eventName) {
                canFlag = true;
            }
        });
        return canFlag;
    }

    public cannot(eventName: string): boolean {
        return !this.can(eventName);
    }

    public getTransitions(): Array<any> {
        return this.transitions[this.current];
    }

    public fireAction(eventName: string): void {
        if (this.can(eventName)) {
            let event: StateEvent = this.events.filter((stateEvent: StateEvent) => {
                return stateEvent.name === eventName;
            })[0];
            this.prevState = this.current;
            this.current = event.to;
        } else {
            throw new Error('You cannot switch to this state');
        }
    }

    public getEvents(): Array<StateEvent> {
        return this.events;
    }

    public goToPreviousState(): void {
        let event: StateEvent = this.events.filter((stateEvent: StateEvent) => {
            return stateEvent.to === this.prevState && stateEvent.from.indexOf(this.current) !== -1;
        })[0];
        this.fireAction(event.name);
    }
}

export class StateEvent {
    public name: string;
    public from: Array<string>;
    public to: string;
    constructor(options: any) {
        this.name = options.name;
        this.from = options.from;
        this.to = options.to;
    }
}
