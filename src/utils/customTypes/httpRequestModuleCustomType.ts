export type requestConfigType = {
    method: string,
    url: string,
    headers: object,
    data: string | object,
    timeout: number,
    withCredentials: boolean
}
