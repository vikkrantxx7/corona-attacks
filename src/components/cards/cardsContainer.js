import './cardsContainer.scss'
import countryFlagsData from '../../data/countrieFlags.json'
import Card from './card.js'
import CradleLoader from '../loaders/cradleLoader/cradleLoader.js'
import Utils from '../../utils/utils.js'

const CardsContainer = () => {
    const [coronaStats, setCoronaStats] = React.useState([])
    // const [countryFlags, setCountryFlags] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchCoronaStats = () => {
            return Axios.get('https://covid-193.p.rapidapi.com/statistics', {
                headers: {
                    'x-rapidapi-host': 'covid-193.p.rapidapi.com',
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

        // Promise.all([fetchCoronaStats(), fetchCountryFlags()]).then(([{ data: stats }, { data: flags }]) => {
        fetchCoronaStats().then(({ data: stats }) => {
            setCoronaStats(stats.response)
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

    const renderCards = () => {
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
        return coronaStats.map(({ country, cases, deaths, tests }) => {
            // const flag = flagsData.get(country.replace(/[. -]/g, '').toLowerCase())
            const flag = countryFlagsData[country]
            // if (flag) {
            //     flagsFound = { ...flagsFound, [country]: flag }
            // }
            return (
                !!flag && (
                    <Card key={country} country={country} cases={cases} deaths={deaths} tests={tests} flag={flag} />
                )
            )
        })
        // console.log(flagsFound)
        // return cards
    }

    return (
        <div className={getClasses()}>
            {isLoading && <CradleLoader />}
            {!isLoading && renderCards()}
        </div>
    )
}

CardsContainer.displayName = 'CardsContainer'

export default CardsContainer
