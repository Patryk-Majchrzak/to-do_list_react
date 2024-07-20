import { selectTasks, toggleTaskDone, removeTask} from "../tasksSlice";
import { ListItem, TaskButton, TaskContent, List } from "./styled";
import { useDispatch, useSelector } from "react-redux";

const Tasks = () => {
    const { tasks, hideDone } = useSelector(selectTasks);
    const dispatch = useDispatch();

    console.log(tasks.tasks);

    return (
        <List>
            {tasks.tasks.map(task => (
                <ListItem $hidden={task.done & hideDone} key={task.id}>
                    <TaskButton $toggleDone onClick={() => dispatch(toggleTaskDone(task.id))}>
                        {task.done ? "✔" : ""}
                    </TaskButton>
                    <TaskContent $done={task.done}>
                        {task.content}
                    </TaskContent>
                    <TaskButton $remove onClick={() => dispatch(removeTask(task.id))}>
                        🗑
                    </TaskButton>
                </ListItem>
            ))}
        </List>
    )
};

export default Tasks;