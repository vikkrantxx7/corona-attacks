import '../index/index.scss'
import ShootingStars from '../components/shootingStars/shootingStars.js'
import TabsContainer from '../components/tabs/tabsContainer.js'
import CardsContainer from '../components/cards/cardsContainer.js'
import Popover from '../components/popover/popover.js'

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
    const [sort, setSort] = React.useState('')

    const handleTop = () => {
        setSort('top')
    }

    const handleBottom = () => {
        setSort('bottom')
    }

    const handleTabClick = (tabName) => {
        setTabsData(
            tabsData.map((tab) => {
                return tab.name === tabName ? { name: tab.name, isActive: true } : { name: tab.name, isActive: false }
            }),
        )
        setSort('')
    }

    const getActiveTab = () => {
        return tabsData.find((tab) => tab.isActive).name
    }

    return (
        <>
            <div className="header">
                <TabsContainer tabs={tabsData} onTabClick={handleTabClick} />
                <Popover>
                    <button type="button" onClick={handleTop}>
                        Top Cases
                    </button>
                    <button type="button" onClick={handleBottom}>
                        Bottom Cases
                    </button>
                    <input type="text" pattern="" placeholder="Search" />
                </Popover>
            </div>
            {/*<ShootingStars />*/}
            <CardsContainer activeTab={getActiveTab()} sort={sort} />
        </>
    )
}

App.displayName = 'App'
export default App
