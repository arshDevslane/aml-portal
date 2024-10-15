import { all, call, put, takeLatest } from 'redux-saga/effects';
import { QuestionSetActionType } from 'store/actions/actions.constants';
import { StoreAction } from 'models/StoreAction';
import {
  questionSetFetchCompletedAction,
  questionSetFetchErrorAction,
} from 'store/actions/questionSet.actions';
import { questionSetService } from 'services/api-services/QuestionSetService';

function* QuestionSetFetchSaga({
  payload,
}: StoreAction<QuestionSetActionType>): any {
  try {
    const response = yield call(questionSetService.fetchQuestionSet, {
      question_set_id: payload,
    });
    yield put(questionSetFetchCompletedAction(response.result));
  } catch (e: any) {
    yield put(
      questionSetFetchErrorAction(
        (e?.errors && e.errors[0]?.message) || e?.message
      )
    );
  }
}

function* questionSetSaga() {
  yield all([
    takeLatest(QuestionSetActionType.FETCH_QUESTION_SET, QuestionSetFetchSaga),
  ]);
}

export default questionSetSaga;