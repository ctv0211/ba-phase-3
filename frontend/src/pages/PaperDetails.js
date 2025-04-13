import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import acceptImg from '../images/accept.png';
import removeImg from '../images/remove.png';
import questionImg from '../images/question.png';

import PaperUpdate from "../components/PaperUpdate"

const PaperDetails = ({ paper }) => {
    const navigate = useNavigate()
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    // Wenn diese Component gerendert wird, nach oben scrollen
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

	const entryIsPostive = (val) =>
		typeof val === "string" &&
		(val.toLowerCase().startsWith("yes") || val.toLowerCase().startsWith("true"));

	const entryIsNegative = (val) =>
		typeof val === "string" &&
		(val.toLowerCase().startsWith("no") || val.toLowerCase().startsWith("false"));
	
	const entryIsUnclear = (val) =>
		val && !entryIsPostive(val) && !entryIsNegative(val);

    return (
        <div className="paper_details">
            <div className='details_buttons'>
                <button className='insert_data' onClick={() => navigate('/home')}><p>← Back to List</p></button>
                <button className='insert_data' onClick={() => showUpdateForm ? setShowUpdateForm(false) : setShowUpdateForm(true)}><p>{showUpdateForm ? "Don't update" : "Update this paper"}</p></button>
            </div>
            {showUpdateForm && <PaperUpdate paper={paper} />}
            <div className="details_header">
                <h2 className="details_title">{paper.title}</h2>
                <div className="year_and_cits">
                    <div><p>{paper.year}</p><p className="details_blue">published</p></div>
                    <div><p>{paper.numberOfCitations}</p><p className="details_blue">citations</p></div>
                </div>
            </div>

            <hr />

            <div className="details_1">
                <div className="details_1_abstract"><p><strong>Abstract: </strong> {paper.abstract}</p></div>
                <div className="details_1_right">
                    <p><strong>Type of Paper:</strong> {paper.typeOfPaper}</p>
                    <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer">Access Paper DOI</a>
                    <p><strong>Data Accessible:</strong> {paper.dataAccessible ? 'Yes' : 'No'}</p>
                    <p><strong>Nature of Data:</strong> {paper.FAQ_NatureOfData}</p>
                </div>
            </div>

            <hr />

            <div className="details_2">
                <div className="details_2_headline">
                    <p className="details_2_headline_1"><strong>For which kind of BPC task is this data being used?</strong> (according to definition of compliance framework from El Kharbili 2012)</p>
                    <p className="details_2_headline_2"><em>Values: Main Focus, Secondary Focus, Mentioned in Future Work, Not Mentioned, Mentioned but not Elaborated</em></p>
                </div>
                <div className="details_2_content">
					<div className="details_2_1">
						<div className="details_elicitation">
							<div className='blue_box'><strong>Compliance Elicitation</strong></div>
							<p><strong>Modeling:</strong> {paper.BPC_Task_ComplianceElicitation_Modeling === "" ? "N/A" : paper.BPC_Task_ComplianceElicitation_Modeling}</p>
							<p><strong>Extraction:</strong> {paper.BPC_Task_ComplianceElicitation_Extraction === "" ? "N/A" : paper.BPC_Task_ComplianceElicitation_Extraction}</p>
							</div>
							<div className="details_analysis">
							<div className='blue_box'><strong>Compliance Analysis</strong></div>
							<p><strong>Reporting:</strong> {paper.BPC_Task_ComplianceAnalysis_Reporting === "" ? "N/A" : paper.BPC_Task_ComplianceAnalysis_Reporting}</p>
							<p><strong>Explanation:</strong> {paper.BPC_Task_ComplianceAnalysis_Explanation === "" ? "N/A" : paper.BPC_Task_ComplianceAnalysis_Explanation}</p>
						</div>
					</div>

					<div className="details_2_2">
						<div className="details_enhancement">
							<div className='blue_box'><strong>Compliance Enhancement</strong></div>
							<p><strong>Recovery:</strong> {paper.BPC_Task_ComplianceEnhancement_Recovery === "" ? "N/A" : paper.BPC_Task_ComplianceEnhancement_Recovery}</p>
							<p><strong>Resolution:</strong> {paper.BPC_Task_ComplianceEnhancement_Resolution === "" ? "N/A" : paper.BPC_Task_ComplianceEnhancement_Resolution}</p>
							</div>
							<div className="details_checking">
							<div className='blue_box'><strong>Compliance Checking</strong></div>
							<p><strong>Verification:</strong> {paper.BPC_Task_ComplianceChecking_Verification === "" ? "N/A" : paper.BPC_Task_ComplianceChecking_Verification}</p>
							<p><strong>Monitoring:</strong> {paper.BPC_Task_ComplianceChecking_EnforcementMonitoring === "" ? "N/A" : paper.BPC_Task_ComplianceChecking_EnforcementMonitoring}</p>
							<p><strong>Audit:</strong> {paper.BPC_Task_ComplianceChecking_Audit === "" ? "N/A" : paper.BPC_Task_ComplianceChecking_Audit}</p>
						</div>
					</div>
					</div>


                <div className="details_2_3">
                    <p><strong>Others: </strong>{paper.BPC_Task_Others}</p>
                </div>
            </div>

            <hr />

            <div className="details_3">
                <div className="details_3_headline">
                    <div className='blue_box'><h3><strong>Type of Data</strong></h3></div>
                </div>

                <div className="freies_posing">
				<div className="latissimus_von_vorn">
					<img
						src={acceptImg}
						alt="accept"
						style={{ width: '50px', height: '50px', alignSelf: 'center' }}
					/>
					{entryIsPostive(paper.TypeOfData_RegulatoryDocuments) && (
						<p><strong>Regulatory Documents:</strong> {paper.TypeOfData_RegulatoryDocuments}</p>
					)}
					{entryIsPostive(paper.TypeOfData_PureTextRequirements) && (
						<p><strong>Pure Text Requirements:</strong> {paper.TypeOfData_PureTextRequirements}</p>
					)}
					{entryIsPostive(paper.TypeOfData_InternalPolicies) && (
						<p><strong>Internal Policies:</strong> {paper.TypeOfData_InternalPolicies}</p>
					)}
					{entryIsPostive(paper.TypeOfData_BPModels) && (
						<p><strong>Business Process Models:</strong> {paper.TypeOfData_BPModels}</p>
					)}
					{entryIsPostive(paper.TypeOfData_BPDescription) && (
						<p><strong>Business Process Description:</strong> {paper.TypeOfData_BPDescription}</p>
					)}
					{entryIsPostive(paper.TypeOfData_EventLogs) && (
						<p><strong>Event Logs:</strong> {paper.TypeOfData_EventLogs}</p>
					)}
					{entryIsPostive(paper.TypeOfData_FormalizedConstraints) && (
						<p><strong>Formalized Constraints:</strong> {paper.TypeOfData_FormalizedConstraints}</p>
					)}
					{entryIsPostive(paper.TypeOfData_SemiformalizedConstraints) && (
						<p><strong>Semi-Formalized Constraints:</strong> {paper.TypeOfData_SemiformalizedConstraints}</p>
					)}
					{entryIsPostive(paper.TypeOfData_Others) && (
						<p><strong>Other:</strong> {paper.TypeOfData_Others}</p>
					)}
					</div>

                    <div className="latissimus_von_hintn">
						<div className='details_no'>
							<div className='imageContainer'>
								<img src={removeImg} alt="remove" style={{ width: '50px', height: '50px', alignSelf: "center" }}/>
							</div>
							{entryIsNegative(paper.TypeOfData_RegulatoryDocuments) && (
							<p><strong>Regulatory Documents:</strong> {paper.TypeOfData_RegulatoryDocuments}</p>
							)}
							{entryIsNegative(paper.TypeOfData_PureTextRequirements) && (
							<p><strong>Pure Text Requirements:</strong> {paper.TypeOfData_PureTextRequirements}</p>
							)}
							{entryIsNegative(paper.TypeOfData_InternalPolicies) && (
							<p><strong>Internal Policies:</strong> {paper.TypeOfData_InternalPolicies}</p>
							)}
							{entryIsNegative(paper.TypeOfData_BPModels) && (
							<p><strong>Business Process Models:</strong> {paper.TypeOfData_BPModels}</p>
							)}
							{entryIsNegative(paper.TypeOfData_BPDescription) && (
							<p><strong>Business Process Description:</strong> {paper.TypeOfData_BPDescription}</p>
							)}
							{entryIsNegative(paper.TypeOfData_EventLogs) && (
							<p><strong>Event Logs:</strong> {paper.TypeOfData_EventLogs}</p>
							)}
							{entryIsNegative(paper.TypeOfData_FormalizedConstraints) && (
							<p><strong>Formalized Constraints:</strong> {paper.TypeOfData_FormalizedConstraints}</p>
							)}
							{entryIsNegative(paper.TypeOfData_SemiformalizedConstraints) && (
							<p><strong>Semi-Formalized Constraints:</strong> {paper.TypeOfData_SemiformalizedConstraints}</p>
							)}
							{entryIsNegative(paper.TypeOfData_Others) && (
							<p><strong>Other:</strong> {paper.TypeOfData_Others}</p>
							)}
						</div>
						<div className='details_dontknow'>
							<div className='imageContainer'>
								<img src={questionImg} alt="not clear" style={{ width: '50px', height: '50px', alignSelf: "center" }}/>
							</div>							
							{entryIsUnclear(paper.TypeOfData_RegulatoryDocuments) && (
							<p><strong>Regulatory Documents:</strong> {paper.TypeOfData_RegulatoryDocuments}</p>
							)}
							{entryIsUnclear(paper.TypeOfData_PureTextRequirements) && (
							<p><strong>Pure Text Requirements:</strong> {paper.TypeOfData_PureTextRequirements}</p>
							)}
							{entryIsUnclear(paper.TypeOfData_InternalPolicies) && (
							<p><strong>Internal Policies:</strong> {paper.TypeOfData_InternalPolicies}</p>
							)}
							{entryIsUnclear(paper.TypeOfData_BPModels) && (
							<p><strong>Business Process Models:</strong> {paper.TypeOfData_BPModels}</p>
							)}
							{entryIsUnclear(paper.TypeOfData_BPDescription) && (
							<p><strong>Business Process Description:</strong> {paper.TypeOfData_BPDescription}</p>
							)}
							{entryIsUnclear(paper.TypeOfData_EventLogs) && (
							<p><strong>Event Logs:</strong> {paper.TypeOfData_EventLogs}</p>
							)}
							{entryIsUnclear(paper.TypeOfData_FormalizedConstraints) && (
							<p><strong>Formalized Constraints:</strong> {paper.TypeOfData_FormalizedConstraints}</p>
							)}
							{entryIsUnclear(paper.TypeOfData_SemiformalizedConstraints) && (
							<p><strong>Semi-Formalized Constraints:</strong> {paper.TypeOfData_SemiformalizedConstraints}</p>
							)}
							{entryIsUnclear(paper.TypeOfData_Others) && (
							<p><strong>Other:</strong> {paper.TypeOfData_Others}</p>
							)}

						</div>
                    </div>
                </div>
            </div>

            <hr />
            
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
						<p>{paper.FAQ_OtherDataInFuture === "" ? "N/A" : paper.FAQ_OtherDataInFuture}</p>
						</div>
					</div>

					<div className="details_4_qa">
						<div className="details_4_question">
						<p><strong>How was the data processed?</strong></p>
						</div>
						<div className="details_4_answer">
						<p>{paper.FAQ_DataProcessed === "" ? "N/A" : paper.FAQ_DataProcessed}</p>
						</div>
					</div>

					<div className="details_4_qa">
						<div className="details_4_question">
						<p><strong>What tool or approach was used to convert the data?</strong></p>
						</div>
						<div className="details_4_answer">
						<p>{paper.FAQ_DataConverter === "" ? "N/A" : paper.FAQ_DataConverter}</p>
						</div>
					</div>

					<div className="details_4_qa">
						<div className="details_4_question">
						<p><strong>Limitations of Dataset?</strong></p>
						</div>
						<div className="details_4_answer">
						<p>{paper.FAQ_LimitationsOfDataset === "" ? "N/A" : paper.FAQ_LimitationsOfDataset}</p>
						</div>
					</div>

					<div className="details_4_qa">
						<div className="details_4_question">
						<p><strong>Are there multiple versions of the dataset?</strong></p>
						</div>
						<div className="details_4_answer">
						<p>{paper.FAQ_MoreThanOneVersion === "" ? "N/A" : paper.FAQ_MoreThanOneVersion}</p>
						</div>
					</div>

					<div className="details_4_qa">
						<div className="details_4_question">
						<p><strong>Compliance Level or Degree?</strong></p>
						</div>
						<div className="details_4_answer">
						<p>{paper.FAQ_ComplianceLevelOrDegree === "" ? "N/A" : paper.FAQ_ComplianceLevelOrDegree}</p>
						</div>
					</div>

					<div className="details_4_qa">
						<div className="details_4_question">
						<p><strong>What are the Stakeholders?</strong></p>
						</div>
						<div className="details_4_answer">
						<p>{paper.FAQ_Stakeholders === "" ? "N/A" : paper.FAQ_Stakeholders}</p>
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
