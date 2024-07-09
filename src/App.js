import Form from "./Form";
import Tasks from "./Tasks";
import Header from "./Header";
import Section from "./Section"
import SectionHeader from "./SectionHeader";
import SectionBody from "./SectionBody";
import ButtonsArea from "./ButtonsArea";
import Container from "./Container";
import { useEffect, useState } from "react";
import { welcome } from "./utils/welcome";


const defaultTasks = JSON.parse(localStorage.getItem("tasks")) || [
    {
        id: 1,
        content: "zrobić coś",
        done: false
    },
    {
        id: 2,
        content: "zrobić coś innego",
        done: true
    }
];

function App() {

    welcome();

    const [tasks, setTasks] = useState(defaultTasks);

    const [hideDone, setHideDone] = useState(false);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks]);

    const toggleTaskDone = (id) => {
        setTasks(tasks.map((task) => {
            if (task.id === id) {
                return { ...task, done: !task.done };
            }
            return task;
        }));
    };

    const removeTask = (id) => {
        setTasks(tasks => tasks.filter(task => task.id !== id));
    };

    const hideDoneTasks = () => {
        setHideDone(hideDone => !hideDone);
    };

    const setAllDone = () => {
        setTasks(tasks.map((task) => {
            return { ...task, done: true }
        }));
    };

    const addNewTask = (newTaskContent) => {
        setTasks(tasks => [
            ...tasks,
            {
                id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
                content: newTaskContent,
                done: false,
            }
        ]);
    };

    return (
        <Container>
            <Header title="Lista zadań" />
            <Section
                sectionHeader={<SectionHeader title="Dodaj nowe zadanie" />}
                sectionBody=
                {<SectionBody content=
                    {<Form addNewTask={addNewTask} />}
                />}
            />
            <Section
                sectionHeader=
                {<SectionHeader
                    title="Lista zadań"
                    additionalClass="section__header--withButtons"
                    additionalContent=
                    {<ButtonsArea
                        tasks={tasks}
                        hideDone={hideDone}
                        hideDoneTasks={hideDoneTasks}
                        setAllDone={setAllDone}
                    />}
                />}
                sectionBody=
                {<SectionBody
                    additionalClass="section__body--withList"
                    content=
                    {<Tasks
                        tasks={tasks}
                        hideDone={hideDone}
                        toggleTaskDone={toggleTaskDone}
                        removeTask={removeTask}
                    />}
                />}
            />
        </Container>
    );
}

export default App;