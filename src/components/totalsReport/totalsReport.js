import './totalsReport.scss'

const TotalsReport = ({ cases, deaths, recoveries }) => {
    return (
        <div className="totals-report">
            <span>{`Total Cases: ${Number(cases).toLocaleString()}`}</span>
            <span>{`Total Deaths: ${Number(deaths).toLocaleString()}`}</span>
            <span>{`Total Recoveries: ${Number(recoveries).toLocaleString()}`}</span>
        </div>
    )
}

TotalsReport.displayName = 'TotalsReport'
TotalsReport.propTypes = {
    cases: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    deaths: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    recoveries: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default TotalsReport
