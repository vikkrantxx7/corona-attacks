import './tabs.scss'
import Tab from './tab.js'

const TabsContainer = ({ tabs, onTabClick }) => {
    if (tabs.length > 0) {
        return (
            <ul className="nav nav-app">
                {tabs.map(({ name, isActive }) => {
                    return <Tab key={name} name={name} isActive={isActive} onTabClick={onTabClick} />
                })}
            </ul>
        )
    }
    return null
}

TabsContainer.displayName = 'TabsContainer'
TabsContainer.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
    onTabClick: PropTypes.func.isRequired,
}

export default TabsContainer
