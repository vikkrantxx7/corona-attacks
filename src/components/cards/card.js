import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcaseMedical, faHandHoldingHeart, faSkullCrossbones, faVial } from '@fortawesome/free-solid-svg-icons'
import { labels } from './cardsConstants.js'
import ShootingStars from '../shootingStars/shootingStars.js'
import Utils from '../../utils/utils.js'

const Card = ({ name, cases, deaths, tests, recoveries, flag }) => {
    const getClasses = () => {
        const classes = new Map([
            ['card__list', true],
            ['m-margin-top', !!flag],
        ])

        return Utils.classNames(classes)
    }

    return (
        <div className="card" style={{ backgroundImage: `url(${flag})` }}>
            <ShootingStars starsCount={3} />
            <span className="card__name" title={name}>
                {name}
            </span>
            <ul className={getClasses()}>
                <li>
                    <FontAwesomeIcon color="#c9e305" icon={faBriefcaseMedical} size="sm" />
                    {labels.cases}
                    {cases?.toLocaleString()}
                </li>
                <li>
                    <FontAwesomeIcon color="#ff2205" icon={faSkullCrossbones} size="sm" />
                    {labels.deaths}
                    {deaths?.toLocaleString() || 'NA'}
                </li>
                <li>
                    <FontAwesomeIcon color="#05e374" icon={faHandHoldingHeart} size="sm" />
                    {labels.recoveries}
                    {recoveries?.toLocaleString() || 'NA'}
                </li>
                {tests && (
                    <li>
                        <FontAwesomeIcon color="#05d4e3" icon={faVial} size="sm" />
                        {labels.tests}
                        {tests?.toLocaleString()}
                    </li>
                )}
            </ul>
        </div>
    )
}

Card.displayName = 'Cards'
Card.propTypes = {
    name: PropTypes.string.isRequired,
    cases: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    deaths: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    recoveries: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    tests: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    flag: PropTypes.string,
}
Card.defaultProps = {
    tests: '',
    flag: '',
}

export default Card
