Trip Finder is a web application that helps users search for transit stops and plan trips easily using real-time data. The app provides autocomplete suggestions for stop names, retrieves schedules, and integrates with GTFS (General Transit Feed Specification) data for accurate routing information.

🔧 Tech Stack
Frontend: React + TypeScript, React-Bootstrap, Vite
Backend: Azure Functions (Isolated .NET), C#
Database: Azure SQL
Hosting: Azure Static Web Apps, GitHub Actions for CI/CD
APIs: GTFS data parsing and Azure Functions

🌟 Features
🔍 Stop Search Autocomplete: Fast and responsive stop name suggestions
🗺️ Trip Planning: Search and view trip details
⏱️ Live Schedule Info: Based on GTFS data (download trip schedule dataset, import it into the system via importer application.  Details refer to GTFSImporter projrct)
☁️ Cloud-based Backend: Azure Functions serve API data
🔐 Secure DB Access: Uses managed identity for Azure SQL

Url
https://jolly-mud-00a9c8110.6.azurestaticapps.net/
