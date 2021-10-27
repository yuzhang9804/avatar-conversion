import { useState } from 'react'

import type { FunctionComponent } from 'react'

const App: FunctionComponent = () => {
  const [data, setData] = useState<number>(0)

  return (
    <div>
      <div text-5xl className="bg-blue-300">
        {data}
      </div>
      <button onClick={() => setData((v) => v + 1)}>add</button>
    </div>
  )
}

export default App
