import ShootingStars from '../shootingStars/shootingStars.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkullCrossbones, faBriefcaseMedical, faVial, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'

const Card = ({ name, cases, deaths, tests, recoveries, flag }) => {
    return (
        <div className="card" style={{ backgroundImage: `url(${flag})` }}>
            <span className="card__name" title={name}>{name}</span>
            <ul className="card__list">
                <li>
                    <FontAwesomeIcon icon={faBriefcaseMedical} size="sm" />
                    {'\xa0\xa0Cases:\xa0\xa0'}
                    {cases?.toLocaleString()}
                </li>
                <li>
                    <FontAwesomeIcon icon={faSkullCrossbones} size="sm" />
                    {'\xa0\xa0Deaths:\xa0\xa0'}
                    {deaths?.toLocaleString() || 'NA'}
                </li>
                {recoveries && <li>
                    <FontAwesomeIcon icon={faHandHoldingHeart} size="sm" />
                    {'\xa0\xa0Recoveries:\xa0\xa0'}
                    {recoveries?.toLocaleString() || 'NA'}
                </li>}
                {tests && <li>
                    <FontAwesomeIcon icon={faVial} size="sm" />
                    {'\xa0\xa0Tests:\xa0\xa0'}
                    {tests?.toLocaleString()}
                </li>}
            </ul>
            {/*<ShootingStars />*/}
        </div>
    )
}

Card.displayName = 'Cards'
Card.propTypes = {
    name: PropTypes.string.isRequired,
    cases: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    deaths: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    tests: PropTypes.number,
    recoveries: PropTypes.string,
    flag: PropTypes.string,
}

export default Card
