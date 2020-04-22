import Utils from '../../utils/utils.js'

const Tab = ({ name, isActive, onTabClick }) => {
    const getClasses = () => {
        const classes = new Map([
            ['nav-item', true],
            ['active', isActive],
        ])

        return Utils.classNames(classes)
    }

    return (
        <li className={getClasses()}>
            <button type="button" className="nav-link" onClick={() => !isActive && onTabClick(name)}>
                {name}
            </button>
        </li>
    )
}

Tab.displayName = 'Tab'
Tab.propTypes = {
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onTabClick: PropTypes.func.isRequired,
}

export default Tab
