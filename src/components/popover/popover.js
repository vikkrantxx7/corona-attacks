import './popover.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareDown, faCaretSquareUp } from '@fortawesome/free-regular-svg-icons'
import PopoverPortal from './components/popoverPortal.js'
import Utils from '../../utils/utils.js'

const Popover = ({ children }) => {
    const [isVisible, setIsVisible] = React.useState(false)
    const [style, setStyle] = React.useState({})
    const popoverRef = React.useRef()
    const width = 150
    const space = 5

    const togglePopover = () => {
        if (!isVisible) {
            const styl = { width }
            const dimensions = popoverRef.current.getBoundingClientRect()
            // center align the tooltip by taking both the target and tooltip widths into account
            styl.left = dimensions.left + dimensions.width / 2 - width / 2
            styl.left = Math.max(space, styl.left) // make sure it doesn't poke off the left side of the page
            styl.left = Math.min(styl.left, document.body.clientWidth - width - space) // or off the right
            styl.top = dimensions.top + dimensions.height + space

            setStyle(styl)
        }

        setIsVisible(!isVisible)
    }

    const getButtonClasses = () => {
        const classes = new Map([
            ['popover__button', true],
            ['active', isVisible],
        ])

        return Utils.classNames(classes)
    }

    return (
        <div className="popover" ref={popoverRef}>
            <button className={getButtonClasses()} type="button" onClick={togglePopover}>
                <span>{isVisible ? 'Less' : 'More'}</span>
                <FontAwesomeIcon icon={isVisible ? faCaretSquareUp : faCaretSquareDown} size="2x" />
            </button>
            {isVisible && (
                <PopoverPortal>
                    <div className="popover__portal" style={style}>
                        {children}
                    </div>
                </PopoverPortal>
            )}
        </div>
    )
}

Popover.displayName = 'Popover'
Popover.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Popover
