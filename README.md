![React](https://img.shields.io/badge/Frontend-React-blue)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-lightblue)
![Bootstrap](https://img.shields.io/badge/UI-Bootstrap-purple)
![CSS](https://img.shields.io/badge/Style-CSS-264de4?logo=css3&logoColor=white&style=flat)
![Azure Static Web Apps](https://img.shields.io/badge/Hosting-Azure_Static_Web_Apps-0078D4)

## Url: https://jolly-mud-00a9c8110.6.azurestaticapps.net/
### Trip Finder - Frontend UI
**Trip Finder** is a web application that helps users search for transit stops and plan trips easily using real-time data. The app provides autocomplete suggestions for stop names, retrieves schedules, and uses OpenData following GTFS (General Transit Feed Specification) for trip schedule information.

This repository contains the frontend for the Trip Finder application, built with **React (TypeScript)** and styled using **Bootstrap** and **React-Bootstrap**.

### Tech Stack
- **Language/Tool:** React + TypeScript, React-Bootstrap, Vite
- **Hosting:** Azure Static Web Apps  
- **Deployment:** GitHub Actions for CI/CD
- **Database:** Azure SQL

### Features
- **Stop Search Autocomplete:** Fast and responsive stop name suggestions
- **Trip Planning:** Search and view trip details
- **Live Schedule Info:** Based on GTFS data (download trip schedule dataset, import it into the system via importer application.  Details refer to GTFSImporter project)
- **Cloud-based Backend:** Azure Functions serve API data

### Configuration
Environment variables: uses "VITE_" prefixed environment variables to config Azure functions endpoints
### License
This project is open-source and available under the GNU General Public License (GPLv3)
### Future Improvements
- Mobile UI improvements(React Native)
- Allow transfer
- Integrate with multiple transit agents
