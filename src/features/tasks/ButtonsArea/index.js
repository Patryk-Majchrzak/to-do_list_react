import { selectTasks, hideDoneTasks, setAllDone } from "../tasksSlice";
import { StyledButtonsArea, Button } from "./styled";
import { useDispatch, useSelector } from "react-redux";

const ButtonsArea = () => {

    const { tasks, hideDone } = useSelector(selectTasks);
    const dispatch = useDispatch();

    if (!tasks.length) {
        return null;
    }

    return (
        <StyledButtonsArea>
            <Button onClick={() => dispatch(hideDoneTasks())}>
                {hideDone ? "Pokaż" : "Ukryj"} ukończone
            </Button>
            <Button
                disabled={tasks.every(({ done }) => done)}
                onClick={() => dispatch(setAllDone())}
            >
                Ukończ wszystkie
            </Button>
        </StyledButtonsArea>
    );
};

export default ButtonsArea;