import '../index/index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import { DebounceInput } from 'react-debounce-input'
import { TabName, data, sortName } from './appConstants.js'
import TabsContainer from '../components/tabs/tabsContainer.js'
import CardsContainer from '../components/cards/cardsContainer.js'
import Popover from '../components/popover/popover.js'
import TotalsReport from '../components/totalsReport/totalsReport.js'

const App = () => {
    const tabs = [
        {
            name: TabName.World,
            isActive: true,
        },
        {
            name: TabName.India,
            isActive: false,
        },
    ]
    const [tabsData, setTabsData] = React.useState(tabs)
    const [sort, setSort] = React.useState({ name: data.cases, isDescending: true })
    const [search, setSearch] = React.useState('')
    const [totalsReport, setTotalsReport] = React.useState({})

    const handleCasesSort = () => {
        setSort({ name: data.cases, isDescending: sort.name === data.cases ? !sort.isDescending : true })
    }

    const handleDeathsSort = () => {
        setSort({ name: data.deaths, isDescending: sort.name === data.deaths ? !sort.isDescending : true })
    }

    const handleTabClick = (tabName) => {
        setTabsData(
            tabsData.map((tab) => {
                return tab.name === tabName ? { name: tab.name, isActive: true } : { name: tab.name, isActive: false }
            }),
        )
        setSort({ name: data.cases, isDescending: true })
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

        if (getActiveTab() === TabName.World) {
            return World && <TotalsReport cases={World.cases} deaths={World.deaths} recoveries={World.recoveries} />
        }
        return India && <TotalsReport cases={India.cases} deaths={India.deaths} recoveries={India.recoveries} />
    }

    // eslint-disable-next-line react/display-name
    const renderPopover = () => {
        return (
            <Popover>
                <button type="button" onClick={handleCasesSort}>
                    <span>{`${sortName.cases}  `}</span>
                    {sort.name === data.cases && (
                        <FontAwesomeIcon icon={sort.isDescending ? faAngleDoubleDown : faAngleDoubleUp} size="sm" />
                    )}
                </button>
                <button type="button" onClick={handleDeathsSort}>
                    <span>{`${sortName.deaths}  `}</span>
                    {sort.name === data.deaths && (
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
            <button type="button" className="update">
                Click to Update
            </button>
        </>
    )
}

App.displayName = 'App'
export default App
