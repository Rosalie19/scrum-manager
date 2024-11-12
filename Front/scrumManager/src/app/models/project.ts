import { Sprint } from "./sprint";

export class Project {
    constructor(
        public id : number, 
        public title: string, 
        public description: string, 
        public sprints: Sprint[]) {
    }
}