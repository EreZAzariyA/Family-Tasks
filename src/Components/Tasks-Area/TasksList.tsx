import { autorun } from "mobx";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { Button, ButtonGroup, Container, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { tasksState } from "../../mobx/tasks-state";
import { TaskModel } from "../../Models/task-model";
import TaskCard from "./TaskCard";

export const pageTitleStyle: React.CSSProperties = {
      fontFamily: 'cursive',
      textDecoration: 'underline'
}

const TasksList = () => {
      const [tasks, setTasks] = useState<TaskModel[]>();
      const [asTable, setAsTable] = useState<boolean>(false);
      const navigate = useNavigate();

      useEffect(() => {
            const fromLast = localStorage.getItem('asTable');
            const switchBtn = document.getElementById('switchBtn');
            if (fromLast === 'true') {
                  (switchBtn as HTMLInputElement).checked = true;
                  setAsTable(true);
            } else if (fromLast === 'false') {
                  setAsTable(false);
            }
      }, []);

      useMemo(() => {
            autorun(() => {
                  const tasks = tasksState.tasks;
                  setTasks(tasks);
            });
      }, [])

      const switchHandle = (e: SyntheticEvent) => {
            const value = (e.target as HTMLInputElement).checked;
            if (value === true) {
                  setAsTable(true);
                  localStorage.setItem('asTable', 'true');
            } else if (value === false) {
                  setAsTable(false);
                  localStorage.setItem('asTable', 'false');
            }
      }

      const editTask = (e: SyntheticEvent) => {
            const taskId = (e.target as HTMLInputElement).value;
            navigate('/update-task/' + taskId);
      }

      const deleteTask = (e: SyntheticEvent) => {
            const taskId = (e.target as HTMLInputElement).value;
            const answer = window.confirm("Are you sure");
            if (answer) {
                  tasksState.deleteTask(taskId);
                  alert("Task deleted successfully")
            }
      }

      const getMemberByMemberId = (memberId: string) => {
            const member = tasksState.houseMembers?.find(member => member.memberId === memberId);
            return member?.name;
      }

      return (
            <Container fluid>
                  <h3 style={pageTitleStyle}>Tasks List</h3>

                  {(tasks?.length === 0 || !tasks) &&
                        <>
                              <p>Add some tasks to them here</p>
                        </>
                  }

                  {tasks?.length > 0 &&

                        <>
                              <ButtonGroup size='sm'>
                                    <p>Cards</p>
                                    <Form.Check
                                          type="switch"
                                          onChange={switchHandle}
                                          id="switchBtn"
                                    />
                                    <p>Table</p>
                              </ButtonGroup>

                              <br />

                              {asTable && tasks.length > 0 &&
                                    <Table>
                                          <thead>
                                                <tr>
                                                      <th>Date</th>
                                                      <th>Member</th>
                                                      <th>Description</th>
                                                      <th>Edit/Remove</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {tasks?.map(task =>
                                                      <tr key={task?.id}>
                                                            <td>{task?.createDate}</td>
                                                            <td>{getMemberByMemberId(task?.memberId)}</td>
                                                            <td>{task?.taskDescription}</td>
                                                            <td>
                                                                  <ButtonGroup size="sm">
                                                                        <Button
                                                                              variant="secondary"
                                                                              onClick={editTask}
                                                                              value={task?.id}>
                                                                              Edit ✏
                                                                        </Button>
                                                                        <Button
                                                                              variant="danger"
                                                                              onClick={deleteTask}
                                                                              value={task?.id}>
                                                                              Remove❌
                                                                        </Button>
                                                                  </ButtonGroup>
                                                            </td>
                                                      </tr>
                                                )}
                                          </tbody>
                                    </Table>
                              }
                              {!asTable &&
                                    <>
                                          {tasks?.map(task =>
                                                <TaskCard key={task?.id} task={task} />
                                          )}
                                    </>
                              }
                        </>
                  }
            </Container>
      )
}
export default TasksList;