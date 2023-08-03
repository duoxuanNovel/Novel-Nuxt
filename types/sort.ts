export interface SortData{
    id: number;
    name: string;
}

export interface SortList{
    articleid: number;
    articlename: string;
    intro: string;
    author: string;
    cover: string;
}


export interface SortListData{
    count: number;
    list: SortList[];
}