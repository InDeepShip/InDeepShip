import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions';
import * as types from '../actions/types';
import fetchMock from 'fetch-mock';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates FETCH_SIGNUP', () => {
      fetchMock.postOnce('/api/users/signup/', {
        body: { key: '', user: {} },
        headers: { 'content-type': 'application/json' }
      })

    const user = {
        account: "private",
        address: "7055 Charmant Drive Apt 101",
        email: "mdcovarr@ucsc.edu",
        name: "Michael Covarrubias",
        password: "pbkdf2_sha256$150000$L8ItSCOnk7Pm$Kno9P05CbqckzyVWq/rE17Edbb6gOlMNKEUeOkMGOgE="
    };

    const expectedActions = [
        { type: types.AUTH_START },
        { type: types.AUTH_SUCCESS, token: 'e29d50cccf1ab9156ce741b99fc25f664aedeca9', user: user },
    ];

    let postObj = {
        name: 'Michael Covarrubias',
        address: '7055 Charmant Drive Apt 101',
        email: 'mdcovarr@ucsc.edu',
        password1: 'Something123',
        password2: 'Something123',
        account: 'private'
    };

    let initStore = {
            token: null,
            error: null,
            loading: false,
            user: null
    };

    const store = mockStore(initStore);

    return store.dispatch(actions.authSignup(...postObj)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })