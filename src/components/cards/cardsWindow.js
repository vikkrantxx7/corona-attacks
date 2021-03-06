import { FixedSizeList } from 'react-window'
import { TAB_NAME } from '../../containers/appConstants.js'
import AutoSizer from 'react-virtualized-auto-sizer'
import Card from './card.js'
import countryFlagsData from '../../data/countrieFlags.json'

const CardsWindow = ({ activeTab, onScroll, stats }) => {
    const getItemsCountPerRow = (width, itemWidth) => {
        return Math.max(Math.floor(width / itemWidth), 1)
    }

    const getRowsCount = (itemsPerRow, itemsCount) => {
        return Math.ceil(itemsCount / itemsPerRow)
    }

    const renderRows = (itemsPerRow, statistics) => ({ index, style }) => {
        const items = statistics.slice(index * itemsPerRow, index * itemsPerRow + itemsPerRow)
        return (
            <div key={index} style={style} className="fixed-list__row">
                {items.map((item) => {
                    return activeTab === TAB_NAME.World ? (
                        <Card
                            key={item.country}
                            name={item.country}
                            cases={item.cases.total}
                            deaths={item.deaths.total}
                            recoveries={item.cases.recovered}
                            tests={item.tests.total}
                            flag={countryFlagsData[item.country]}
                            newCases={Number(item.cases.new)}
                            newDeaths={Number(item.deaths.new)}
                        />
                    ) : (
                        <Card
                            key={item.state}
                            name={item.state}
                            cases={Number(item.confirmed)}
                            deaths={Number(item.deaths)}
                            recoveries={Number(item.recovered)}
                            newCases={Number(item.deltaconfirmed)}
                            newDeaths={Number(item.deltadeaths)}
                        />
                    )
                })}
            </div>
        )
    }

    // for padding at the bootom of the list (inner element is the div that contains the absolute divs)
    // eslint-disable-next-line react/display-name,react/prop-types
    const innerElementType = React.forwardRef(({ style, ...rest }, ref) => (
        <div
            ref={ref}
            style={{
                ...style,
                // eslint-disable-next-line react/prop-types
                height: `${parseFloat(style.height) + 15}px`,
            }}
            {...rest}
        />
    ))

    return (
        <AutoSizer>
            {({ height, width }) => {
                let itemWidth = 238

                if (width <= 420) {
                    itemWidth = 177
                } else if (width <= 767) {
                    itemWidth = 188
                }

                const itemsPerRow = getItemsCountPerRow(width, itemWidth)
                const rowsCount = getRowsCount(itemsPerRow, stats.length)

                return (
                    <FixedSizeList
                        className="fixed-list"
                        height={height}
                        width={width}
                        innerElementType={innerElementType}
                        useIsScrolling={true}
                        itemCount={rowsCount}
                        itemSize={width < 768 ? 135 : 205}
                        onScroll={onScroll}
                    >
                        {renderRows(itemsPerRow, stats)}
                    </FixedSizeList>
                )
            }}
        </AutoSizer>
    )
}

CardsWindow.propTypes = {
    activeTab: PropTypes.string.isRequired,
    stats: PropTypes.arrayOf(PropTypes.object).isRequired,
    onScroll: PropTypes.func.isRequired,
}
CardsWindow.displayName = 'CardsWindow'

export default CardsWindow
