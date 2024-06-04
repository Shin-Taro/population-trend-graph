import axios from "axios"
import { PrefecturesResponse } from "../../types/PrefecturesResponse"
import { PopulationResponse } from "../../types/PopulationResponse"

const BaseUrl = "https://opendata.resas-portal.go.jp"
const X_API_KEY = process.env["NEXT_PUBLIC_RESAS_API_KEY"] ?? ""

const axiosInstance = axios.create({
  baseURL: BaseUrl,
  headers: {
    "X-API-KEY": X_API_KEY,
  },
})

const getPrefectures = async (): Promise<PrefecturesResponse> => {
  try {
    const { data } = await axiosInstance.get<PrefecturesResponse>(`${BaseUrl}/api/v1/prefectures`)
    return data
  } catch {
    return { message: "Failed to fetch prefectures", result: [] }
  }
}

const getPopulation = async (prefCode: number): Promise<PopulationResponse> => {
  try {
    const { data } = await axiosInstance.get<PopulationResponse>(
      `${BaseUrl}/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    )
    return data
  } catch {
    return { message: "Failed to fetch population", result: { boundaryYear: 0, data: [] } }
  }
}

export const resasApiClient = {
  getPrefectures,
  getPopulation,
}
