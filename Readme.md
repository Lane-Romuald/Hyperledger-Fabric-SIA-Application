# Hyperledger Fabric Monitoring Application

## Overview
This repository hosts the codebase for a web application built on Hyperledger Fabric to monitor and manage an automated irrigation system. The application provides real-time data visualization and control for various parameters related to crop cultivation in a polyculture setup. Users can:

- Register and log in to access their dashboards.
- Select and monitor specific crop plots.
- Visualize real-time data in graphical and numerical formats.
- Configure, add, or remove sensor and actuator blocks.
- Manually control actuators and check their status.
- Export collected data in CSV format.

The parameters monitored include:
- Soil moisture
- Soil temperature
- Air humidity
- Air temperature
- Rainfall amount
- Rain probability

## Prerequisites
To use this application, you must first:
1. Deploy and install our Hyperledger Fabric irrigation network, available [here](https://github.com/Lane-Romuald/HYPERLEDGER-FABRIC-FOR-IOT-SMART-IRRIGATION-SYSTEM.git).
2. Deploy and instantiate the `SmartAICc` (Smart Automatic Irrigation Chaincode) designed for interactions within this blockchain network. The chaincode repository is available [here](https://github.com/Lane-Romuald/Smart-Irrigation-Chaincode.git).

## Folder Structure
The project structure is as follows:

```
ApplicationWeb
├── backend
│   ├── certs                # Contains certificates for HTTPS connections
│   ├── connection_profile   # Connection profiles used to configure a gateway for all network interactions, focusing on business logic
│   └── utils                # Utility files
├── frontend
    ├── css                   # Stylesheets
    ├── images                # Images
    └── views                 # HTML pages
```

The connection files provided are specific to our Hyperledger Fabric irrigation network. [here](https://github.com/Lane-Romuald/HYPERLEDGER-FABRIC-FOR-IOT-SMART-IRRIGATION-SYSTEM.git).

## Installation and Setup

### 1. Clone the repository
```bash
git clone https://github.com/Lane-Romuald/Hyperledger-Fabric-SIA-Application.git
cd Hyperledger-Fabric-SIA-Application
```

### 2. Deploy the Hyperledger Fabric network
Follow the instructions provided in the [Hyperledger Fabric network repository](https://github.com/Lane-Romuald/HYPERLEDGER-FABRIC-FOR-IOT-SMART-IRRIGATION-SYSTEM.git).

### 3. Deploy and instantiate the SmartAICc chaincode
Follow the instructions provided in the [SmartAICc Chaincode repository](https://github.com/Lane-Romuald/Smart-Irrigation-Chaincode.git).

### 4. Configure the backend
- Navigate to the `backend` directory.
- Update the `connection_profile` with your deployed Fabric network details.
- Place your organisation's certificates in the `certs` directory, where you can keep what is already there.

### 5. Install dependencies
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

### 6. Start the application
#### Start the backend server
```bash
cd backend
node server.js
```
#### Start the frontend server
```bash
cd ../frontend
npm start
```

### 7. Access the application
Open your browser and navigate to `https://IP_Adresse:3000`.

## Features
1. **User Authentication**
   - Sign-up and login pages to securely access the platform.
2. **Plot Management**
   - Add new crop plots or select existing ones for monitoring.
3. **Real-Time Monitoring**
   - Visualize soil and air parameters in real time.
4. **Actuator Control**
   - Activate or deactivate actuators manually and view their status.
5. **Data Export**
   - Download collected data in CSV format for further analysis.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## Acknowledgments
- [Hyperledger Fabric Documentation](https://hyperledger-fabric.readthedocs.io/) for guidelines and support.
- Open-source tools and libraries used in this project.

