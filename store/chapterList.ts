import { defineStore } from 'pinia'
import {BookInfo, ChapterLast, HotTuiJian} from "~/types/book";
export const useInfoChaptersStore = defineStore('chapters', {
    state: () => ({
        chapterLists: {} as Record<number, ChapterLast[]>,
        chapterListsError:{} as Record<number, any>,
        xiangGuangLists: {} as Record<number, HotTuiJian[]>,
        infoDataLists: {} as Record<number, BookInfo>,
        hotTuiJianLists: [] as HotTuiJian[],
    }),
    actions: {
        async fetchChapterList(id: number) {
            if (this.chapterLists[id]) return; // 如果已存在，则直接返回

            const {data: chapterList,error:chapterListError} = await useAsyncData('chapterList', () => $fetch(`/api/book/chapter/listData`, {
                 method: 'POST',
                 body: {
                     id: id,
                }
            }),{
                default:() => [] as ChapterLast[],
            }) as any as {data:ChapterLast[],error:any}

            this.chapterLists[id] = chapterList as ChapterLast[];
        },
        async fetchXiangGuangLists(id: number) {
            if (this.xiangGuangLists[id]) return; // 如果已存在，则直接返回
            const { data: xiangGuangTuiJian } = await useAsyncData('xiangGuangTuiJian', () => $fetch(`/api/book/xiangguan/listData`,{
                method: 'POST',
                body: {
                    id: id,
                    limit: 10,
                }
            }),{
                default:() => [] as HotTuiJian[],
            }) as any as {data:HotTuiJian[]}

            this.xiangGuangLists[id] = xiangGuangTuiJian as HotTuiJian[];
        },
        async fetchInfoData(id: number) {
            if (this.infoDataLists[id]) return; // 如果已存在，则直接返回


           const {data: infoData}:any = await useAsyncData('infoData', () => $fetch(`/api/book/info/${id}/`),{
                default:() => ({} as BookInfo),
           }) as any as { data: BookInfo }

           this.infoDataLists[id] = infoData;
        },
        async fetchHotTuiJian() {
            if (this.hotTuiJianLists.length) return; // 如果已存在，则直接返回
            const { data: bookHotTuiJian } = await useAsyncData('bookHotTuiJian', () => $fetch(`/api/book/hot/listData`,{
                method: 'POST',
                body: {
                    order: 5,
                    page: 1,
                    size: 10,
                }
            }),{
                default:() => [] as HotTuiJian[],
            }) as any as {data:HotTuiJian[]}

            this.hotTuiJianLists = bookHotTuiJian as HotTuiJian[];
        },
        async fetchData(id: number) {
            const chapterListPromise = this.fetchChapterList(id);
            const xiangGuangListsPromise = this.fetchXiangGuangLists(id);
            const infoDataPromise = this.fetchInfoData(id);
            const hotTuiJianPromise = this.fetchHotTuiJian();

            await Promise.all([
                chapterListPromise,
                xiangGuangListsPromise,
                infoDataPromise,
                hotTuiJianPromise
            ]);
        }
    }
});