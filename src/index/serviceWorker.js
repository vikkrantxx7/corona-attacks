import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing/registerRoute.mjs'
import { CacheFirst } from 'workbox-strategies/CacheFirst.mjs'
import { NetworkFirst } from 'workbox-strategies/NetworkFirst.mjs'
import { StaleWhileRevalidate } from 'workbox-strategies/StaleWhileRevalidate.mjs'
import { ExpirationPlugin } from 'workbox-expiration/ExpirationPlugin.mjs'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

precacheAndRoute(self.__WB_MANIFEST)

self.__WB_DISABLE_DEV_LOGS = WB_LOGS_OFF

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

registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    }),
)

registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            }),
        ],
    }),
)
