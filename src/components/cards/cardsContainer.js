import './cardsContainer.scss'
import { data, TabName } from '../../containers/appConstants.js'
import { RapidAPI } from './cardsConstants.js'
import countryFlagsData from '../../data/countrieFlags.json'
import Card from './card.js'
import CradleLoader from '../loaders/cradleLoader/cradleLoader.js'
import Utils from '../../utils/utils.js'

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
            return Axios.get(RapidAPI.India.url, {
                headers: {
                    'x-rapidapi-host': RapidAPI.India.host,
                    'x-rapidapi-key': RapidAPI.Key,
                },
            })
        }

        Promise.all([fetchWorldCoronaStats(), fetchIndiaCoronaStats()]).then(([{ data: stats }, { data: India }]) => {
            const worldStats = stats.response.sort((a, b) => b.cases.total - a.cases.total)
            const statesStats = new Map(Object.entries(India.state_wise))

            setTotals({
                World: {
                    cases: worldStats[0].cases.total,
                    deaths: worldStats[0].deaths.total,
                    recoveries: worldStats[0].cases.recovered,
                },
                India: {
                    cases: India.total_values.confirmed,
                    deaths: India.total_values.deaths,
                    recoveries: India.total_values.recovered,
                },
            })
            setWorldFixedStats(worldStats)
            setStatesFixedStats(statesStats)
            setWorldCoronaStats(worldStats)
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

        const statesData = [...statesFixedStats].filter((item) => item[0].toLowerCase().includes(search.toLowerCase()))

        if (sort.name === data.cases) {
            if (sort.isDescending) {
                statesData.sort((a, b) => b[1].confirmed - a[1].confirmed)
            } else {
                statesData.sort((a, b) => a[1].confirmed - b[1].confirmed)
            }
        } else if (sort.isDescending) {
            statesData.sort((a, b) => b[1].deaths - a[1].deaths)
        } else {
            statesData.sort((a, b) => a[1].deaths - b[1].deaths)
        }
        setStatesCoronaStats(new Map(statesData))
    }, [sort, search])

    const getClasses = () => {
        const classes = new Map([
            ['cards-container', true],
            ['cards-container_justify-loader', isLoading],
        ])

        return Utils.classNames(classes)
    }

    const handleScroll = () => {
        const progressBar = document.getElementsByClassName('cards-container__progress-bar')[0]
        const cardsContainer = document.getElementsByClassName('cards-container')[0]

        if (cardsContainer.offsetWidth < 480) {
            const totalWidth = cardsContainer.scrollWidth - window.innerWidth
            const progressWidth = (cardsContainer.scrollLeft / totalWidth) * 100
            progressBar.style.width = `${progressWidth}%`
            return
        }

        const totalHeight = cardsContainer.scrollHeight - window.innerHeight
        const progressHeight = (cardsContainer.scrollTop / totalHeight) * 100

        progressBar.style.height = `${progressHeight}%`
    }

    const renderWorldCards = () => {
        return worldCoronaStats.map(({ country, cases, deaths, tests }) => {
            const flag = countryFlagsData[country]

            return (
                !!flag && (
                    <Card
                        key={country}
                        name={country}
                        cases={cases.total}
                        deaths={deaths.total}
                        recoveries={cases.recovered}
                        tests={tests.total}
                        flag={flag}
                    />
                )
            )
        })
    }

    const renderIndiaCards = () => {
        return [...statesCoronaStats.keys()].map((state) => {
            const stateData = statesCoronaStats.get(state)
            return (
                <Card
                    key={stateData.state}
                    name={stateData.state}
                    cases={Number(stateData.confirmed)}
                    deaths={Number(stateData.deaths)}
                    recoveries={Number(stateData.recovered)}
                />
            )
        })
    }

    return (
        <div className={getClasses()} onScroll={handleScroll}>
            {isLoading && <CradleLoader />}
            {!isLoading && <div className="cards-container__progress-bar" />}
            {!isLoading && <div className="cards-container__scroll-path" />}
            {!isLoading && activeTab === TabName.World && renderWorldCards()}
            {!isLoading && activeTab === TabName.India && renderIndiaCards()}
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
