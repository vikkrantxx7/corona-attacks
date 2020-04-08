import './cradleLoader.scss'

const CradleLoader = () => {
    const generateDivs = () => {
        return Array.from({ length: 5 }, (_, index) => <div key={index} />)
    }

    return (
        <div className="cradle-loader">
            <div className="cradle-loader__swing">
                <div className="cradle-loader__swing_l" />
                {generateDivs()}
                <div className="cradle-loader__swing_r" />
            </div>
            <div className="cradle-loader__shadow">
                <div className="cradle-loader__shadow_l" />
                {generateDivs()}
                <div className="cradle-loader__shadow_r" />
            </div>
        </div>
    )
}

CradleLoader.displayName = 'CradleLoader'

export default CradleLoader
