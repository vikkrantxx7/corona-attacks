import './iconsInfoBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcaseMedical, faHandHoldingHeart, faSkullCrossbones, faVial } from '@fortawesome/free-solid-svg-icons'
import { labels } from './cards/cardsConstants.js'

const IconsInfoBar = () => {
    return (
        <div>
            <ul className="icon-info-bar">
                <li>
                    <FontAwesomeIcon color="#c9e305" icon={faBriefcaseMedical} size="sm" />
                    {labels.cases}
                </li>
                <li>
                    <FontAwesomeIcon color="#ff2205" icon={faSkullCrossbones} size="sm" />
                    {labels.deaths}
                </li>
                <li>
                    <FontAwesomeIcon color="#05e374" icon={faHandHoldingHeart} size="sm" />
                    {labels.recoveries}
                </li>
                <li>
                    <FontAwesomeIcon color="#05d4e3" icon={faVial} size="sm" />
                    {labels.tests}
                </li>
            </ul>
        </div>
    )
}

IconsInfoBar.displayName = 'IconsInfoBar'

export default IconsInfoBar
