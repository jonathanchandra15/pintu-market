import { getRequest } from "@utils/httpRequests/httpRequestModule";

const baseUrl: string = `${process.env.REACT_APP_API_URL}/trade`;

export const tradeAPI: any = {
    getPriceChanges: () => {
        return getRequest(`${baseUrl}/price-changes`);
    }
}