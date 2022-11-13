import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { tasksState } from "../../mobx/tasks-state";
import { TaskModel } from "../../Models/task-model";

interface TaskCardProps {
      task: TaskModel;
}
const TaskCard = (props: TaskCardProps) => {
      const navigate = useNavigate();

      const getMemberByMemberId = (memberId: number) => {
            const member = tasksState.houseMembers.find(member => member.memberId = memberId);
            return member?.name;
      }

      const editTask = () => {
            navigate('/edit-task/' + props.task.id);
      }
      const deleteTask = () => {
            const answer = window.confirm("Are you sure");
            if (answer) {
                  tasksState.deleteTask(props.task.id);
                  alert("Task deleted successfully")
            }
      }

      return (
            <Card style={{
                  width: '18rem', display: 'inline-block', margin: '5px'
            }}>
                  <Card.Header className='text-muted'>
                        <Card.Title>
                              {getMemberByMemberId(props.task?.memberId)}
                        </Card.Title>
                        {props.task.createDate}
                  </Card.Header>
                  <Card.Body style={{ height: '150px' }}>
                        <Card.Subtitle className="text-decoration-underline">
                              Task-Description
                        </Card.Subtitle>
                        <Card.Text>

                        </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                        <ButtonGroup>
                              <Button variant="secondary" onClick={editTask}>
                                    Edit ✏
                              </Button>
                              <Button variant="danger" onClick={deleteTask}>
                                    Remove❌
                              </Button>
                        </ButtonGroup>
                  </Card.Footer>
            </Card>
      )
}

export default TaskCard;