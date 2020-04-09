import './cardsContainer.scss'
import countryFlagsData from '../../data/countrieFlags.json'
import Card from './card.js'
import CradleLoader from '../loaders/cradleLoader/cradleLoader.js'
import Utils from '../../utils/utils.js'

const CardsContainer = ({ activeTab }) => {
    const [worldCoronaStats, setWorldCoronaStats] = React.useState([])
    const [indiaCoronaStats, setIndiaCoronaStats] = React.useState({})
    // const [countryFlags, setCountryFlags] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

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
            setWorldCoronaStats(stats.response)
            setIndiaCoronaStats(India)
            // setCountryFlags(flags)
            setIsLoading(false)
        })
    }, [])

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
        const stats = [...worldCoronaStats]
        const index = stats.findIndex((item) => item.country.toUpperCase() === 'INDIA')
        const India = stats[index]

        stats.splice(index, 1)
        stats.unshift(India)
        return stats.map(({ country, cases, deaths, tests }) => {
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
        const states = indiaCoronaStats.state_wise
        return Object.keys(states).map((state) => (
            <Card
                key={states[state].state}
                name={states[state].state}
                cases={states[state].confirmed}
                deaths={states[state].deaths}
                recoveries={states[state].recovered}
            />
        ))
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
}

export default CardsContainer
