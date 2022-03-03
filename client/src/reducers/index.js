
import { combineReducers } from 'redux';
import { reducer as authReducer } from './auth';
import { reducer as userReducer } from './users';
import { reducer as configOfClassReducer } from './configsOfClass'
import { reducer as examReducer } from './exam'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    classConfig: configOfClassReducer,
    exam: examReducer
});

export default rootReducer;