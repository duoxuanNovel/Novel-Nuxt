import { defineStore } from 'pinia'
import {UserInfo} from "~/types/user";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: {} as  UserInfo
        }
    },
    actions: {
        async setUser(user: any) {
            this.user =  user
        },
        async logout() {
            this.user = {} as UserInfo
        }
    },
    getters: {
        getIsLogin():boolean {
            return this.user.uid > 0;
        },
        getUid():number {
            return this.user.uid;
        },
        getUname():string {
            return this.user.uname;
        },

    },
    persist: {
        storage: persistedState.cookies,
    },
})