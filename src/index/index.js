import App from '../containers/app.js'

const app = document.getElementById('app')

ReactDOM.render(<App />, app)

if ('serviceWorker' in navigator) {
    const sw = async () => {
        const { Workbox } = await import('workbox-window')

        window.addEventListener('load', () => {
            const wb = new Workbox('/serviceWorker.js')
            const updateButton = document.querySelector('.update')

            wb.register().catch((error) => console.error(error))
            wb.addEventListener('waiting', (event) => {
                updateButton.classList.add('show')
                updateButton.addEventListener('click', () => {
                    // Set up a listener that will reload the page as soon as the previously waiting service worker has taken control.
                    wb.addEventListener('controlling', (event) => {
                        window.location.reload()
                    })

                    // Send a message telling the service worker to skip waiting.
                    // This will trigger the `controlling` event handler above.
                    wb.messageSW({ type: 'SKIP_WAITING' }).catch((error) => console.error(error))
                })
            })
        })
    }
    sw()
}
