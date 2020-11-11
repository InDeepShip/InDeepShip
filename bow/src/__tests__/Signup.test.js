import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import store from '../store';
import { authSignup } from '../actions';

describe('user signup tests', () => {
     let fakeAxios;
     let tmpStore;

    beforeEach( () => {
        fakeAxios = new MockAdapter(axios);
        tmpStore = store;
    });

    const userSlice = () => tmpStore.getState().auth;

    test("Should add the user to the store if it's saved to the server", async () => {
        // Arrange: initialize code
        const user = {name : "David", address : "1150 high stree", email : " aa@aa.com", password1 : "11111111", password2 : "11111111", account : "broker"};
        const savedUser = {...user, id: 1};
        fakeAxios.onPost("http://127.0.0.1:8000/api/users/signup/").reply(200, savedUser);

        // Act
        await tmpStore.dispatch(authSignup(user));

        // Assert
        console.log(tmpStore.getState());
        expect(userSlice().user).toContainEqual(savedUser);
    });

    test("Should not add the user to the store if it's not saved to the server", async () => {
        
        const user = {name : "David", address : "1150 high stree", email : " aa@aa.com", password1 : "11111111", password2 : "11111111", account : "broker"};
        fakeAxios.onPost("http://127.0.0.1:8000/api/users/signup/").reply(500);

        await tmpStore.dispatch(authSignup(user));

        expect(userSlice().user).toHaveLength(0);
    });
    
});

