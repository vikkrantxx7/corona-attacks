import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkullCrossbones, faBriefcaseMedical, faVial, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'
import { labels } from './cardsConstants.js'
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
            <span className="card__name" title={name}>
                {name}
            </span>
            <ul className={getClasses()}>
                <li>
                    <FontAwesomeIcon icon={faBriefcaseMedical} size="sm" />
                    {labels.cases}
                    {cases?.toLocaleString()}
                </li>
                <li>
                    <FontAwesomeIcon icon={faSkullCrossbones} size="sm" />
                    {labels.deaths}
                    {deaths?.toLocaleString() || 'NA'}
                </li>
                <li>
                    <FontAwesomeIcon icon={faHandHoldingHeart} size="sm" />
                    {labels.recoveries}
                    {recoveries?.toLocaleString() || 'NA'}
                </li>
                {tests && (
                    <li>
                        <FontAwesomeIcon icon={faVial} size="sm" />
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
