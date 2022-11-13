import { action, makeObservable, observable } from "mobx";
import { HouseMemberModel } from "../Models/house-member-model";
import { TaskModel } from "../Models/task-model";
import { v4 as uuid } from "uuid";


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
            if (isEmptyOrSpaces(task?.taskDescription)) throw Error('Theres some empty fields. Check again... ( ;');
            task.id = uuid();
            this.tasks.push(task);
            this.save('tasks', this.tasks);
      }

      @action
      public updateTask(taskToUpdate: TaskModel) {
            if (isEmptyOrSpaces(taskToUpdate?.taskDescription)) throw Error('Theres some empty fields. Check again... ( ;');

            this.tasks = this.tasks.filter(task => task.id !== taskToUpdate.id);
            this.tasks.push(taskToUpdate);
            this.save('tasks', this.tasks);
      }

      //Delete a task from the tasks list:
      @action
      public deleteTask(taskId: string) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.save('tasks', this.tasks);
      }

      //Add a new house member to the house members list:
      @action
      public addHouseMember(houseMember: HouseMemberModel) {
            if (isEmptyOrSpaces(houseMember?.name || houseMember?.description)) throw Error('Theres some empty fields. Check again... ( ;');
            houseMember.memberId = uuid();
            if (this.houseMembers?.find(hm => hm.name === houseMember.name)) {
                  throw new Error("House member already exists");
            }
            this.houseMembers.push(houseMember);
            localStorage.setItem("houseMembers", JSON.stringify(this.houseMembers));
      }

      @action
      public updateHouseMember(memberToUpdate: HouseMemberModel) {
            if (isEmptyOrSpaces(memberToUpdate?.name || memberToUpdate?.description)) throw Error('Theres some empty fields. Check again... ( ;');

            this.houseMembers = this.houseMembers.filter(member => member.memberId !== memberToUpdate.memberId);
            this.houseMembers.push(memberToUpdate);
            this.save('houseMembers', this.houseMembers);
      }

      @action
      public deleteHouseMember(houseMemberId: string) {
            this.houseMembers = this.houseMembers.filter(member => member.memberId !== houseMemberId);
            this.save('houseMembers', this.houseMembers);
      }




      @action
      private save(nameToSave: string, value: Object) {
            localStorage.setItem(nameToSave, JSON.stringify(value));
      }
}

function isEmptyOrSpaces(str: string) {
      return str === null || str.match(/^ *$/) !== null;
}
export const tasksState = new TasksState();
