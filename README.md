# CoinTra

CoinTra is a web3 inspired application built to track live cryptocurrency prices using the CoinGecko API. It is built with Next.js, TypeScript, Tanstack Query, and Tailwind CSS.

## Features
- Displays live prices for Bitcoin, Ethereum, Solana, Polygon, and Dogecoin in a sleek card-based layout.
- Auto-refreshes every 30 seconds using Tanstack Query.
- Search bar to add coins dynamically.
- Remove coins from the grid with a button.
- Sort coins by 24-hour price change (ascending or descending).
- Robust error handling for API rate limits and invalid searches.

## Setup
1. Clone the repo: 
```bash
git clone https://github.com/7maylord/CoinTra
cd CoinTra
```
2. Install dependencies: 
```bash
npm install
```
3. Start the development server: 
```bash
npm run dev
```
4. Open `http://localhost:3000`

## Structure and Architecture
CoinTra is a sleek, Web3-inspired crypto tracker built with modern web tech for performance, scalability, and user experience.

Next.js and TypeScript are used for a stable, type-safe foundation, whilst Tailwind CSS is used for rapid, responsive styling. The data is powered by CoinGecko's API as requested, fetched and managed efficiently using Tanstack Query,so as to keep the data fresh, cached, and resilient to rate limits.

On the frontend, CoinTra features dynamic coin cards and a debounced search, all backed by local state using useState and localStorage. The app is fully responsive, accessible, and designed to deliver a smooth experience across all devices.

With smart error handling, skeleton loading, and toasts for user feedback, CoinTra balances aesthetic appeal with real functionality, creating a crypto tracker that's as robust as it is beautiful.

## Scaling
To scale the Web_App for 100+ coins and multiple APIs, we can consider the following strategies:

### 100+ Coins
- **Batched API Calls**: The CoinGecko `/coins/markets` endpoint supports up to 250 coins per request. Split large coin lists into batches (e.g., 100 coins per call) to avoid rate limits and timeouts. Use Tanstack Query's `useQueries` to parallelize batch requests.
- **Pagination**: For very large lists (e.g., 500+ coins), implement client-side pagination or infinite scrolling to render 20-50 coins at a time, reducing DOM overhead and improving performance.
- **Caching**: Leverage Tanstack Query's caching to store coin data for 30 seconds (or longer for less volatile data), minimizing API calls. Persist frequently accessed coins in `localStorage` or IndexedDB for offline support.
- **Rate Limit Handling**: The app includes exponential backoff for 429 errors (1s, 2s, 3s retries). For high-frequency refreshes, reduce the refetch interval (e.g., 60 seconds) or use a paid CoinGecko API plan for higher limits (100+ requests/minute).
- **Performance Optimization**: Use React's `useMemo` to memoize sorted coin lists and avoid re-sorting on every render. Optimize image loading with `next/image` priority for visible coins only.

### Integrating Multiple APIs
- **Fallback APIs**: Integrate alternative APIs (e.g., CoinMarketCap, CryptoCompare) as fallbacks if CoinGecko fails. Create a service layer to switch APIs based on availability or rate limit status. Normalize data formats (e.g., price, 24h change) across APIs.
- **Priority Queue**: Implement a priority queue for API requests, prioritizing user-added coins or high-market-cap coins to ensure critical data loads first.
- **WebSocket Streams**: For real-time price updates, use WebSocket APIs (e.g., CoinGecko’s WebSocket or third-party services like Binance) to push price changes instead of polling. This reduces HTTP requests and provides lower latency.
- **Error Handling**: Extend the current toast-based error system to specify API sources (e.g., “CoinGecko failed, switching to CoinMarketCap”). Log errors server-side for monitoring.

### Infrastructure
- **Server-Side Rendering**: Use Next.js SSR or Incremental Static Regeneration (ISR) to pre-render popular coins, reducing client-side API calls for initial loads.
- **CDN Caching**: Cache API responses and images via a CDN (e.g., Cloudflare) to reduce latency and API costs.
- **Load Balancing**: For high traffic, deploy the app on a load-balanced infrastructure (e.g., Vercel, AWS) to handle concurrent users.
- **Monitoring**: Add monitoring tools (e.g., Sentry, Datadog) to track API failures, rate limit hits, and client-side errors.

## License
MIT