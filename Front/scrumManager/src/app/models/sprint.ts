import { Ticket } from "./ticket";

export class Sprint {
    constructor(
        public id : number, 
        public title: string, 
        public tickets: Ticket[], 
        public started: Boolean, 
        public backlog: boolean) {
    }
}