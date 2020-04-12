import '../index/index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import { DebounceInput } from 'react-debounce-input'
import TabsContainer from '../components/tabs/tabsContainer.js'
import CardsContainer from '../components/cards/cardsContainer.js'
import Popover from '../components/popover/popover.js'
import TotalsReport from '../components/totalsReport/totalsReport.js'

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
    const [search, setSearch] = React.useState('')
    const [totalsReport, setTotalsReport] = React.useState({})

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
        setSearch('')
    }

    const handleSearch = (event) => {
        const { value } = event.target
        setSearch(value)
    }

    const getActiveTab = () => {
        return tabsData.find((tab) => tab.isActive).name
    }

    // eslint-disable-next-line react/display-name
    const renderTotals = () => {
        const { India, World } = totalsReport

        if (getActiveTab() === 'World') {
            return World && <TotalsReport cases={World.cases} deaths={World.deaths} recoveries={World.recoveries} />
        }
        return India && <TotalsReport cases={India.cases} deaths={India.deaths} recoveries={India.recoveries} />
    }

    // eslint-disable-next-line react/display-name
    const renderPopover = () => {
        return (
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
                <DebounceInput onChange={handleSearch} placeholder="Search" debounceTimeout={400} value={search} />
            </Popover>
        )
    }

    return (
        <>
            <div className="header">
                <TabsContainer tabs={tabsData} onTabClick={handleTabClick} />
                {renderPopover()}
                {renderTotals()}
            </div>
            <CardsContainer activeTab={getActiveTab()} sort={sort} search={search} setTotals={setTotalsReport} />
        </>
    )
}

App.displayName = 'App'
export default App
