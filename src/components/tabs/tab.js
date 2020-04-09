const Tab = ({ name, isActive, onTabClick }) => {
    return (
        <li className={`nav-item ${isActive ? 'active' : ''}`}>
            <button type="button" className="nav-link" onClick={() => onTabClick(name)}>
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
