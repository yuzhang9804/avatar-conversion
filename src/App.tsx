import { useEffect, useRef, useState, useMemo } from 'react'
import { fabric } from 'fabric'
import { Slider, Dialog } from 'antd-mobile'

import type { FunctionComponent } from 'react'

type Position = Partial<Record<'left' | 'top', number>>

const getFile = (input: HTMLInputElement | null): Promise<string> =>
  new Promise((resolve, reject) => {
    if (input?.files) {
      const file = input.files[0]
      const fileReader = new FileReader()

      fileReader.addEventListener('load', function () {
        fileReader.result && resolve(fileReader.result as string)
      })

      fileReader.readAsDataURL(file)
    } else reject(Error())
  })

const CANVAS_SIZE = {
  width: 200,
  height: 200,
}

const App: FunctionComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [imgSrc, setImgSrc] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvas = useRef<fabric.Canvas | null>(null)

  const [targetImg, setTargetImg] = useState<fabric.Image | null>(null)

  const [scale, setScale] = useState<number>(1)
  const [opacity, setOpacity] = useState<number>(1)

  useEffect(() => {
    if (!canvasRef.current) return
    /** fabric 注册 */
    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      ...CANVAS_SIZE,
    })
  }, [canvasRef])

  useEffect(() => {
    if (!imgSrc) return

    /** 添加图片至 Canvas */
    const img = document.createElement('img')
    img.src = imgSrc

    img.addEventListener('load', () => {
      const imgInstance = new fabric.Image(img)
      ;(fabricCanvas.current as fabric.Canvas)?.add(imgInstance)
      setTargetImg(imgInstance as fabric.Image)

      imgInstance.on('selected', ({ target }) => {
        setTargetImg(target as fabric.Image)
        setScale(target?.scaleX || 1)
      })
    })
  }, [imgSrc])

  useEffect(() => {
    /** 重置 Slider */
    setScale(1)
    setOpacity(1)
  }, [targetImg])

  /** 当前图片中心坐标 */
  const centerCoordinate = useMemo<
    Record<'x' | 'y' | 'right' | 'bottom', number>
  >(() => {
    const { width = 0, height = 0 } = { ...targetImg }

    return {
      x: -((width * scale - CANVAS_SIZE.width) / 2),
      y: -((height * scale - CANVAS_SIZE.height) / 2),
      right: width * scale - CANVAS_SIZE.width,
      bottom: height * scale - CANVAS_SIZE.height,
    }
  }, [targetImg, scale])

  /** 切换图片位置 */
  const switchPosition = (position: Position) => {
    targetImg?.set(position)
    fabricCanvas.current?.requestRenderAll()
  }

  const handleScaleChange = (scale: number) => {
    targetImg?.scale(scale as number)
    setScale(scale)
    fabricCanvas.current?.requestRenderAll()
  }

  const handleOpacityChange = (opacity: number) => {
    targetImg?.set({
      opacity,
    })
    setOpacity(opacity)
    fabricCanvas.current?.requestRenderAll()
  }

  /** 转换图片 */
  const handleDownload = () => {
    const ratio = window.devicePixelRatio || 1
    const canvas = fabricCanvas.current?.getElement()
    const context = canvas?.getContext('2d')
    context?.scale(ratio, ratio)
    const src = canvas?.toDataURL('image/jpeg', 1)

    Dialog.alert({
      image: src,
      title: '长按下载图片',
    })
  }

  const handleRest = () => {
    fabricCanvas.current?.remove(...fabricCanvas.current?.getObjects())
    setOpacity(1)
    setScale(1)
    fabricCanvas.current?.requestRenderAll()
  }

  return (
    <div className="w-screen h-screen py-30 flex flex-col justify-around">
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/png, image/jpeg"
        onChange={async () => {
          setImgSrc(await getFile(inputRef.current))
        }}
      />

      <div className="upload-preview">
        <canvas ref={canvasRef} />
        <div
          className="btn absolute -left-20 -top-20"
          onClick={() => {
            switchPosition({ left: 0, top: 0 })
          }}
        >
          L-T
        </div>
        <div
          className="btn absolute x-center -top-20"
          onClick={() => {
            switchPosition({ left: centerCoordinate.x, top: 0 })
          }}
        >
          M-T
        </div>
        <div
          className="btn absolute -right-20 -top-20"
          onClick={() => {
            switchPosition({ left: -centerCoordinate.right, top: 0 })
          }}
        >
          R-T
        </div>
        <div
          className="btn absolute -right-20 y-center"
          onClick={() => {
            switchPosition({
              left: -centerCoordinate.right,
              top: centerCoordinate.y,
            })
          }}
        >
          R-M
        </div>
        <div
          className="btn absolute -right-20 -bottom-20"
          onClick={() => {
            switchPosition({
              left: -centerCoordinate.right,
              top: -centerCoordinate.bottom,
            })
          }}
        >
          R-B
        </div>
        <div
          className="btn absolute x-center -bottom-20"
          onClick={() => {
            switchPosition({
              left: centerCoordinate.x,
              top: -centerCoordinate.bottom,
            })
          }}
        >
          M-B
        </div>
        <div
          className="btn absolute -left-20 -bottom-20"
          onClick={() => {
            switchPosition({ left: 0, top: -centerCoordinate.bottom })
          }}
        >
          L-B
        </div>
        <div
          className="btn absolute -left-20 y-center"
          onClick={() => {
            switchPosition({ left: 0, top: centerCoordinate.y })
          }}
        >
          L-M
        </div>
      </div>

      <div className="mt-20">
        <span className="ml-12px">尺寸：</span>
        <Slider
          min={0.01}
          max={2}
          defaultValue={1}
          value={scale}
          step={0.01}
          onChange={(v) => {
            handleScaleChange(v as number)
          }}
        />

        <span className="ml-12px">透明度：</span>
        <Slider
          min={0}
          max={1}
          defaultValue={1}
          step={0.1}
          value={opacity}
          onChange={(v) => {
            handleOpacityChange(v as number)
          }}
        />
      </div>

      <div className="flex justify-around items-center">
        <div
          className="btn"
          onClick={() => {
            inputRef.current?.click()
          }}
        >
          上传图片
        </div>
        <div className="btn" onClick={handleDownload}>
          生成
        </div>
        <div className="btn" onClick={handleRest}>
          重置
        </div>
      </div>
    </div>
  )
}

export default App
