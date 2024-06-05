import { Colors } from "@/shared/const/Colors"
import { FontSize } from "@/shared/const/FontSize"
import { PrefectureState } from "@/shared/types/PrefectureState"
import { ChangeEventHandler, FC } from "react"
import styled from "styled-components"

type Props = {
  prefectureStateList: PrefectureState[]
  initPrefectureChangeHandler: (prefectureCode: number) => ChangeEventHandler
}

export const PrefectureCheckboxList: FC<Props> = (props) => {
  const { prefectureStateList, initPrefectureChangeHandler } = props

  return (
    <List>
      {prefectureStateList.map((prefectureState) => {
        const { prefectureName, prefectureCode, isChecked } = prefectureState
        return (
          <li key={prefectureCode}>
            <Label htmlFor={`${prefectureCode}`}>
              <Checkbox
                id={`${prefectureCode}`}
                checked={isChecked}
                onChange={initPrefectureChangeHandler(prefectureCode)}
              />
              {prefectureName}
            </Label>
          </li>
        )
      })}
    </List>
  )
}

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  row-gap: 15px;
  column-gap: 35px;
`

const Label = styled.label`
  font-size: ${FontSize.FONT_SIZE_15};
  position: relative;
  cursor: pointer;
  user-select: none;

  /* checkboxの箱 */
  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: -18px;
    transform: translateY(-50%);
    width: 15px;
    height: 15px;
    border: 1px solid ${Colors.COLOR_636363};
    border-radius: 3px;
  }

  /* checkboxのチェックマーク */
  &:has(input:checked) {
    &::after {
      content: "";
      position: absolute;
      top: 20%;
      left: -17px;
      transform: rotate(-45deg);
      width: 15px;
      height: 8px;
      border-left: 2px solid ${Colors.COLOR_075FB1};
      border-bottom: 2px solid ${Colors.COLOR_075FB1};
    }
  }
`

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
`
