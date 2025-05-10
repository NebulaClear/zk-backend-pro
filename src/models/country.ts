// src/models/user.ts
import { countryService } from '@/services/country';
import { Effect, Reducer } from 'umi';

interface User {
  id: number;
  name: string;
  email: string;
}

interface CountryModelState {
  list: User[];
  currentUser?: User;
}

interface CountryModelType {
  namespace: 'country';
  state: CountryModelState;
  effects: {
    fetchCountryList: Effect;
  };
  reducers: {
    saveCountries: Reducer<CountryModelState>;
  };
}

const UserModel: CountryModelType = {
  namespace: 'country',
  state: {
    list: [],
    currentUser: undefined,
  },
  effects: {
    *fetchCountryList({ payload }, { call, put }): Generator<Effect, void, any> {
      try {
        const response = yield call(countryService.getCountryList, payload);
        yield put({
          type: 'saveCountries',
          payload: response,
        });
      } catch (error) {
        console.error('获取用户列表失败:', error);
      }
    },

  },
  reducers: {
    saveCountries(state, { payload }) {
      return { ...state, list: payload };
    },
  },
};

export default UserModel;
