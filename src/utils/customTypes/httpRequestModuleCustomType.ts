export type RequestConfigType = {
    method: string,
    url: string,
    headers: object,
    data: string | object,
    timeout: number,
    withCredentials: boolean
}
