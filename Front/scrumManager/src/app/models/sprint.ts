import { Project } from "./project";
import { TicketScrum } from "./ticket-scrum";

export class Sprint {
    constructor(public id : number, public title: string, public tickets: TicketScrum[], public started: Boolean, public backlog: boolean, public project?: Project) {
    }
}