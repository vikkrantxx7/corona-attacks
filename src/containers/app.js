import '../index/index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
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
    const [sort, setSort] = React.useState({ name: 'cases', isDescending: true })

    const handleCasesSort = () => {
        setSort({ name: 'cases', isDescending: sort.name === 'cases' ? !sort.isDescending : true })
    }

    const handleDeathsSort = () => {
        setSort({ name: 'deaths', isDescending: sort.name === 'deaths' ? !sort.isDescending : true })
    }

    const handleTabClick = (tabName) => {
        setTabsData(
            tabsData.map((tab) => {
                return tab.name === tabName ? { name: tab.name, isActive: true } : { name: tab.name, isActive: false }
            }),
        )
        setSort({ name: 'cases', isDescending: true })
    }

    const getActiveTab = () => {
        return tabsData.find((tab) => tab.isActive).name
    }

    return (
        <>
            <div className="header">
                <TabsContainer tabs={tabsData} onTabClick={handleTabClick} />
                <Popover>
                    <button type="button" onClick={handleCasesSort}>
                        <span>{'Sort Cases  '}</span>
                        {sort.name === 'cases' && (
                            <FontAwesomeIcon icon={sort.isDescending ? faAngleDoubleDown : faAngleDoubleUp} size="sm" />
                        )}
                    </button>
                    <button type="button" onClick={handleDeathsSort}>
                        <span>{'Sort Deaths  '}</span>
                        {sort.name === 'deaths' && (
                            <FontAwesomeIcon icon={sort.isDescending ? faAngleDoubleDown : faAngleDoubleUp} size="sm" />
                        )}
                    </button>
                    <input type="text" pattern="" placeholder="Search" />
                </Popover>
            </div>
            <CardsContainer activeTab={getActiveTab()} sort={sort} />
        </>
    )
}

App.displayName = 'App'
export default App
