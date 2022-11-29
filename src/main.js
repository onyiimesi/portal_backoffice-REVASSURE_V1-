import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import VueApexCharts from "vue3-apexcharts"
import './axios'
import "@/assets/base.css";
import Toast from "vue-toastification";
import "./assets/placeholder-loading.min.css";
import "vue-toastification/dist/index.css";

const state = () => ({
    settoken:  null,
    setuserrole:  null,
    setusertype:  null,
    setIsAuth:  null
});

const store = new Vuex.Store({
    state,
    getters: {
        settoken: (state) => {
            return state.settoken;
        },
        setuserrole: (state) => {
            return state.setuserrole;
        },
        setusertype: (state) => {
            return state.setusertype;
        },
        setIsAuth: (state) => {
            return state.setIsAuth;
        }
    },
    actions: {
        
        settoken(context, settoken){
            context.commit('settoken', settoken);
        },

        setuserrole(context, setuserrole){
            context.commit('setuserrole', setuserrole);
        },

        setusertype(context, setusertype){
            context.commit('setusertype', setusertype);
        },

        setIsAuth(context, setIsAuth){
            context.commit('setIsAuth', setIsAuth);
        }
    },
    mutations: {
        settoken(state, settoken){
            state.settoken = settoken;
        },
        setuserrole(state, setuserrole){
            state.setuserrole = setuserrole;
        },
        setusertype(state, setusertype){
            state.setusertype = setusertype;
        },
        setIsAuth(state, setIsAuth){
            state.setIsAuth = setIsAuth;
        }
    }
});

export default store;


const app = createApp(App)

app.use(VueApexCharts);

app.use(Vuex)

app.use(store)

app.use(router)

app.use(Toast);

app.mount('#app')


