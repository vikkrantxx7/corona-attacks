import '../index/index.scss'
import ShootingStars from '../components/shootingStars/shootingStars.js'
import TabsContainer from '../components/tabs/tabsContainer.js'
import CardsContainer from '../components/cards/cardsContainer.js'

const App = () => {
    const tabs = [
        {
            name: 'World',
            isActive: true,
        },
        {
            name: 'India',
            isActive: false,
        },
    ]
    const [tabsData, setTabsData] = React.useState(tabs)

    const handleTabClick = (tabName) => {
        setTabsData(
            tabsData.map((tab) => {
                return tab.name === tabName ? { name: tab.name, isActive: true } : { name: tab.name, isActive: false }
            }),
        )
    }

    const getActiveTab = () => {
        return tabsData.find((tab) => tab.isActive).name
    }

    return (
        <>
            <TabsContainer tabs={tabsData} onTabClick={handleTabClick} />
            {/*<ShootingStars />*/}
            <CardsContainer activeTab={getActiveTab()} />
        </>
    )
}

App.displayName = 'App'
export default App
