import '../index/index.scss'
import { DEBOUNCE_DELAY, TabName, data, sortName } from './appConstants.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import CardsContainer from '../components/cards/cardsContainer.js'
import Popover from '../components/popover/popover.js'
import TabsContainer from '../components/tabs/tabsContainer.js'
import TotalsReport from '../components/totalsReport/totalsReport.js'
import Utils from '../utils/utils.js'

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
    const [inputVal, setInputVal] = React.useState('')
    const [totalsReport, setTotalsReport] = React.useState({})
    const debouncedSearch = React.useRef(Utils.debounce(setSearch, DEBOUNCE_DELAY))
    const cardsContainer = React.useRef(null)

    const getActiveTab = () => tabsData.find((tab) => tab.isActive).name

    React.useEffect(() => {
        const elem = cardsContainer.current
        let startPosX = 0
        let startPosY = 0
        const start = (event) => {
            startPosX = event.changedTouches.item(0).clientX
            startPosY = event.changedTouches.item(0).clientY
        }
        const end = (event) => {
            const endPosX = event.changedTouches.item(0).clientX
            const endPosY = event.changedTouches.item(0).clientY

            if (
                endPosX < startPosX &&
                Math.abs(endPosX - startPosX) > 50 &&
                Math.abs(endPosY - startPosY) < 50 &&
                getActiveTab() === TabName.World
            ) {
                setTabsData(
                    tabsData.map(({ name }) =>
                        name === TabName.World ? { name, isActive: false } : { name, isActive: true },
                    ),
                )
            } else if (
                endPosX > startPosX &&
                Math.abs(endPosX - startPosX) > 50 &&
                Math.abs(endPosY - startPosY) < 50 &&
                getActiveTab() === TabName.India
            ) {
                setTabsData(
                    tabsData.map(({ name }) =>
                        name === TabName.India ? { name, isActive: false } : { name, isActive: true },
                    ),
                )
            }
        }
        // eslint-disable-next-line no-unused-expressions
        elem?.addEventListener('touchstart', start)
        // eslint-disable-next-line no-unused-expressions
        elem?.addEventListener('touchend', end)

        return () => {
            // eslint-disable-next-line no-unused-expressions
            elem?.removeEventListener('touchstart', start)
            // eslint-disable-next-line no-unused-expressions
            elem?.removeEventListener('touchend', end)
        }
    })

    const handleCasesSort = () => {
        setSort({ name: data.cases, isDescending: sort.name === data.cases ? !sort.isDescending : true })
    }

    const handleDeathsSort = () => {
        setSort({ name: data.deaths, isDescending: sort.name === data.deaths ? !sort.isDescending : true })
    }

    const handleTabClick = (tabName) => {
        setTabsData(
            tabsData.map(({ name }) => (name === tabName ? { name, isActive: true } : { name, isActive: false })),
        )
        setSort({ name: data.cases, isDescending: true })
        setSearch('')
    }

    const handleOnChange = ({ target: { value } }) => {
        setInputVal(value)
        debouncedSearch.current(value)
    }

    // eslint-disable-next-line react/display-name
    const renderTotals = () => {
        const { India, World } = totalsReport

        if (getActiveTab() === TabName.World) {
            return (
                World && (
                    <TotalsReport
                        cases={World.cases}
                        deaths={World.deaths}
                        recoveries={World.recoveries}
                        newCases={World.newCases}
                        newDeaths={World.newDeaths}
                    />
                )
            )
        }
        return (
            India && (
                <TotalsReport
                    cases={India.cases}
                    deaths={India.deaths}
                    recoveries={India.recoveries}
                    newCases={India.newCases}
                    newDeaths={India.newDeaths}
                />
            )
        )
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
                <input onChange={handleOnChange} placeholder="Search" value={inputVal} />
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
            <CardsContainer
                ref={cardsContainer}
                activeTab={getActiveTab()}
                sort={sort}
                search={search}
                setTotals={setTotalsReport}
            />
            <button type="button" className="update">
                Click to Update
            </button>
        </>
    )
}

App.displayName = 'App'

export default App
