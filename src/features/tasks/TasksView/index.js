import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import TaskList from "./TaskList";
import MainHeader from "../../../common/MainHeader";
import Section from "../../../common/Section"
import SectionHeader from "../../../common/Section/SectionHeader";
import SectionBody from "../../../common/Section/SectionBody";
import ButtonsArea from "./ButtonsArea";
import { welcome } from "../../../utils/welcome"
import { Main } from "./styled";
import { Button } from "./Buttons/styled";
import { fetchExampleTasks, selectIsError, selectIsLoading } from "../tasksSlice";
import SearchTasks from "./SearchTasks";

welcome();

function TasksView() {

    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);

    console.log(isError)

    if (!isError) {
        return (
            <Main>
                <MainHeader title="Lista zadań" />
                <Section
                    sectionHeader=
                    {<SectionHeader
                        title="Dodaj nowe zadanie"
                        additionalAttribute="grid"
                        additionalContent=
                        {<Button
                            onClick={() => dispatch(fetchExampleTasks())}
                            disabled={isLoading}
                        >
                            {isLoading ? "Ładuję zadania" : "Pobierz przykładowe zadania"}
                        </Button>}
                    />}
                    sectionBody=
                    {<SectionBody content=
                        {<Form />}
                    />}
                />

                <Section
                    sectionHeader=
                    {<SectionHeader
                        title="Wyszukiwarka zadań"
                    />}
                    sectionBody=
                    {<SectionBody content=
                        {<SearchTasks />}
                    />}
                />

                <Section
                    sectionHeader=
                    {<SectionHeader
                        title="Lista zadań"
                        additionalAttribute="grid"
                        additionalContent=
                        {<ButtonsArea />}
                    />}
                    sectionBody=
                    {<SectionBody
                        content=
                        {<TaskList />}
                    />}
                />
            </Main>
        );
    } else {
        return (
            <Section
                sectionHeader=
                {<SectionHeader
                    title="Błąd przy pobieraniu zadań"
                />}
                sectionBody=
                {<SectionBody content=
                    "Nie udało się pobrać zadań 😢 Spróbuj ponownie później"
                />}
            />
        )
    }
}
export default TasksView;