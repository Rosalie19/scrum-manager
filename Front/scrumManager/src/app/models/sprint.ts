import { TicketScrum } from "./ticket-scrum";

export class Sprint {
    constructor(public id : number, public title: string, public tickets: TicketScrum[]) {
    }
}