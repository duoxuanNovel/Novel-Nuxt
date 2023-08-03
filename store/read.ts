import { defineStore } from 'pinia'

type FontSize = 'small' | 'big' | 'middle'
type DarkMode = "no" | "yes" | "huyan"

export const useBgThemeStore = defineStore({
    id: 'bgTheme',
    state: (): { selectedFontSize: FontSize, darkMode: DarkMode } => ({
        selectedFontSize: 'small',
        darkMode: "no",
    }),
    getters: {},
    actions: {
        fontSizeMap(size: FontSize): string {
            const map = {
                'big': '26px',
                'middle': '22px',
                'small': '16px'
            };
            return map[size];
        },
        setSelectedFontSize(size: FontSize) {
            this.selectedFontSize = size;
            const element = document.getElementById('nr1')
            if (element) element.style.fontSize = this.fontSizeMap(size);
        },
        setDarkMode(mode: DarkMode) {
            this.darkMode = mode;
        },
        changeDarkMode() {
            const body = document.body
            const nr_title = document.getElementById('nr_title')
            const tophead = document.getElementById('tophead')
            const nr1 = document.getElementById('nr1')

            if (this.darkMode == "yes"){
                if (body) body.style.backgroundColor = "rgb(50, 55, 59)";
                if (nr_title) nr_title.style.color = "rgb(204, 204, 204)";
                if (nr1) nr1.style.color = "rgb(153, 153, 153)";
                if (tophead) tophead.style.backgroundColor = "rgb(50, 55, 59)";
                (document.querySelectorAll('.nr_page a') as NodeListOf<HTMLElement>).forEach((item) => {
                    item.style.color = "rgb(204, 204, 204)";
                    item.style.backgroundColor = "rgb(62, 66, 69)";
                    item.style.border = "1px solid rgb(49, 53, 56)";
                });
            }else if (this.darkMode == "huyan"){
                if (body) body.style.backgroundColor = "rgb(220, 236, 210)";
                if (nr_title) nr_title.style.color = "rgb(0, 0, 0)";
                if (tophead) tophead.style.backgroundColor = "rgb(0, 123, 177)";
                (document.querySelectorAll('.nr_page a') as NodeListOf<HTMLElement>).forEach((item) => {
                    item.style.backgroundColor = "rgb(204, 226, 191)";
                    item.style.color = "green";
                    item.style.border = "1px solid rgb(187, 214, 170)";
                });
            }else{
                if (body) body.style.backgroundColor = "rgb(251, 246, 236)";
                if (nr_title) nr_title.style.color = "rgb(0, 0, 0)";
                if (nr1) nr1.style.color = "rgb(0, 0, 0)";
                if (tophead) tophead.style.backgroundColor = "rgb(0, 123, 177)";
                (document.querySelectorAll('.nr_page a') as NodeListOf<HTMLElement>).forEach((item) => {
                    item.style.backgroundColor = "rgb(244, 240, 233)";
                    item.style.color = "rgb(0, 123, 177)";
                    item.style.border = "1px solid rgb(236, 230, 218)";
                });
            }
        },
        clearDocumentStyle() {
            const body = document.body
            const nr1 = document.getElementById('nr1')
            if (body) body.style.backgroundColor = "";
            if (nr1) nr1.style.fontSize = "";
        }
    },
    persist: {
        storage: persistedState.cookies,
    },
})
