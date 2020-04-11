import './cardsContainer.scss'
import countryFlagsData from '../../data/countrieFlags.json'
import Card from './card.js'
import CradleLoader from '../loaders/cradleLoader/cradleLoader.js'
import Utils from '../../utils/utils.js'

const CardsContainer = ({ activeTab, sort, search }) => {
    const [worldFixedStats, setWorldFixedStats] = React.useState([])
    const [statesFixedStats, setStatesFixedStats] = React.useState(new Map())
    const [worldCoronaStats, setWorldCoronaStats] = React.useState([])
    const [statesCoronaStats, setStatesCoronaStats] = React.useState(new Map())
    const [indiaCoronaStats, setIndiaCoronaStats] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(true)
    // const [countryFlags, setCountryFlags] = React.useState([])

    React.useEffect(() => {
        const fetchWorldCoronaStats = () => {
            return Axios.get('https://covid-193.p.rapidapi.com/statistics', {
                headers: {
                    'x-rapidapi-host': 'covid-193.p.rapidapi.com',
                    'x-rapidapi-key': '0dc4dc7910msh2f47a2af13bd0c8p1b95a5jsn3acdf8a3b471',
                },
            })
        }

        const fetchIndiaCoronaStats = () => {
            return Axios.get('https://corona-virus-world-and-india-data.p.rapidapi.com/api_india', {
                headers: {
                    'x-rapidapi-host': 'corona-virus-world-and-india-data.p.rapidapi.com',
                    'x-rapidapi-key': '0dc4dc7910msh2f47a2af13bd0c8p1b95a5jsn3acdf8a3b471',
                },
            })
        }
        // const fetchCountryFlags = () => {
        //     return Axios.get('https://restcountries.eu/rest/v2/all', {
        //         params: {
        //             fields: 'name;flag',
        //         },
        //     })
        // }

        Promise.all([fetchWorldCoronaStats(), fetchIndiaCoronaStats()]).then(([{ data: stats }, { data: India }]) => {
            // fetchWorldCoronaStats().then(({ data: stats }) => {
            const worldStats = stats.response.sort((a, b) => b.cases.total - a.cases.total)
            const statesStats = new Map(Object.entries(India.state_wise))

            setWorldFixedStats(worldStats)
            setStatesFixedStats(statesStats)
            setWorldCoronaStats(worldStats)
            setStatesCoronaStats(statesStats)
            setIndiaCoronaStats(India.total_values)
            setIsLoading(false)
            // setCountryFlags(flags)
        })
    }, [])

    React.useEffect(() => {
        if (activeTab === 'World') {
            let worldStats = [...worldCoronaStats].filter((item) =>
                item.country.toLowerCase().includes(search.toLowerCase()),
            )

            if (!search) {
                worldStats = [...worldFixedStats]
            }
            if (sort.name === 'cases') {
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

        let statesData = [...statesCoronaStats.entries()].filter((item) =>
            item[0].toLowerCase().includes(search.toLowerCase()),
        )

        if (!search) {
            statesData = [...statesFixedStats]
        }
        if (sort.name === 'cases') {
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
        // const flagsData = new Map(
        //     countryFlags.map(({ name, flag }) => [
        //         name
        //             .replace(/[". -]/g, '')
        //             .toLowerCase()
        //             .split('(')[0],
        //         flag,
        //     ]),
        // )
        // let flagsFound = {}
        // console.log(flagsData)
        // const stats = [...worldCoronaStats]
        // const index = stats.findIndex((item) => item.country.toUpperCase() === 'INDIA')
        // const India = stats[index]
        //
        // stats.splice(index, 1)
        // stats.unshift(India)
        return worldCoronaStats.map(({ country, cases, deaths, tests }) => {
            const flag = countryFlagsData[country]

            return (
                !!flag && (
                    <Card
                        key={country}
                        name={country}
                        cases={cases.total}
                        deaths={deaths.total}
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
                    cases={stateData.confirmed}
                    deaths={stateData.deaths}
                    recoveries={stateData.recovered}
                />
            )
        })
    }

    return (
        <div className={getClasses()} onScroll={handleScroll}>
            {isLoading && <CradleLoader />}
            {!isLoading && <div className="cards-container__progress-bar" />}
            {!isLoading && <div className="cards-container__scroll-path" />}
            {!isLoading && activeTab === 'World' && renderWorldCards()}
            {!isLoading && activeTab === 'India' && renderIndiaCards()}
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
}

export default CardsContainer
