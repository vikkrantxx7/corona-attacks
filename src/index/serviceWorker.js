import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing/registerRoute.mjs'
import { CacheFirst } from 'workbox-strategies/CacheFirst.mjs'
import { NetworkFirst } from 'workbox-strategies/NetworkFirst.mjs'
import { ExpirationPlugin } from 'workbox-expiration/ExpirationPlugin.mjs'

precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('message', (event) => {
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})

registerRoute(
    /https:\/\/restcountries\.eu\/data\//,
    new CacheFirst({
        cacheName: 'flags',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
            }),
        ],
    }),
)

registerRoute(
    /https:\/\/covid-193\.p\.rapidapi\.com\/statistics/,
    new NetworkFirst({
        cacheName: 'world',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 6 * 60 * 60, // 6 hours
            }),
        ],
    }),
)

registerRoute(
    /https:\/\/corona-virus-world-and-india-data\.p\.rapidapi\.com\/api_india/,
    new NetworkFirst({
        cacheName: 'india',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 6 * 60 * 60, // 6 hours
            }),
        ],
    }),
)
