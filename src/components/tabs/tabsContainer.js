import './tabs.scss'
import Tab from './tab.js'

const TabsContainer = ({ tabs }) => {
    if (tabs.length > 0) {
        return (
            <ul className="nav nav-app">
                {tabs.map(({ name, isActive, onTabClick, children }) => {
                    return (
                        <Tab key={name} name={name} isActive={isActive} onTabClick={onTabClick}>
                            {children}
                        </Tab>
                    )
                })}
            </ul>
        )
    }
    return null
}

TabsContainer.displayName = 'TabsContainer'
TabsContainer.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TabsContainer
