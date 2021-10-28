import { fabric } from 'fabric'

import type { FunctionComponent } from 'react'

interface Props {
  file: File
}

const Item: FunctionComponent<Props> = ({ file }) => {
  return (
    <div>
      <div>test</div>
    </div>
  )
}

export default Item
