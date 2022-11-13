import { action, makeObservable, observable } from "mobx";
import { HouseMemberModel } from "../Models/house-member-model";
import { TaskModel } from "../Models/task-model";


class TasksState {

      @observable
      public tasks: TaskModel[] = [];

      @observable
      public houseMembers: HouseMemberModel[] = [];

      @observable
      public color: string = null;


      public constructor() {

            this.getTasks();
            this.getHouseMembers();
            makeObservable(this);
      }

      //Get all house members:
      @action
      public getHouseMembers() {
            const houseMembers = localStorage.getItem("houseMembers");
            if (!houseMembers) {
                  localStorage.setItem("houseMembers", JSON.stringify(this.houseMembers));
            }
            this.houseMembers = JSON.parse(houseMembers);
      }

      //Get all tasks:
      @action
      public getTasks() {
            const tasks = localStorage.getItem("tasks");
            if (!tasks) {
                  localStorage.setItem("tasks", JSON.stringify(this.tasks));
            }
            this.tasks = JSON.parse(tasks);
      }


      //Add a new task to the tasks list:
      @action
      public addTask(task: TaskModel) {
            task.id = this.tasks.length + 1;
            this.tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
      }

      //Add a new house member to the house members list:
      @action
      public addHouseMember(houseMember: HouseMemberModel) {
            houseMember.memberId = this.houseMembers?.length + 1;
            if (this.houseMembers?.find(hm => hm.name === houseMember.name)) {
                  throw new Error("House member already exists");
            }
            this.houseMembers.push(houseMember);
            localStorage.setItem("houseMembers", JSON.stringify(this.houseMembers));
      }

      //Delete a task from the tasks list:
      @action
      public deleteTask(taskId: number) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
      }
}
export const tasksState = new TasksState();
