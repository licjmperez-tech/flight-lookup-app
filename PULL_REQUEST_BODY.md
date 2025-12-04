Aligned env var name to AVIATION_STACK_API_KEY, added response-shape checks in the AviationStack helper, and added safe mapping fallbacks in the flights API route.

How to test:
1. git checkout fix/env-and-api-mapping
2. Add AVIATION_STACK_API_KEY=your_api_key_here to flight-lookup/.env.local
3. npm install && npm run dev
4. Search for sample flights (AA123, UA456, DL789, BA100, SW555) to verify mock/real results.