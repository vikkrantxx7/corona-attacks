import './totalsReport.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { space } from '../cards/cardsConstants.js'

const TotalsReport = ({ cases, deaths, recoveries, newDeaths, newCases }) => {
    // eslint-disable-next-line react/display-name
    const getNewCount = (count, color) => {
        return (
            count && (
                <>
                    {`${space}${space}`}
                    <FontAwesomeIcon color={color} icon={faArrowUp} size="sm" />
                    {`${space}${Number(count).toLocaleString()}`}
                </>
            )
        )
    }

    return (
        <div className="totals-report">
            <span>
                {`Total Cases: ${Number(cases).toLocaleString()}`}
                {getNewCount(newCases, '#c9e305')}
            </span>
            <span>
                {`Total Deaths: ${Number(deaths).toLocaleString()}`}
                {getNewCount(newDeaths, '#ff2205')}
            </span>
            <span>{`Total Recoveries: ${Number(recoveries).toLocaleString()}`}</span>
        </div>
    )
}

TotalsReport.displayName = 'TotalsReport'
TotalsReport.propTypes = {
    cases: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    deaths: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    recoveries: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    newDeaths: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    newCases: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default TotalsReport
