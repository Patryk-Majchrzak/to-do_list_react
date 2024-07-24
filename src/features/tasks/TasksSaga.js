import { call, put, takeLatest, select, takeEvery, delay } from "redux-saga/effects";
import { fetchExampleTasks, selectTasks, fetchExampleTasksError, fetchExampleTasksSuccess } from "./tasksSlice";
import { saveTasksInLocalStorage } from "./localStorage";
import { getExampleTasks } from "./getExampleTasks";
import { setLanguage, selectTitle } from "./languageSlice";
import i18n from "../../i18n";

function* fetchExampleTasksHandler() {
    try {
      yield delay(2000);
      const exampleTasks = yield call(getExampleTasks);
      yield put(fetchExampleTasksSuccess(exampleTasks.data));
    } catch (error) {
      yield put(fetchExampleTasksError());
    }
  }

function* handleLocalStorage() {
    const tasks = yield select(selectTasks);
    yield call(saveTasksInLocalStorage, tasks);
}

function* changeLanguageSaga({payload: language}) {
  const title = yield select(selectTitle);
  
  document.documentElement.lang = language;
  document.title = title;

  yield call ([i18n, "changeLanguage"], language)
}

export function* watchLanguageChange() {
  yield takeLatest(setLanguage.type, changeLanguageSaga);
}

export function* watchTasksActions() {
    yield takeLatest(fetchExampleTasks.type, fetchExampleTasksHandler)
    yield takeEvery("*", handleLocalStorage)
}