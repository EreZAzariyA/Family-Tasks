import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { tasksState } from "../../mobx/tasks-state";
import { TaskModel } from "../../Models/task-model";

const EditTask = () => {
      const [task, setTask] = useState<TaskModel>();
      const params = useParams();
      const taskId = +params.taskId;

      useEffect(() => {
            console.log(taskId);
            const task = tasksState.tasks.find(task => task.id === taskId);
            setTask(task);
      }, [taskId]);

      return (
            <Container>
                  {task?.taskDescription}
            </Container>
      )
}
export default EditTask