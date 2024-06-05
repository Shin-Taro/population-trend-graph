import { PrefectureState } from "@/shared/types/PrefectureState"
import { PrefecturesResponse } from "@/shared/types/PrefecturesResponse"

export const convertToPrefectureStateList = (prefectures: PrefecturesResponse): PrefectureState[] =>
  prefectures.result.map((prefecture) => ({
    prefectureName: prefecture.prefName,
    prefectureCode: prefecture.prefCode,
    isChecked: false,
  }))
