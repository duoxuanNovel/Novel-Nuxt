export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    const {API_URL} = runtimeConfig.public
    const body = await readBody(event)
    return await $fetch('/api/delete/bookcase', {
        method: 'POST',
        baseURL: API_URL,
        body: body,
    }).then((res: any) => {
        return res
    }).catch((e) => {
        //返回报错信息
        return e
    })
})
