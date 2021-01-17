import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowUp,
    faBriefcaseMedical,
    faHandHoldingHeart,
    faSkullCrossbones,
    faVial,
} from '@fortawesome/free-solid-svg-icons'
import { space } from './cardsConstants.js'
import ShootingStars from '../shootingStars/shootingStars.js'
import Utils from '../../utils/utils.js'

const Card = ({ name, cases, deaths, tests, recoveries, flag, newCases, newDeaths }) => {
    const getClasses = () => {
        const classes = new Map([
            ['card__list', true],
            ['m-margin-top', !!flag],
        ])

        return Utils.classNames(classes)
    }

    // eslint-disable-next-line react/display-name
    const getNewCount = (count, color) => {
        return (
            !!count && (
                <>
                    {`${space}${space}`}
                    <FontAwesomeIcon color={color} icon={faArrowUp} size="sm" />
                    {`${space}${count.toLocaleString()}`}
                </>
            )
        )
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
                    {`${space}${space}`}
                    {cases?.toLocaleString()}
                    {getNewCount(newCases, '#c9e305')}
                </li>
                <li>
                    <FontAwesomeIcon color="#ff2205" icon={faSkullCrossbones} size="sm" />
                    {`${space}${space}`}
                    {deaths?.toLocaleString() || 'NA'}
                    {getNewCount(newDeaths, '#ff2205')}
                </li>
                <li>
                    <FontAwesomeIcon color="#05e374" icon={faHandHoldingHeart} size="sm" />
                    {`${space}${space}`}
                    {recoveries?.toLocaleString() || 'NA'}
                </li>
                {!!tests && (
                    <li>
                        <FontAwesomeIcon color="#05d4e3" icon={faVial} size="sm" />
                        {`${space}${space}`}
                        {tests.toLocaleString()}
                    </li>
                )}
            </ul>
        </div>
    )
}

Card.displayName = 'Cards'
Card.propTypes = {
    name: PropTypes.string.isRequired,
    cases: PropTypes.number.isRequired,
    deaths: PropTypes.number,
    recoveries: PropTypes.number,
    tests: PropTypes.number,
    flag: PropTypes.string,
    newCases: PropTypes.number,
    newDeaths: PropTypes.number,
}
Card.defaultProps = {
    tests: 0,
    flag: '',
    recoveries: 0,
    deaths: 0,
    newCases: 0,
    newDeaths: 0,
}

export default Card
