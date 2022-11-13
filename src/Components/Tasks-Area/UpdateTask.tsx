import { useEffect, useMemo, useState } from "react";
import { Container, FloatingLabel, Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import { tasksState } from "../../mobx/tasks-state";
import { HouseMemberModel } from "../../Models/house-member-model";
import { TaskModel } from "../../Models/task-model";
import { errStyle, formStyle } from "../Members-Area/AddMember";

const UpdateTask = () => {
      const [task, setTask] = useState<TaskModel>();
      const [houseMembers, setHouseMembers] = useState<HouseMemberModel[]>();
      const { register, handleSubmit, formState, setValue } = useForm<TaskModel>();
      const params = useParams();
      const navigate = useNavigate();

      useEffect(() => {
            const taskId = params.taskId;
            const task = tasksState.tasks.find(task => task.id === taskId);
            setTask(task);
            
            setValue("id", task.id);
            setValue("createDate", task.createDate);
            setValue("memberId", task.memberId);
            setValue("taskDescription", task.taskDescription);
      }, [params.taskId, setValue]);

      useMemo(() => {
            const houseMembers = tasksState.houseMembers;
            setHouseMembers(houseMembers);
      }, []);


      const submit = (updatedTask: TaskModel) => {
            tasksState.updateTask(updatedTask);
            alert("Updated successfully")
            navigate("/tasks-list");
      };

      return (
            <Container>
                  <Form style={formStyle} onSubmit={handleSubmit(submit)}>
                        <FloatingLabel
                              label='Task-Id'>
                              <Form.Control
                                    type="text"
                                    disabled
                                    readOnly
                                    className="mb-2"
                                    defaultValue={task?.id}
                              />
                        </FloatingLabel>

                        <FloatingLabel
                              label='Task-Description'>
                              <Form.Control as={'textarea'}
                                    rows={5}
                                    type="text"
                                    defaultValue={task?.taskDescription}
                                    {...register('taskDescription', {
                                          required: { value: true, message: "Missing description" },
                                          minLength: { value: 3, message: "Description must be minimum 3 chars" },
                                          maxLength: { value: 100, message: "Description can't exceed 100 chars" }
                                    })} />
                              <span className="mb-2" style={errStyle}>
                                    {formState.errors.taskDescription?.message}
                              </span>
                        </FloatingLabel>

                        <FloatingLabel
                              label='Task Create-date'>
                              <Form.Control
                                    type="datetime"
                                    className="mb-2 mt-2"
                                    readOnly
                                    disabled
                                    defaultValue={task?.createDate}
                                    {...register('createDate')}
                              />
                        </FloatingLabel>

                        <FloatingLabel
                              label='House-Member'>
                              <Form.Select
                                    defaultValue={task?.memberId}
                                    className="mb-2"
                                    {...register('memberId', {
                                          required: { value: true, message: "Missing House-Member" }
                                    })}>
                                    <option
                                          disabled
                                          value=''>
                                          Select new house member
                                    </option>
                                    {houseMembers?.map(houseMember =>
                                          <option
                                                key={houseMember?.memberId}
                                                value={houseMember?.memberId}>{houseMember?.name}</option>
                                    )}
                              </Form.Select>
                              <span className="mb-2" style={errStyle}>
                                    {formState.errors.memberId?.message}
                              </span>
                        </FloatingLabel>


                        <Button variant="secondary" type="submit" disabled={!formState.isDirty}>
                              Complete ✔
                        </Button>
                  </Form>
            </Container>
      )
}
export default UpdateTask