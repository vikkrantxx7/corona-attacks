import './shootingStars.scss'

const ShootingStars = ({ starsCount }) => {
    const renderStars = () => {
        return Array.from({ length: starsCount }, (_, index) => <i className="shooting-star" key={index} />)
    }

    return <>{renderStars()}</>
}

ShootingStars.displayName = 'ShootingStars'
ShootingStars.propTypes = {
    starsCount: PropTypes.number,
}
ShootingStars.defaultProps = {
    starsCount: 5,
}

export default ShootingStars
