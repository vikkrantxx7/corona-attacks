import '../index/index.scss'
import ShootingStars from '../components/shootingStars/shootingStars.js'
import TabsContainer from '../components/tabs/tabsContainer.js'
import CardsContainer from '../components/cards/cardsContainer.js'

const App = () => {
    const tabs = [
        {
            name: 'World',
            isActive: true,
            onTabClick: () => {
                console.log('tab 1')
            },
        },
        {
            name: 'India',
            isActive: false,
            onTabClick: () => {
                console.log('tab 2')
            },
        },
    ]
    return (
        <>
            <TabsContainer tabs={tabs} />
            {/*<ShootingStars />*/}
            <CardsContainer />
        </>
    )
}

App.displayName = 'App'
export default App
