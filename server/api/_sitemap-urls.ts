// //server/api/_sitemap-urls.ts
// import {Sitemap} from "~/types/sitemap";
//
// export default cachedEventHandler(
//     async (e) => {
//         const runtimeConfig = useRuntimeConfig()
//         const {API_URL,SITE_URL} = runtimeConfig.public
//         const { data: bookSortList } = await $fetch('/api/query/sitemap/book',{
//             method:"GET",
//             baseURL:API_URL,
//         })as any as {data:Sitemap[]}
//         return bookSortList.map((book) => {
//             return {
//                 loc: `${SITE_URL}/book/${book.articleid}/`,
//                 lastmod:book.lastupdate,
//                 priority:"0.95",
//             };
//         });
//     },
//     {
//         name: 'sitemap-dynamic-url',
//         maxAge: 60 * 30, // cache URLs for 10 minutes
//     }
// );
