BPC Dataset Catalog

--- Architecture ---

- backend: communication between frontend and database, using Express and JavaScript

    - database: MongoDB Atlas Cluster
    - controllers: low-level CRUD interaction with database cluster
    - routes: routes to controller CRUD functions
    - models: model of the paper, which attributes to store to database
    - .env: environvent variables for port, on which the backend server listens to
    - server.js: entry point of backend application

- frontend: web application for user interaction and user view, using React and JavaScript
    - pages: pages to render; there are currently 2 pages in this application:
        1) /home: entry point with overview of all papers and filter
        2) /details: view to show all details about one selected paper
    - components: functional components:
        1) Filter: only show papers matching the filter
        2) Header: Header of the table
        3) PaperEntry: One entry of a paper, matching the header in content
        4) Navbar: Navbar on top of the website, currently without any functionality
        5) PaperUpdate: Formular to adapt the content of certain fields of a paper
    - index.js/App.js: entry point of frontend application
    - index.css: visual styling of entire web application

--- Setup ---
For starting the web application, start the backend and frontend server separately.

- install all dependencies:
    npm install

- Starting the backend:
    cd backend
    npm run dev

- Starting the frontend
    cd frontend
    npm start

- Open http://localhost:3000

--- Connecting to Database ---
add a .env file in backend folder that contains the following:
    - port of the backend
    - connection credentials string for a mongo db atlas cluster

    e.g.
    PORT=4000
    MONGO_URI=mongodb+srv://<user>:<password>@papercluster.hzlmcwh.mongodb.net


--- Using BPC Dataset Catalog ---
Add new papers to catalog:
    - click "Insert Data"
    - select csv file representation of papers to add
    - confirm the alert:
        - the alert may show that some papers cannot be inserted due to different errors. The user can adapt the table, create a new csv file from it and insert it again. The insertion logic takes care of duplicates, based on the doi (or title, if no doi is given)
    - the papers are now added to the table below

The csv must adhere to the following standards:

    1) Semicolon as delimiter

    2) The first row is the header that contains the column names:
      2.1) Allowed column names are:
            title, abstract, numberOfCitations, doi, year, typeOfPaper, dataAccessible, BPC_Task_ComplianceElicitation_Modeling, BPC_Task_ComplianceElicitation_Extraction,
        BPC_Task_ComplianceChecking_Verification, BPC_Task_ComplianceChecking_EnforcementMonitoring,
    BPC_Task_ComplianceChecking_Audit, BPC_Task_ComplianceAnalysis_Reporting,
    BPC_Task_ComplianceAnalysis_Explanation, BPC_Task_ComplianceEnhancement_Recovery,
    BPC_Task_ComplianceEnhancement_Resolution, BPC_Task_Others,
    TypeOfData_RegulatoryDocuments, TypeOfData_PureTextRequirements, TypeOfData_InternalPolicies,
    TypeOfData_BPModels, TypeOfData_BPDescription, TypeOfData_EventLogs,
    TypeOfData_FormalizedConstraints, TypeOfData_SemiformalizedConstraints, TypeOfData_Others,
    FAQ_OtherDataInFuture, FAQ_DataProcessed, FAQ_DataConverter, FAQ_LimitationsOfDataset,
    FAQ_NatureOfData, FAQ_MoreThanOneVersion, FAQ_ComplianceLevelOrDegree, FAQ_Stakeholders
      2.2) Column names are case-insensitive
      2.3) Column order does not matter

   3) Starting from the second row, the entries follow:
      3.1) Entries must not contain semicolons
      3.2) An empty field is represented by ""

4) Entries and header are separated by newlines (\n)

5) Additional columns that are not listed in 2.1 are allowed and will simply not be saved to the database

UTF-8 encoding is recommended

