export interface BookInfo{
    articleid: number;
    articlename: string;
    author: string;
    sortid: number;
    intro: string;
    fullflag: number;
    cover: string;
    lastupdate: number;
    lastchapterid: number;
    lastchapter: string;
}

export interface ChapterLast{
    chapterid: number;
    chaptername: string;
}

export interface HotTuiJian{
    articleid: number;
    articlename: string;
}