const Tab = ({ name, isActive, onTabClick, children }) => {
    return (
        <li className={`nav-item ${isActive ? 'active' : ''}`}>
            <button type="button" className={`nav-link ${children ? 'nav-tab-shim' : ''}`} onClick={() => onTabClick()}>
                {name}
            </button>
            {children}
        </li>
    )
}

Tab.displayName = 'Tab'
Tab.propTypes = {
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onTabClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default Tab
