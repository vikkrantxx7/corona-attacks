import './cardsContainer.scss'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { data, TabName } from '../../containers/appConstants.js'
import { RapidAPI, IndiaAPI } from './cardsConstants.js'
import countryFlagsData from '../../data/countrieFlags.json'
import Card from './card.js'
import CradleLoader from '../loaders/cradleLoader/cradleLoader.js'

const CardsContainer = ({ activeTab, sort, search, setTotals }) => {
    const [worldFixedStats, setWorldFixedStats] = React.useState([])
    const [statesFixedStats, setStatesFixedStats] = React.useState(new Map())
    const [worldCoronaStats, setWorldCoronaStats] = React.useState([])
    const [statesCoronaStats, setStatesCoronaStats] = React.useState(new Map())
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
                },
                India: {
                    cases: IndiaStats.confirmed,
                    deaths: IndiaStats.deaths,
                    recoveries: IndiaStats.recovered,
                },
            })
            setWorldFixedStats(countriesWithFlags)
            setStatesFixedStats(statesStats)
            setWorldCoronaStats(countriesWithFlags)
            setStatesCoronaStats(statesStats)
            setIsLoading(false)
        })
    }, [])

    React.useEffect(() => {
        if (activeTab === TabName.World) {
            const worldStats = [...worldFixedStats].filter((item) =>
                item.country.toLowerCase().includes(search.toLowerCase()),
            )

            if (sort.name === data.cases) {
                if (sort.isDescending) {
                    worldStats.sort((a, b) => b.cases.total - a.cases.total)
                } else {
                    worldStats.sort((a, b) => a.cases.total - b.cases.total)
                }
            } else if (sort.isDescending) {
                worldStats.sort((a, b) => b.deaths.total - a.deaths.total)
            } else {
                worldStats.sort((a, b) => a.deaths.total - b.deaths.total)
            }
            setWorldCoronaStats(worldStats)
            return
        }

        const statesData = statesFixedStats.filter((item) => item.state.toLowerCase().includes(search.toLowerCase()))

        if (sort.name === data.cases) {
            if (sort.isDescending) {
                statesData.sort((a, b) => b.confirmed - a.confirmed)
            } else {
                statesData.sort((a, b) => a.confirmed - b.confirmed)
            }
        } else if (sort.isDescending) {
            statesData.sort((a, b) => b.deaths - a.deaths)
        } else {
            statesData.sort((a, b) => a.deaths - b.deaths)
        }
        setStatesCoronaStats(statesData)
    }, [sort, search])

    const handleScroll = () => {
        const progressBar = document.getElementsByClassName('cards-container__progress-bar')[0]
        const listContainer = document.getElementsByClassName('cards-container__list')[0]
        const totalHeight = listContainer.scrollHeight - window.innerHeight
        const progressHeight = (listContainer.scrollTop / totalHeight) * 100

        progressBar.style.height = `${progressHeight}%`
    }

    const renderRows = (itemsPerRow, stats) => ({ index, style }) => {
        const items = stats.slice(index * itemsPerRow, index * itemsPerRow + itemsPerRow)
        return (
            <div key={index} style={style} className="cards-container__list_row">
                {items.map((item) => {
                    return activeTab === TabName.World ? (
                        <Card
                            key={item.country}
                            name={item.country}
                            cases={item.cases.total}
                            deaths={item.deaths.total}
                            recoveries={item.cases.recovered}
                            tests={item.tests.total}
                            flag={countryFlagsData[item.country]}
                        />
                    ) : (
                        <Card
                            key={item.state}
                            name={item.state}
                            cases={Number(item.confirmed)}
                            deaths={Number(item.deaths)}
                            recoveries={Number(item.recovered)}
                        />
                    )
                })}
            </div>
        )
    }

    const getItemsCountPerRow = (width, itemWidth) => {
        return Math.max(Math.floor(width / itemWidth), 1)
    }

    const getRowsCount = (itemsPerRow, itemsCount) => {
        return Math.ceil(itemsCount / itemsPerRow)
    }

    const renderCards = (stats) => {
        return (
            <AutoSizer>
                {({ height, width }) => {
                    const itemsPerRow = getItemsCountPerRow(width, width < 768 ? 188 : 238)
                    const rowsCount = getRowsCount(itemsPerRow, stats.length)

                    return (
                        <FixedSizeList
                            className="cards-container__list"
                            height={height}
                            width={width}
                            itemCount={rowsCount}
                            itemSize={width < 768 ? 135 : 205}
                            onScroll={handleScroll}
                        >
                            {renderRows(itemsPerRow, stats)}
                        </FixedSizeList>
                    )
                }}
            </AutoSizer>
        )
    }

    return (
        <div className="cards-container" onScroll={handleScroll}>
            {isLoading && <CradleLoader />}
            {!isLoading && <div className="cards-container__progress-bar" />}
            {!isLoading && <div className="cards-container__scroll-path" />}
            {!isLoading && renderCards(activeTab === TabName.World ? worldCoronaStats : statesCoronaStats)}
        </div>
    )
}

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
