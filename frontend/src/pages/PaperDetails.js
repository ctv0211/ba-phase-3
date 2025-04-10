import { useNavigate } from "react-router-dom";
import acceptImg from '../images/accept.png';
import removeImg from '../images/remove.png';

const PaperDetails = ({ paper }) => {
    const navigate = useNavigate()

    return (
        <div className="paper-details">
            <button onClick={() => navigate('/home')}>← Back to List</button>
            <div className="details_header">
                <h2 className="details_title">{paper.title}</h2>
                <div className="year_and_cits">
                    <div><p>{paper.year}</p><p className="details_blue">published</p></div>
                    <div><p>{paper.numberOfCitations}</p><p className="details_blue">Number of Citations</p></div>
                </div>
            </div>

            <div className="details_1">
                <div className="details_1_abstract"><p><strong>Abstract: </strong> {paper.abstract}</p></div>
                <div className="details_1_right">
                    <p><strong>Type of Paper:</strong> {paper.typeOfPaper}</p>
                    <p><strong>DOI:</strong> {paper.doi}</p>
                    <p><strong>Data Accessible:</strong> {paper.dataAccessible ? 'Yes' : 'No'}</p>
                    <p><strong>Nature of Data:</strong> {paper.FAQ_NatureOfData}</p>
                </div>
            </div>

            <div className="details_2">
                <div className="details_2_headline">
                    <p className="details_2_headline_1"><strong>For which kind of BPC task is this data being used?</strong> (according to definition of compliance framework from El Kharbili 2012)</p>
                    <p className="details_2_headline_2"><em>Values: Main Focus, Secondary Focus, Mentioned in Future Work, Not Mentioned, Mentioned but not Elaborated</em></p>
                </div>
                <div className="details_2_content">
                    <div className="details_2_1">
                        <div className="details_elicitation">
                            <p><strong>Compliance Elicitation</strong></p>
                            <p><strong>Modeling:</strong> {paper.BPC_Task_ComplianceElicitation_Modeling}</p>
                            <p><strong>Extraction:</strong> {paper.BPC_Task_ComplianceElicitation_Extraction}</p>
                        </div>
                        <div className="details_analysis">
                            <p><strong>Compliance Analysis</strong></p>
                            <p><strong>Reporting:</strong> {paper.BPC_Task_ComplianceAnalysis_Reporting}</p>
                            <p><strong>Explanation:</strong> {paper.BPC_Task_ComplianceAnalysis_Explanation}</p>
                        </div>
                    </div>

                    <div className="details_2_2">
                        <div className="details_enhancement">
                            <p><strong>Compliance Enhancement</strong></p>
                            <p><strong>Recovery:</strong> {paper.BPC_Task_ComplianceEnhancement_Recovery}</p>
                            <p><strong>Resolution:</strong> {paper.BPC_Task_ComplianceEnhancement_Resolution}</p>
                        </div>
                        <div className="details_checking">
                            <p><strong>Compliance Checking</strong></p>
                            <p><strong>Verification:</strong> {paper.BPC_Task_ComplianceChecking_Verification}</p>
                            <p><strong>Monitoring:</strong> {paper.BPC_Task_ComplianceChecking_EnforcementMonitoring}</p>
                            <p><strong>Audit:</strong> {paper.BPC_Task_ComplianceChecking_Audit}</p>
                        </div>
                    </div>
                </div>

                <div className="details_2_3">
                    <p><strong>Others: </strong>{paper.BPC_Task_Others}</p>
                </div>
            </div>

            <div className="details_3">
                <div className="details_3_headline">
                    <h3><strong>Type of Data</strong></h3>
                </div>

                <div className="freies_posing">
                    <div className="latissimus_von_vorn">
                        <img src={acceptImg} alt="accept" style={{ width: '50px', height: '50px', alignSelf: "center"}}/>
                        {paper.TypeOfData_RegulatoryDocuments?.toLowerCase().startsWith("yes") && (
                        <p><strong>Regulatory Documents:</strong> {paper.TypeOfData_RegulatoryDocuments}</p>
                        )}
                        {paper.TypeOfData_PureTextRequirements?.toLowerCase().startsWith("yes") && (
                        <p><strong>Pure Text Requirements:</strong> {paper.TypeOfData_PureTextRequirements}</p>
                        )}
                        {paper.TypeOfData_InternalPolicies?.toLowerCase().startsWith("yes") && (
                        <p><strong>Internal Policies:</strong> {paper.TypeOfData_InternalPolicies}</p>
                        )}
                        {paper.TypeOfData_BPModels?.toLowerCase().startsWith("yes") && (
                        <p><strong>Business Process Models:</strong> {paper.TypeOfData_BPModels}</p>
                        )}
                        {paper.TypeOfData_BPDescription?.toLowerCase().startsWith("yes") && (
                        <p><strong>Business Process Description:</strong> {paper.TypeOfData_BPDescription}</p>
                        )}
                        {paper.TypeOfData_EventLogs?.toLowerCase().startsWith("yes") && (
                        <p><strong>Event Logs:</strong> {paper.TypeOfData_EventLogs}</p>
                        )}
                        {paper.TypeOfData_FormalizedConstraints?.toLowerCase().startsWith("yes") && (
                        <p><strong>Formalized Constraints:</strong> {paper.TypeOfData_FormalizedConstraints}</p>
                        )}
                        {paper.TypeOfData_SemiformalizedConstraints?.toLowerCase().startsWith("yes") && (
                        <p><strong>Semi-Formalized Constraints:</strong> {paper.TypeOfData_SemiformalizedConstraints}</p>
                        )}
                        {paper.TypeOfData_Others?.toLowerCase().startsWith("yes") && (
                        <p><strong>Other:</strong> {paper.TypeOfData_Others}</p>
                        )}
                    </div>

                    <div className="latissimus_von_hintn">
                        <img src={removeImg} alt="remove" style={{ width: '50px', height: '50px', alignSelf: "center" }}/>
                        {paper.TypeOfData_RegulatoryDocuments?.toLowerCase().startsWith("no") && (
                        <p><strong>Regulatory Documents:</strong> {paper.TypeOfData_RegulatoryDocuments}</p>
                        )}
                        {paper.TypeOfData_PureTextRequirements?.toLowerCase().startsWith("no") && (
                        <p><strong>Pure Text Requirements:</strong> {paper.TypeOfData_PureTextRequirements}</p>
                        )}
                        {paper.TypeOfData_InternalPolicies?.toLowerCase().startsWith("no") && (
                        <p><strong>Internal Policies:</strong> {paper.TypeOfData_InternalPolicies}</p>
                        )}
                        {paper.TypeOfData_BPModels?.toLowerCase().startsWith("no") && (
                        <p><strong>Business Process Models:</strong> {paper.TypeOfData_BPModels}</p>
                        )}
                        {paper.TypeOfData_BPDescription?.toLowerCase().startsWith("no") && (
                        <p><strong>Business Process Description:</strong> {paper.TypeOfData_BPDescription}</p>
                        )}
                        {paper.TypeOfData_EventLogs?.toLowerCase().startsWith("no") && (
                        <p><strong>Event Logs:</strong> {paper.TypeOfData_EventLogs}</p>
                        )}
                        {paper.TypeOfData_FormalizedConstraints?.toLowerCase().startsWith("no") && (
                        <p><strong>Formalized Constraints:</strong> {paper.TypeOfData_FormalizedConstraints}</p>
                        )}
                        {paper.TypeOfData_SemiformalizedConstraints?.toLowerCase().startsWith("no") && (
                        <p><strong>Semi-Formalized Constraints:</strong> {paper.TypeOfData_SemiformalizedConstraints}</p>
                        )}
                        {paper.TypeOfData_Others?.toLowerCase().startsWith("no") && (
                        <p><strong>Other:</strong> {paper.TypeOfData_Others}</p>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="details_4">
                <div className="details_4_headline">
                    <h3>Additional Questions and Answers</h3>
                </div>
                
                <div className="details_4_qa_container">
                    
                    <div className="details_4_qa">
                        <div className="details_4_question">
                            <p><strong>Do they plan to use other data in the future?</strong></p>
                        </div>
                        <div className="details_4_answer">
                            <p>{paper.FAQ_OtherDataInFuture}</p>
                        </div>
                    </div>

                    <div className="details_4_qa">
                        <div className="details_4_question">
                            <p><strong>How was the data processed?</strong></p>
                        </div>
                        <div className="details_4_answer">
                            <p>{paper.FAQ_DataProcessed}</p>
                        </div>
                    </div>
                    
                    <div className="details_4_qa">
                        <div className="details_4_question">
                            <p><strong>What tool or approach was used to convert the data?</strong></p>
                        </div>
                        <div className="details_4_answer">
                            <p>{paper.FAQ_DataConverter}</p>
                        </div>
                    </div>

                    <div className="details_4_qa">
                        <div className="details_4_question">
                            <p><strong>Limitations of Dataset?</strong></p>
                        </div>
                        <div className="details_4_answer">
                            <p>{paper.FAQ_LimitationsOfDataset}</p>
                        </div>
                    </div>

                    <div className="details_4_qa">
                        <div className="details_4_question">
                            <p><strong>Are there multiple versions of the dataset?</strong></p>
                        </div>
                        <div className="details_4_answer">
                            <p>{paper.FAQ_MoreThanOneVersion}</p>
                        </div>
                    </div>

                    <div className="details_4_qa">
                        <div className="details_4_question">
                            <p><strong>Compliance Level or Degree?</strong></p>
                        </div>
                        <div className="details_4_answer">
                            <p>{paper.FAQ_ComplianceLevelOrDegree}</p>
                        </div>
                    </div>

                    <div className="details_4_qa">
                        <div className="details_4_question">
                            <p><strong>What are the Stakeholders?</strong></p>
                        </div>
                        <div className="details_4_answer">
                            <p>{paper.FAQ_Stakeholders}</p>
                        </div>
                    </div>  
                </div>         
            </div>

            <hr />
            <p><strong>Created at:</strong> {new Date(paper.createdAt).toLocaleString()}</p>
            <p><strong>Last Updated:</strong> {new Date(paper.updatedAt).toLocaleString()}</p>
        </div>
    );
};

export default PaperDetails;
