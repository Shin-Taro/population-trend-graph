import { ChangeEventHandler, FC } from "react"

type PrefectureState = {
  prefectureName: string
  prefectureCode: number
  isChecked: boolean
}

type Props = {
  prefectureStateList: PrefectureState[]
  initPrefectureChangeHandler: (prefectureCode: number) => ChangeEventHandler
}

export const PrefectureCheckbox: FC<Props> = (props) => {
  const { prefectureStateList, initPrefectureChangeHandler } = props

  return (
    <div>
      {prefectureStateList.map((prefectureState) => {
        const { prefectureName, prefectureCode, isChecked } = prefectureState
        return (
          <label key={prefectureCode} htmlFor={`${prefectureCode}`}>
            <input
              type="checkbox"
              id={`${prefectureCode}`}
              checked={isChecked}
              onChange={initPrefectureChangeHandler(prefectureCode)}
            />
            {prefectureName}
          </label>
        )
      })}
    </div>
  )
}
