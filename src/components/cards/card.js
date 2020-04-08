import ShootingStars from '../shootingStars/shootingStars.js'

const Card = ({ country, cases, deaths, tests, flag }) => {
    if (!flag) console.log(country)
    return (
        <div className="card" style={{ backgroundImage: `url(${flag})` }}>
            {country}
            <ul className="card__list">
                <li>{cases.total}</li>
                <li>{deaths.total}</li>
                <li>{tests.total}</li>
            </ul>
            {/*<ShootingStars />*/}
        </div>
    )
}

Card.displayName = 'Cards'
Card.propTypes = {
    country: PropTypes.string.isRequired,
    cases: PropTypes.shape({
        new: PropTypes.string,
        active: PropTypes.number.isRequired,
        critical: PropTypes.number.isRequired,
        recovered: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired,
    deaths: PropTypes.shape({
        new: PropTypes.string,
        total: PropTypes.number.isRequired,
    }).isRequired,
    tests: PropTypes.shape({
        total: PropTypes.number,
    }).isRequired,
    flag: PropTypes.string.isRequired,
}

export default Card
