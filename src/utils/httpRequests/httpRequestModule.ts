import axios, { AxiosError, AxiosResponse } from 'axios'
import { RequestConfigType } from '@utils/customTypes/httpRequestModuleCustomType'
import { HttpError } from '@utils/httpRequests/httpError'

// function handleAxiosError(error: AxiosError) {

// }

async function request(requestConfig: RequestConfigType): Promise<object> {
  let response: AxiosResponse
  let jsonResponse: object = {}

  try {
    response = await axios.request(requestConfig)
    jsonResponse = response?.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new HttpError('Axios error occured')
    } else {
      throw new HttpError('Error occured')
    }
  }
  return jsonResponse
}

function createRequestConfig(
  method: string,
  url: string,
  headers?: object,
  body?: string | object
): RequestConfigType {
  return {
    method: method,
    url: url,
    headers: { ...headers },
    data: body ?? '',
    timeout: 2000,
    withCredentials: true,
  }
}

export async function getRequest(url: string): Promise<any> {
  const requestConfig: RequestConfigType = createRequestConfig('get', url)
  return request(requestConfig)
}
