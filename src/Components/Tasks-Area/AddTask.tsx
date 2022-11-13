import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { tasksState } from "../../mobx/tasks-state";
import { HouseMemberModel } from "../../Models/house-member-model";
import { TaskModel } from "../../Models/task-model";
import { formStyle, errStyle } from "../Members-Area/AddMember";

const AddTask = () => {
      const { register, handleSubmit, formState } = useForm<TaskModel>();
      const [houseMembers, setHouseMembers] = useState<HouseMemberModel[]>();
      const [date, setDate] = useState<Date>();
      const [taskCreateDate, setTaskCreateDate] = useState<string>();
      const navigate = useNavigate();

      useMemo(() => {
            const houseMembers = tasksState.houseMembers;
            setHouseMembers(houseMembers);

            const interVal = setInterval(() => {
                  const now = new Date();
                  setDate(now);
            }, 1000);
            setTaskCreateDate(moment(date).format("YYYY-MM-DD, HH:mm:ss"));

            return () => clearInterval(interVal);

      }, [date]);


      useEffect(() => {
            if (houseMembers?.length === 0 || !houseMembers) {
                  alert("No house members. Add some to add a new task");
                  navigate('/add-house-member');
            }

      });


      const submit = (task: TaskModel) => {
            try {
                  task.createDate = taskCreateDate
                  tasksState.addTask(task);
                  alert(`'${task?.taskDescription}' Added Successfully`);
                  navigate("/tasks-list");
            } catch (err: any) {
                  alert(err);
            }
      };

      return (
            <Container>
                  <Form noValidate
                        style={formStyle}
                        onSubmit={handleSubmit(submit)}>

                        <FloatingLabel
                              label='Task-Description'
                              className="mt-2">
                              <Form.Control as='textarea'
                                    type="text"
                                    autoFocus
                                    {...register('taskDescription', {
                                          required: { value: true, message: "Missing description" },
                                          minLength: { value: 3, message: "Description must be minimum 3 chars" },
                                          maxLength: { value: 100, message: "Description can't exceed 100 chars" }
                                    })}
                              />
                              <span className="mb-2" style={errStyle}>
                                    {formState.errors.taskDescription?.message}
                              </span>
                        </FloatingLabel>

                        <FloatingLabel
                              label={"Creating-Date"}
                              className="mt-2 mb-2">
                              <Form.Control
                                    type="datetime"
                                    disabled
                                    value={taskCreateDate}
                                    {...register('createDate')}
                              />
                        </FloatingLabel>


                        <FloatingLabel
                              label={"House-Member"}
                              className="mt-2 mb-2">
                              <Form.Select
                                    defaultValue=""
                                    {...register('memberId', {
                                          required: { value: true, message: "Missing House-Member" }
                                    })}>
                                    <option
                                          value=""
                                          disabled>
                                          Select House Member
                                    </option>
                                    {houseMembers?.map(houseMember =>
                                          <option
                                                key={houseMember.memberId}
                                                value={houseMember.memberId}>
                                                {houseMember.name}
                                          </option>
                                    )}
                              </Form.Select>
                              <span className="mb-2" style={errStyle}>
                                    {formState.errors.memberId?.message}
                              </span>
                        </FloatingLabel>

                        <Button variant="success" type="submit" disabled={!formState.isValid}>
                              Add Task ✔
                        </Button>
                  </Form>
            </Container>
      )
}
export default AddTask;