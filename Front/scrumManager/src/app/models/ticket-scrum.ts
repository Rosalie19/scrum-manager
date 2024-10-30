import { Sprint } from "./sprint";

export class TicketScrum {
    constructor(
        public id : number, 
        public title: string, 
        public points: number, 
        public status : number,
        public sprint?: Sprint) {
    }
    
}