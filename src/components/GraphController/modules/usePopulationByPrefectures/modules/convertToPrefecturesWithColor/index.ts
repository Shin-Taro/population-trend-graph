import { PrefectureState } from "@/shared/types/PrefectureState"
import { PrefectureWithColor } from "@/shared/types/PrefectureWithColor"
import { convertPrefectureCodeToColor } from "../convertPrefectureCodeToColor"

export const convertToPrefecturesWithColor = (
  prefectureStateList: PrefectureState[],
): PrefectureWithColor[] =>
  prefectureStateList.flatMap((prefectureState) =>
    prefectureState.isChecked
      ? {
          prefectureCode: prefectureState.prefectureCode,
          prefectureName: prefectureState.prefectureName,
          colorCode: convertPrefectureCodeToColor(prefectureState.prefectureCode),
        }
      : [],
  )
