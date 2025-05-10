// src/models/user.ts
import request from '@/utils/request';
import { Effect, Reducer } from 'umi';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserModelState {
  list: User[];
  currentUser?: User;
}

interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchUsers: Effect;
    createUser: Effect;
  };
  reducers: {
    saveUsers: Reducer<UserModelState>;
    addUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    list: [],
    currentUser: undefined,
  },
  effects: {
    *fetchUsers(_, { call, put }): Generator<Effect, void, any> {
      try {
        const response = yield call(request.get, '/users');
        yield put({ type: 'saveUsers', payload: response });
      } catch (error) {
        console.error('Fetch users failed:', error);
      }
    },
    *createUser({ payload }, { call, put }): Generator<Effect, void, any> {
      try {
        const newUser = yield call(request.post, '/users', payload);
        yield put({ type: 'addUser', payload: newUser });
      } catch (error) {
        console.error('Create user failed:', error);
      }
    },
  },
  reducers: {
    saveUsers(state, { payload }) {
      return { ...state, list: payload };
    },
    addUser(state, { payload }) {
      return { ...state, list: [...state.list, payload] };
    },
  },
};

export default UserModel;
