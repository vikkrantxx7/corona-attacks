import './cardsContainer.scss'
import { DATA, TAB_NAME } from '../../containers/appConstants.js'
import { IndiaAPI, RapidAPI } from './cardsConstants.js'
import CardsWindow from './cardsWindow.js'
import CradleLoader from '../loaders/cradleLoader/cradleLoader.js'
import Utils from '../../utils/utils.js'
import countryFlagsData from '../../data/countrieFlags.json'

const CardsContainer = React.forwardRef(({ activeTab, sort, search, setTotals }, ref) => {
    const [worldFixedStats, setWorldFixedStats] = React.useState([])
    const [statesFixedStats, setStatesFixedStats] = React.useState([])
    const [worldCoronaStats, setWorldCoronaStats] = React.useState([])
    const [statesCoronaStats, setStatesCoronaStats] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchWorldCoronaStats = () => {
            return Axios.get(RapidAPI.World.url, {
                headers: {
                    'x-rapidapi-host': RapidAPI.World.host,
                    'x-rapidapi-key': RapidAPI.Key,
                },
            })
        }

        const fetchIndiaCoronaStats = () => {
            return Axios.get(IndiaAPI.url)
        }

        Promise.all([fetchWorldCoronaStats(), fetchIndiaCoronaStats()]).then(([{ data: stats }, { data: India }]) => {
            const worldStats = stats.response.sort((a, b) => b.cases.total - a.cases.total)
            const IndiaStats = India.statewise.shift()
            const statesStats = India.statewise
            const countriesWithFlags = worldStats.filter((item) => countryFlagsData[item.country])

            setTotals({
                World: {
                    cases: worldStats[0].cases.total,
                    deaths: worldStats[0].deaths.total,
                    recoveries: worldStats[0].cases.recovered,
                    newCases: worldStats[0].cases.new,
                    newDeaths: worldStats[0].deaths.new,
                },
                India: {
                    cases: IndiaStats.confirmed,
                    deaths: IndiaStats.deaths,
                    recoveries: IndiaStats.recovered,
                    newCases: IndiaStats.deltaconfirmed,
                    newDeaths: IndiaStats.deltadeaths,
                },
            })
            setWorldFixedStats(countriesWithFlags)
            setStatesFixedStats(statesStats)
            setWorldCoronaStats(countriesWithFlags)
            setStatesCoronaStats(statesStats)
            setIsLoading(false)
        })
    }, [setTotals])

    const handleSort = React.useCallback(
        Utils.memoizeSort((data, type, sortName, isDescending) => {
            if (sortName === DATA.cases && isDescending) {
                data.sort((a, b) => {
                    if (type === TAB_NAME.World) {
                        return b.cases.total - a.cases.total
                    }
                    return b.confirmed - a.confirmed
                })
            } else if (sortName === DATA.cases) {
                data.sort((a, b) => {
                    if (type === TAB_NAME.World) {
                        return a.cases.total - b.cases.total
                    }
                    return a.confirmed - b.confirmed
                })
            } else if (isDescending) {
                data.sort((a, b) => {
                    if (type === TAB_NAME.World) {
                        return b.deaths.total - a.deaths.total
                    }
                    return b.deaths - a.deaths
                })
            } else {
                data.sort((a, b) => {
                    if (type === TAB_NAME.World) {
                        return a.deaths.total - b.deaths.total
                    }
                    return a.deaths - b.deaths
                })
            }

            return data
        }),
        [],
    )

    React.useEffect(() => {
        if (!statesFixedStats.length || !worldFixedStats.length) {
            return
        }
        if (activeTab === TAB_NAME.World) {
            const worldStats = worldFixedStats.filter((item) =>
                item.country.toLowerCase().includes(search.toLowerCase()),
            )

            setWorldCoronaStats(
                handleSort(worldStats, TAB_NAME.World, sort.name, sort.isDescending, search.toLowerCase()),
            )
            return
        }

        const statesData = statesFixedStats.filter((item) => item.state.toLowerCase().includes(search.toLowerCase()))

        setStatesCoronaStats(handleSort(statesData, TAB_NAME.India, sort.name, sort.isDescending, search.toLowerCase()))
    }, [activeTab, statesFixedStats, worldFixedStats, sort, search, handleSort])

    const handleScroll = () => {
        const progressBar = document.getElementsByClassName('cards-container__progress-bar')[0]
        const listContainer = document.getElementsByClassName('fixed-list')[0]
        const totalHeight = listContainer.scrollHeight - window.innerHeight
        const progressHeight = (listContainer.scrollTop / totalHeight) * 100

        progressBar.style.height = `${progressHeight}%`
    }

    return (
        <div ref={ref} className="cards-container">
            {isLoading && <CradleLoader />}
            {!isLoading && <div className="cards-container__progress-bar" />}
            {!isLoading && <div className="cards-container__scroll-path" />}
            {!isLoading && (
                <CardsWindow
                    stats={activeTab === TAB_NAME.World ? worldCoronaStats : statesCoronaStats}
                    activeTab={activeTab}
                    onScroll={handleScroll}
                />
            )}
        </div>
    )
})

CardsContainer.displayName = 'CardsContainer'
CardsContainer.propTypes = {
    activeTab: PropTypes.string.isRequired,
    sort: PropTypes.shape({
        name: PropTypes.string,
        isDescending: PropTypes.bool,
    }).isRequired,
    search: PropTypes.string.isRequired,
    setTotals: PropTypes.func.isRequired,
}

export default CardsContainer
