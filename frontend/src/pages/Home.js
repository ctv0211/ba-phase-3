import { useEffect, useState, useRef } from 'react'
import Papa from 'papaparse';

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

    const [searchTerm, setSearchTerm] = useState("")

    const [showFilter, setShowFilter]  = useState(false)

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
    
    /* Paper in Database speichern
Das eingesetzte csv file muss folgende Bedingungen erfüllen:
1) Semikolon als Trennzeichen
2) 1. Zeile ist der Header, der die Spaltennamen enthält:
    2.1) Mögliche Spaltennamen sind:  title,abstract,numberOfCitations,doi,year,typeOfPaper,dataAccessible,BPC_Task_ComplianceElicitation_Modeling,BPC_Task_ComplianceElicitation_Extraction,BPC_Task_ComplianceChecking_Verification,BPC_Task_ComplianceChecking_EnforcementMonitoring,BPC_Task_ComplianceChecking_Audit,BPC_Task_ComplianceAnalysis_Reporting,BPC_Task_ComplianceAnalysis_Explanation,BPC_Task_ComplianceEnhancement_Recovery,BPC_Task_ComplianceEnhancement_Resolution,BPC_Task_Others,TypeOfData_RegulatoryDocuments,TypeOfData_PureTextRequirements,TypeOfData_InternalPolicies,TypeOfData_BPModels,TypeOfData_BPDescription,TypeOfData_EventLogs,TypeOfData_FormalizedConstraints,TypeOfData_SemiformalizedConstraints,TypeOfData_Others,FAQ_OtherDataInFuture,FAQ_DataProcessed,FAQ_DataConverter,FAQ_LimitationsOfDataset,FAQ_NatureOfData,FAQ_MoreThanOneVersion,FAQ_ComplianceLevelOrDegree,FAQ_Stakeholders
    2.2) Groß-/Kleinschreibung ist egal
    2.3) Reihenfolge der Spalten ist egal
3) Ab der 2. Zeile folgen die Einträge
    3.1) Einträge dürfen kein Semikolon enthalten
    3.2) Leeres Feld im Eintrag ist ""
4) Die Einträge (und der Header) sind durch Newlines (\n) voneineander getrennt
5) Es dürfen auch Spalten vorkommen, die nicht zu den unter 2.1 genannten zählen. Diese werden nicht in der Datenbank gespeichert
6) UTF-8 empfohlen
    */
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        // Mal kucken ob das file überhaupt existiert
        if (!file) return;

        let insertedCount = 0

        Papa.parse(file, {
            header: true,
            delimiter: ';',
            skipEmptyLines: true,
            complete: async function (results) {
                console.log('Parsed data:', results.data);
                let uploadCount = results.data.length
                const malformedPapers = []

                for (const entry of results.data) {

                  // INPUT VALIDATION
                  const focusEnum = [
                    "main focus",
                    "secondary focus",
                    "mentioned in future work",
                    "not mentioned",
                    "mentioned but not elaborated",
                    "not relevant"
                  ];
                  
                  const dataProcessedEnum = ["automatic", "semi-automatic", "manual", "not relevant"];
                  const natureOfDataEnum = ["synthetic", "real-world", "not relevant", "both"];
                  const complianceLevelEnum = ["compliance level", "compliance degree", "both", "not relevant"];
                  
                  function isValidEnum(value, validValues) {
                    return value ? validValues.includes(value.trim().toLowerCase()) : false;
                  }
                  
                  function validateEntry(entry) {
                    const malformed = {
                      title: entry.title || "Unknown Title",
                      doi: entry.doi || "No DOI",
                      reason: []
                    };
                  
                    const requiredFields = ["title"];
                    for (const field of requiredFields) {
                      if (!entry[field] || entry[field].trim() === "") {
                        malformed.reason.push(`Missing ${field}`);
                      }
                    }
                  
                    const intFields = ["year", "numberOfCitations"];
                    for (const field of intFields) {
                      if (entry[field] && isNaN(parseInt(entry[field]))) {
                        malformed.reason.push(`Invalid number: ${field}`);
                      }
                    }
                  
                    const booleanFields = ["dataAccessible"];
                    for (const field of booleanFields) {
                      const val = entry[field]?.toLowerCase();
                      if (val !== "true" && val !== "false") {
                        malformed.reason.push(`Invalid boolean: ${field}`);
                      }
                    }
                  
                    const focusFields = [
                      "BPC_Task_ComplianceElicitation_Modeling",
                      "BPC_Task_ComplianceElicitation_Extraction",
                      "BPC_Task_ComplianceChecking_Verification",
                      "BPC_Task_ComplianceChecking_EnforcementMonitoring",
                      "BPC_Task_ComplianceChecking_Audit",
                      "BPC_Task_ComplianceAnalysis_Reporting",
                      "BPC_Task_ComplianceAnalysis_Explanation",
                      "BPC_Task_ComplianceEnhancement_Recovery",
                      "BPC_Task_ComplianceEnhancement_Resolution"
                    ];
                    for (const field of focusFields) {
                      if (entry[field] && !isValidEnum(entry[field], focusEnum)) {
                        malformed.reason.push(`Invalid enum value for ${field}`);
                      }
                    }
                  
                    if (entry["FAQ_DataProcessed"] && !isValidEnum(entry["FAQ_DataProcessed"], dataProcessedEnum)) {
                      malformed.reason.push("Invalid FAQ_DataProcessed");
                    }
                    if (entry["FAQ_NatureOfData"] && !isValidEnum(entry["FAQ_NatureOfData"], natureOfDataEnum)) {
                      malformed.reason.push("Invalid FAQ_NatureOfData");
                    }
                    if (entry["FAQ_ComplianceLevelOrDegree"] && !isValidEnum(entry["FAQ_ComplianceLevelOrDegree"], complianceLevelEnum)) {
                      malformed.reason.push("Invalid FAQ_ComplianceLevelOrDegree");
                    }
                  
                    return malformed.reason.length === 0 ? null : malformed;
                  }
                  
                  const validation = validateEntry(entry)
                  if (validation) {
                    malformedPapers.push(validation)
                    console.log(malformedPapers)
                    // nächstes Paper (ohne es zu DB zu adden)
                    continue
                  }
                  
                  // ENDE INPUT VALIDATION                  

                  try {
                    const res = await fetch('/api/papers', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(entry),
                    });

                    if (!res.ok) {
                      console.error('Failed to insert paper:', entry, await res.text());
                    } else {
                      insertedCount = insertedCount + 1
                    }
                  } catch (err) {
                    console.error('Fetch error:', err);
                  }
                }
                
                console.log("malformedPapers", malformedPapers)

                let allErrorString = "";
                if (malformedPapers.length === 0) {
                  allErrorString = "All papers inserted!"
                }
                else {
                  for (const paper of malformedPapers) {
                    allErrorString += `Paper "${paper.title}" (${paper.doi}) not inserted.\nReason: ${paper.reason}\n\n`;
                  }
                }

                alert(allErrorString);
                window.location.reload();
              },
            error: function (error) {
                console.error('Error parsing CSV:', error);
            }
            });
          }

    return (
        <>
            <div className='home_content_container'>
              <div className='button_container'>
                <button className='insert_data' onClick={() => setShowFilter(!showFilter)}>
                  <p>{showFilter ? "Hide Filter" : "Show Filter"}</p>
                </button>
                <button className="insert_data" onClick={handleInsertClick}>Insert Data</button>
                <button className="delete_data" onClick={handleDeleteAll}>Clear Table</button>
              </div>
        
              {showFilter && <Filter
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

                setSearchTerm={setSearchTerm}
            />}

            <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />
            </div>
            <div className='table-scroll-container'>
              <div className="home">
              <Header />
                  <div className='papers'>
                      {papers && papers.map((paper) => {
                          const inYearRange = startYear === null && endYear === null || paper.year >= startYear && paper.year <= endYear;

                          const acceptedFocusValues = [
                            "main focus",
                            "secondary focus",
                            "mentioned in future work"
                          ];

                          const modelingMatch = modeling
                          ? acceptedFocusValues.includes(paper.BPC_Task_ComplianceElicitation_Modeling)
                          : true;

                        const extractionMatch = extraction
                          ? acceptedFocusValues.includes(paper.BPC_Task_ComplianceElicitation_Extraction)
                          : true;

                        const verificationMatch = verification
                          ? acceptedFocusValues.includes(paper.BPC_Task_ComplianceChecking_Verification)
                          : true;

                        const monitoringMatch = monitoring
                          ? acceptedFocusValues.includes(paper.BPC_Task_ComplianceChecking_EnforcementMonitoring)
                          : true;

                        const auditMatch = audit
                          ? acceptedFocusValues.includes(paper.BPC_Task_ComplianceChecking_Audit)
                          : true;

                        const reportingMatch = reporting
                          ? acceptedFocusValues.includes(paper.BPC_Task_ComplianceAnalysis_Reporting)
                          : true;

                        const explanationMatch = explanation
                          ? acceptedFocusValues.includes(paper.BPC_Task_ComplianceAnalysis_Explanation)
                          : true;

                        const recoveryMatch = recovery
                          ? acceptedFocusValues.includes(paper.BPC_Task_ComplianceEnhancement_Recovery)
                          : true;

                        const resolutionMatch = resolution
                          ? acceptedFocusValues.includes(paper.BPC_Task_ComplianceEnhancement_Resolution)
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

                          const natureOfDataSyntheticMatch = natureOfData.toLowerCase() === "synthetic"
                              ? paper.FAQ_NatureOfData.toLowerCase() === "synthetic"
                              : true

                          const natureOfDataRealworldMatch = natureOfData.toLowerCase() === "real-world"
                              ? paper.FAQ_NatureOfData.toLowerCase() === "real-world"
                              : true

                          const natureOfDataBothMatch = natureOfData.toLowerCase() === "both"
                              ? paper.FAQ_NatureOfData.toLowerCase() === "both"
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
                            natureOfDataRealworldMatch &&
                            natureOfDataBothMatch &&

                            paper.doi.includes(searchTerm)
                      
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
            </div>
        </>
    )
}
export default Home