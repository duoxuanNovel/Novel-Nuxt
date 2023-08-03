export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const {API_URL} = runtimeConfig.public
    const id = event?.context?.params?.id
    return await $fetch('/api/book/info/' + id, {
        method: 'GET',
        baseURL: API_URL,
    }).then((res: any) => {
        return res.data
    }).catch((e) => {
        return e
    })
})
