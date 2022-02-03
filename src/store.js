import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)


const store = new Vuex.Store({
    plugins: [createPersistedState({
        paths: ['currentUser']
    })],
    state: {
        currentUser:{
            token: '',
            email: '',
            cardNumber: '',
            firstName: '',
            lastName: '',
            surname: ''
        }, 


    },
        getters: {
            isSignedIn(state) {
                return state.currentUser.token !== '';
            }
        },
        mutations:{
            setUserToken(state,userToken){
                state.currentUser.token = userToken ?? '';
            },
            setCurrentUser(state, newCurrentUser) {
                state.currentUser.token = newCurrentUser.token ?? '';
            },
            setUserData(state, userData){
               state.currentUser.cardNumber = userData.cardNumber ?? '',
               state.currentUser.firstName = userData.firstName ?? '',
               state.currentUser.lastName = userData.lastName ?? '',
               state.currentUser.surname = userData.surname ?? '', 
               state.currentUser.email = userData.email ?? ''
            }
        }
    });
export default store;