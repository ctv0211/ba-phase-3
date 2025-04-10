import { useEffect, useState, useRef } from 'react'

// components
import PaperEntry from '../components/PaperEntry'
import Header from '../components/Header'
import Filter from '../components/Filter'

const Home = ({setChosenPaper }) => {
    // States
    const [papers, setPapers] = useState(null) // array an paper Objekten [{paper 1..., paper 2..., ...}]
    // Übersetzt wäre das:
    // papers = null
    // wenn wert von papers geändert wird:
    // papers = <neuer Wert> (aber ist nicht erlaubt)
    // ---
    // Wert von papers ändern:
    // setPapers(<neuer Wert>)
    const fileInputRef = useRef(null);
    const [startYear, setStartYear] = useState(null)
    const [endYear, setEndYear] = useState(null)
    const [modeling, setModeling] = useState(false)
    const [extraction, setExtraction] = useState(false)
    const [verification, setVerification] = useState(false)
    const [monitoring, setMonitoring] = useState(false)
    const [audit, setAudit] = useState(false)
    const [reporting, setReporting] = useState(false)
    const [explanation, setExplanation] = useState(false)
    const [recovery, setRecovery] = useState(false)
    const [resolution, setResolution] = useState(false)

    const [regulatoryDocuments, setRegulatoryDocuments] = useState(false)
    const [pureTextRequirements, setPureTextRequirements] = useState(false)
    const [internalPolicies, setInternalPolicies] = useState(false)
    const [bpModels, setBpModels] = useState(false)
    const [bpDescripion, setBpDescripion] = useState(false)
    const [eventLogs, setEventLogs] = useState(false)
    const [formalizedConstraints, setFormalizedConstraints] = useState(false)
    const [semiformalizedConstraints, setSemiformalizedConstraints] = useState(false)

    const [natureOfData, setNatureOfData] = useState("")

    // useEffect hook: rufe diesen Code nur einmalig auf (wenn Home Component erstmalig gerendert wird)
    useEffect(() => {
        const fetchPapers = async () => {
            //quasi das gleiche was zum testen vorher in Postman gemacht wurde, GET all papers aufrufen
            const response = await fetch('/api/papers')
            // response in json Format umwandeln
            const json = await response.json()

            // Statuscode = 2xx => alles ok mit der response
            if (response.ok) {
                setPapers(json)
                // weil papers = json IST NICHT VALIDE
            }
        }

        fetchPapers()
    }, [startYear, endYear, modeling, extraction, verification, monitoring, audit, reporting, explanation, recovery, resolution])

    // Alle Papers löschen
    const handleDeleteAll = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete ALL papers? This cannot be undone.");
      
        if (!confirmDelete) return;
      
        try {
          const res = await fetch('/api/papers', {
            method: 'DELETE',
          });
      
          if (res.ok) {
            alert('All papers deleted!');
            window.location.reload();
          } else {
            const error = await res.json();
            alert('Failed to delete papers: ' + error.error);
          }
        } catch (err) {
          console.error('Error deleting all papers:', err);
          alert('Something went wrong while deleting.');
        }
      };

    // Funktionen, um den Fileexplorer zu öffnen und die ausgewählte .csv-Datei in die Datenbank einzulesen

    //File Explorer öffnen
    const handleInsertClick = () => {
        fileInputRef.current.click();
    };
    
    // Paper in Database speichern
    // WICHTIG: Das .csv muss die Folgenden Felder in der 1. Zeile stehen haben (Reihenfolge egal)
    // title,abstract,numberOfCitations,doi,year,typeOfPaper,dataAccessible,BPC_Task_ComplianceElicitation_Modeling,BPC_Task_ComplianceElicitation_Extraction,BPC_Task_ComplianceChecking_Verification,BPC_Task_ComplianceChecking_EnforcementMonitoring,BPC_Task_ComplianceChecking_Audit,BPC_Task_ComplianceAnalysis_Reporting,BPC_Task_ComplianceAnalysis_Explanation,BPC_Task_ComplianceEnhancement_Recovery,BPC_Task_ComplianceEnhancement_Resolution,BPC_Task_Others,TypeOfData_RegulatoryDocuments,TypeOfData_PureTextRequirements,TypeOfData_InternalPolicies,TypeOfData_BPModels,TypeOfData_BPDescription,TypeOfData_EventLogs,TypeOfData_FormalizedConstraints,TypeOfData_SemiformalizedConstraints,TypeOfData_Others,FAQ_OtherDataInFuture,FAQ_DataProcessed,FAQ_DataConverter,FAQ_LimitationsOfDataset,FAQ_NatureOfData,FAQ_MoreThanOneVersion,FAQ_ComplianceLevelOrDegree,FAQ_Stakeholders
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        // Mal kucken ob das file überhaupt existiert
        if (!file) return;
    
        try {
            // Header (1. Zeile im csv) und Rows extrahieren
            const text = await file.text();
            const rows = text.split('\n').map(row => row.trim()).filter(Boolean);
            const headers = rows[0].split(',').map(h => h.trim());
        
            // JSON bauen mit den Header Feldern und den dazugehörigen Values
            const entries = rows.slice(1).map(row => {
                const values = row.split(',').map(v => v.trim());
                const obj = {};
                headers.forEach((header, i) => {
                obj[header] = values[i];
                });
                return obj;
            });

            console.log("Entries to add: ", entries)
        
            // POST jeder Eintrag in die Datenbank
            for (const entry of entries) {
                const res = await fetch('/api/papers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry),
                });
        
                if (!res.ok) {
                console.error('Failed to insert paper:', entry, await res.text());
                }
            }
        
            alert('All data inserted!');
            window.location.reload();
        } catch (err) {
            console.error('Error uploading file:', err);
            alert('Upload failed.');
        }
    };

    console.log('State:', {natureOfData });

    return (
        <>
            <Filter
                setStartYear={setStartYear}
                setEndYear={setEndYear}
                setModeling={setModeling}
                setExtraction={setExtraction}
                setVerification={setVerification}
                setMonitoring={setMonitoring}
                setAudit={setAudit}
                setReporting={setReporting}
                setExplanation={setExplanation}
                setRecovery={setRecovery}
                setResolution={setResolution}

                setRegulatoryDocuments={setRegulatoryDocuments}
                setPureTextRequirements={setPureTextRequirements}
                setInternalPolicies={setInternalPolicies}
                setBpModels={setBpModels}
                setBpDescripion={setBpDescripion}
                setEventLogs={setEventLogs}
                setFormalizedConstraints={setFormalizedConstraints}
                setSemiformalizedConstraints={setSemiformalizedConstraints}

                natureOfData={natureOfData}
                setNatureOfData={setNatureOfData}
            />
            <button onClick={handleInsertClick}>Insert Data</button>
            <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />
            <div className="home">
            <Header />
                <div className='papers'>
                    {papers && papers.map((paper) => {
                        const inYearRange = startYear === null && endYear === null || paper.year >= startYear && paper.year <= endYear;

                        const modelingMatch = modeling
                          ? paper.BPC_Task_ComplianceElicitation_Modeling === "Main Focus"
                          : true;
                      
                        const extractionMatch = extraction
                          ? paper.BPC_Task_ComplianceElicitation_Extraction === "Main Focus"
                          : true;
                      
                        const verificationMatch = verification
                          ? paper.BPC_Task_ComplianceChecking_Verification === "Main Focus"
                          : true;
                      
                        const monitoringMatch = monitoring
                          ? paper.BPC_Task_ComplianceChecking_EnforcementMonitoring === "Main Focus"
                          : true;
                      
                        const auditMatch = audit
                          ? paper.BPC_Task_ComplianceChecking_Audit === "Main Focus"
                          : true;
                      
                        const reportingMatch = reporting
                          ? paper.BPC_Task_ComplianceAnalysis_Reporting === "Main Focus"
                          : true;
                      
                        const explanationMatch = explanation
                          ? paper.BPC_Task_ComplianceAnalysis_Explanation === "Main Focus"
                          : true;
                      
                        const recoveryMatch = recovery
                          ? paper.BPC_Task_ComplianceEnhancement_Recovery === "Main Focus"
                          : true;
                      
                        const resolutionMatch = resolution
                          ? paper.BPC_Task_ComplianceEnhancement_Resolution === "Main Focus"
                          : true;

                        const regulatoryDocumentsMatch = regulatoryDocuments
                            ? paper.TypeOfData_RegulatoryDocuments.toLowerCase().startsWith("yes")
                            : true

                        const pureTextRequirementsMatch = pureTextRequirements
                            ? paper.TypeOfData_PureTextRequirements.toLowerCase().startsWith("yes")
                            : true
                        
                        const internalPoliciesMatch = internalPolicies
                            ? paper.TypeOfData_InternalPolicies.toLowerCase().startsWith("yes")
                            : true
                        
                        const bpModelsMatch = bpModels
                            ? paper.TypeOfData_BPModels.toLowerCase().startsWith("yes")
                            : true
                        
                        const bpDescripionMatch = bpDescripion
                            ? paper.TypeOfData_BPDescription.toLowerCase().startsWith("yes")
                            : true

                        const eventLogsMatch = eventLogs
                            ? paper.TypeOfData_EventLogs.toLowerCase().startsWith("yes")
                            : true

                        const formalizedConstraintsMatch = formalizedConstraints
                            ? paper.TypeOfData_FormalizedConstraints.toLowerCase().startsWith("yes")
                            : true

                        const semiformalizedConstraintsMatch = semiformalizedConstraints
                            ? paper.TypeOfData_SemiformalizedConstraints.toLowerCase().startsWith("yes")
                            : true

                        const natureOfDataSyntheticMatch = natureOfData !== ""
                            && paper.FAQ_NatureOfData.toLowerCase()

                        const natureOfDataRealworldMatch = natureOfData !== ""
                            ? paper.FAQ_NatureOfData.toLowerCase() === "real-world"
                            : true
                      
                        const matchesAll =
                          inYearRange &&
                          modelingMatch &&
                          extractionMatch &&
                          verificationMatch &&
                          monitoringMatch &&
                          auditMatch &&
                          reportingMatch &&
                          explanationMatch &&
                          recoveryMatch &&
                          resolutionMatch &&
                          regulatoryDocumentsMatch &&
                          pureTextRequirementsMatch &&
                          internalPoliciesMatch &&
                          bpModelsMatch &&
                          bpDescripionMatch &&
                          eventLogsMatch &&
                          formalizedConstraintsMatch &&
                          semiformalizedConstraintsMatch &&
                          natureOfDataSyntheticMatch &&
                          natureOfDataRealworldMatch
                    
                        return (
                            matchesAll && (
                                <PaperEntry
                                    key={paper._id}
                                    paper={paper}
                                    setChosenPaper={setChosenPaper}
                                />
                            )
                        );
                    })}
                </div>
            </div>
            <button onClick={handleDeleteAll} style={{ backgroundColor: 'crimson', color: 'white', marginLeft: '10px' }}>
                Delete All Papers
            </button>
        </>
    )
}

export default Home