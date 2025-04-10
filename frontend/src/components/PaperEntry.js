import { useNavigate } from "react-router-dom"

// Diese Component stellt eine Reihe (Dateneintrag) dar für ein gegebenes Paper (in der Tabelle)

const PaperEntry = ({ paper, setChosenPaper }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        setChosenPaper(paper);        // store the selected paper
        navigate('/detail');          // go to the details page
    };

    //Funktion, die das backend aufruft um ein paper aus der Datenbank zu entfernen
    const handleDelete = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${paper.title}"?`);
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/papers/${paper._id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                window.location.reload(); // Fenster neu laden, um Änderung sichtbar zu machen (Alternativ hätte ich React Context dafür verwenden können, aber davon habe ich in Anbetracht der geringen Größe der Applikation und zeitlicher Constraints von abgesehen)
            } else {
                alert("Failed to delete paper.");
            }
        } catch (error) {
            console.error("Error deleting paper:", error);
            alert("Error deleting paper.");
        }
    };

    return (
        <div className="paper_entry" onClick={handleClick}>
            <div className="entry_title"><p>{paper.title}</p></div>
            <div className="entry_doi"><p>{paper.doi}</p></div>
            <div className="entry_year"><p>{paper.year}</p></div>

            <div className="entry_elicitation_modeling"><p>{paper.BPC_Task_ComplianceElicitation_Modeling}</p></div>
            <div className="entry_elicitation_extraction"><p>{paper.BPC_Task_ComplianceElicitation_Extraction}</p></div>
            <div className="entry_checking_verification"><p>{paper.BPC_Task_ComplianceChecking_Verification}</p></div>
            <div className="entry_checking_enforcementmonitoring"><p>{paper.BPC_Task_ComplianceChecking_EnforcementMonitoring}</p></div>
            <div className="entry_checking_audit"><p>{paper.BPC_Task_ComplianceChecking_Audit}</p></div>
            <div className="entry_analysis_reporting"><p>{paper.BPC_Task_ComplianceAnalysis_Reporting}</p></div>
            <div className="entry_analysis_explanation"><p>{paper.BPC_Task_ComplianceAnalysis_Explanation}</p></div>
            <div className="entry_enhancement_recovery"><p>{paper.BPC_Task_ComplianceEnhancement_Recovery}</p></div>
            <div className="entry_enhancement_resolution"><p>{paper.BPC_Task_ComplianceEnhancement_Resolution}</p></div>
            <div className="entry_other_tasks"><p>{paper.BPC_Task_Others}</p></div>

            <div className="entry_data_regdocuments"><p>{paper.TypeOfData_RegulatoryDocuments}</p></div>
            <div className="entry_data_puretextreq"><p>{paper.TypeOfData_PureTextRequirements}</p></div>
            <div className="entry_data_internalpolicies"><p>{paper.TypeOfData_InternalPolicies}</p></div>
            <div className="entry_data_bpmodels"><p>{paper.TypeOfData_BPModels}</p></div>
            <div className="entry_data_bpdescription"><p>{paper.TypeOfData_BPDescription}</p></div>
            <div className="entry_data_eventlogs"><p>{paper.TypeOfData_EventLogs}</p></div>
            <div className="entry_data_formalizedconstraints"><p>{paper.TypeOfData_FormalizedConstraints}</p></div>
            <div className="entry_data_semiformalizedconstraints"><p>{paper.TypeOfData_SemiformalizedConstraints}</p></div>
            <div className="entry_data_others"><p>{paper.TypeOfData_Others}</p></div>

            <div className="entry_faq_natureofdata"><p>{paper.FAQ_NatureOfData}</p></div>
            <div className="entry_createdat"><p>{paper.createdAt}</p></div>

            <div className="entry_delete">
                <button onClick={handleDelete} style={{ backgroundColor: 'crimson', color: 'white', padding: '0.3rem 0.6rem', cursor: 'pointer', border: 'none', borderRadius: '4px' }}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default PaperEntry