/* eslint-disable react/no-this-in-sfc */
import './textLoader.scss'

const TextLoader = () => {
    const canvas = React.useRef()
    React.useEffect(() => {
        const ctx = canvas.current.getContext('2d')
        let mask

        const pointCount = 200
        const str = 'CORONA'
        const fontStr = 'bold 60pt Helvetica Neue, Helvetica, Arial, sans-serif'

        ctx.font = fontStr
        ctx.textAlign = 'center'
        canvas.current.width = ctx.measureText(str).width
        canvas.current.height = 60 // Set to font size

        const whitePixels = []
        const points = []

        const coordsToI = (x, y, w) => {
            return (w * y + x) * 4
        }

        const Point = function (x, y, vx, vy) {
            this.x = x
            this.y = y
            this.vx = vx || 1
            this.vy = vy || 1
        }

        Point.prototype.update = function () {
            ctx.beginPath()
            ctx.fillStyle = '#95a5a6'
            ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI)
            ctx.fill()
            ctx.closePath()

            // Change direction if running into black pixel
            if (
                this.x + this.vx >= canvas.current.width ||
                this.x + this.vx < 0 ||
                mask.data[coordsToI(this.x + this.vx, this.y, mask.width)] !== 255
            ) {
                this.vx *= -1
                this.x += this.vx * 2
            }
            if (
                this.y + this.vy >= canvas.current.height ||
                this.y + this.vy < 0 ||
                mask.data[coordsToI(this.x, this.y + this.vy, mask.width)] !== 255
            ) {
                this.vy *= -1
                this.y += this.vy * 2
            }

            for (let k = 0, m = points.length; k < m; k += 1) {
                if (points[k] !== this) {
                    const d = Math.sqrt((this.x - points[k].x) ** 2 + (this.y - points[k].y) ** 2)
                    if (d < 5) {
                        ctx.lineWidth = 0.2
                        ctx.beginPath()
                        ctx.moveTo(this.x, this.y)
                        ctx.lineTo(points[k].x, points[k].y)
                        ctx.stroke()
                    }
                    if (d < 20) {
                        ctx.lineWidth = 0.1
                        ctx.beginPath()
                        ctx.moveTo(this.x, this.y)
                        ctx.lineTo(points[k].x, points[k].y)
                        ctx.stroke()
                    }
                }
            }

            this.x += this.vx
            this.y += this.vy
        }

        const loop = () => {
            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
            for (let k = 0, m = points.length; k < m; k += 1) {
                points[k].update()
            }
        }

        const addPoint = () => {
            const spawn = whitePixels[Math.floor(Math.random() * whitePixels.length)]

            const p = new Point(
                spawn[0],
                spawn[1],
                Math.floor(Math.random() * 2 - 1),
                Math.floor(Math.random() * 2 - 1),
            )
            points.push(p)
        }

        const iToX = (i, w) => {
            return (i % (4 * w)) / 4
        }

        const iToY = (i, w) => {
            return Math.floor(i / (4 * w))
        }

        const init = () => {
            // Draw text
            ctx.beginPath()
            ctx.fillStyle = '#000'
            ctx.rect(0, 0, canvas.current.width, canvas.current.height)
            ctx.fill()
            ctx.font = fontStr
            ctx.textAlign = 'left'
            ctx.fillStyle = '#fff'
            ctx.fillText(str, 0, canvas.current.height / 2 + canvas.current.height / 2)
            ctx.closePath()

            // Save mask
            mask = ctx.getImageData(0, 0, canvas.current.width, canvas.current.height)

            // Draw background
            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)

            // Save all white pixels in an array
            for (let i = 0; i < mask.data.length; i += 4) {
                if (
                    mask.data[i] === 255 &&
                    mask.data[i + 1] === 255 &&
                    mask.data[i + 2] === 255 &&
                    mask.data[i + 3] === 255
                ) {
                    whitePixels.push([iToX(i, mask.width), iToY(i, mask.width)])
                }
            }

            for (let k = 0; k < pointCount; k += 1) {
                addPoint()
            }
        }

        const id = setInterval(loop, 50)
        init()

        return () => {
            clearInterval(id)
        }
    }, [])

    // eslint-disable-next-line react/self-closing-comp
    return <canvas ref={canvas} className="text-loader"></canvas>
}

TextLoader.displayName = 'TextLoader'

export default TextLoader
