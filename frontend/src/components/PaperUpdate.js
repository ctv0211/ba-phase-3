import { useState, useEffect } from 'react';

const focusEnum = [
  "Main Focus",
  "Secondary Focus",
  "Mentioned in Future Work",
  "Not Mentioned",
  "Mentioned but not Elaborated",
  "Mentioned not Elab"
];

const dataProcessedEnum = ["automatic", "semi-automatic", "manual"];
const natureOfDataEnum = ["synthetic", "real-world"];
const complianceLevelEnum = ["Compliance Level", "Compliance Degree", "Both"];

const PaperUpdate = ({ paper }) => {
  const [form, setForm] = useState({});

  // When paper prop is available, populate the form state
  useEffect(() => {
    if (paper) {
      setForm({ ...paper });
    }
  }, [paper]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', form);

    try {
      const res = await fetch(`/api/papers/${paper._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

    } catch (err) {
      alert('Error: ' + err.message);
    }
    window.location.reload();
  };

  const renderSelect = (label, name, options) => (
    <div>
      <label>{label}</label><br />
      <select name={name} value={form[name] || ''} onChange={handleChange}>
        <option value="">-</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  return (
    <form className='form' onSubmit={handleSubmit}>
        <h2>Update General Fields</h2>
    
        <div className='update_general'>
            <label>Year published</label><input type="number" name="year" placeholder="Year" value={form.year || ''} onChange={handleChange} />
            <label>Title</label><input type="text" name="title" placeholder="Title" value={form.title || ''} onChange={handleChange} />
            <label># citations</label><input type="number" name="numberOfCitations" placeholder="Number of Citations" value={form.numberOfCitations || ''} onChange={handleChange} />
            <label>Abstract</label><textarea name="abstract" placeholder="Abstract" value={form.abstract || ''} onChange={handleChange} />
            <label>DOI</label><input type="text" name="doi" placeholder="DOI" value={form.doi || ''} onChange={handleChange} />
            <label>Type of paper</label><input type="text" name="typeOfPaper" placeholder="Type of Paper" value={form.typeOfPaper || ''} onChange={handleChange} />
            <label>
                <input type="checkbox" name="dataAccessible" checked={form.dataAccessible || false} onChange={handleChange} />
                Data Accessible
            </label>
        </div>

      <hr />

      <h2>Update BPC_Task Fields</h2>

      {/* Enum Fields */}
      <div className='update_bpc'>
        <div className='update_bpc_1'>
            {renderSelect("Modeling", "BPC_Task_ComplianceElicitation_Modeling", focusEnum)}
            {renderSelect("Extraction", "BPC_Task_ComplianceElicitation_Extraction", focusEnum)}
            {renderSelect("Verification", "BPC_Task_ComplianceChecking_Verification", focusEnum)}
            {renderSelect("Monitoring", "BPC_Task_ComplianceChecking_EnforcementMonitoring", focusEnum)}
            {renderSelect("Audit", "BPC_Task_ComplianceChecking_Audit", focusEnum)}
        </div>
        <div className='update_bpc_2'>
            {renderSelect("Reporting", "BPC_Task_ComplianceAnalysis_Reporting", focusEnum)}
            {renderSelect("Explanation", "BPC_Task_ComplianceAnalysis_Explanation", focusEnum)}
            {renderSelect("Recovery", "BPC_Task_ComplianceEnhancement_Recovery", focusEnum)}
            {renderSelect("Resolution", "BPC_Task_ComplianceEnhancement_Resolution", focusEnum)}
        </div>
      </div>
      <label>Others</label><input type="text" name="BPC_Task_Others" placeholder="Other BPC Task" value={form.BPC_Task_Others || ''} onChange={handleChange} />

      <hr />


        <h2>Update Type of Data Fields</h2>
      {/* Type of Data */}
      <div className='update_typeofdata'>
        <label>Regulatory Documents</label><input type="text" name="TypeOfData_RegulatoryDocuments" placeholder="Regulatory Documents" value={form.TypeOfData_RegulatoryDocuments || ''} onChange={handleChange} />
        <label>Pure Text Requirements</label><input type="text" name="TypeOfData_PureTextRequirements" placeholder="Pure Text Requirements" value={form.TypeOfData_PureTextRequirements || ''} onChange={handleChange} />
        <label>Internal Policies</label><input type="text" name="TypeOfData_InternalPolicies" placeholder="Internal Policies" value={form.TypeOfData_InternalPolicies || ''} onChange={handleChange} />
        <label>Business Process Models</label><input type="text" name="TypeOfData_BPModels" placeholder="BP Models" value={form.TypeOfData_BPModels || ''} onChange={handleChange} />
        <label>Business Process Description</label><input type="text" name="TypeOfData_BPDescription" placeholder="BP Description" value={form.TypeOfData_BPDescription || ''} onChange={handleChange} />
        <label>Event Logs</label><input type="text" name="TypeOfData_EventLogs" placeholder="Event Logs" value={form.TypeOfData_EventLogs || ''} onChange={handleChange} />
        <label>Formalized Constraints</label><input type="text" name="TypeOfData_FormalizedConstraints" placeholder="Formalized Constraints" value={form.TypeOfData_FormalizedConstraints || ''} onChange={handleChange} />
        <label>Semiformalized Constraints</label><input type="text" name="TypeOfData_SemiformalizedConstraints" placeholder="Semiformalized Constraints" value={form.TypeOfData_SemiformalizedConstraints || ''} onChange={handleChange} />
        <label>Others</label><input type="text" name="TypeOfData_Others" placeholder="Other Type of Data" value={form.TypeOfData_Others || ''} onChange={handleChange} />
      </div>

      <hr />

        <h2>Update FaQ Fields</h2>
      {/* FAQ */}
      <div className='update_faq'>
        <label>Other data in future?</label><input type="text" name="FAQ_OtherDataInFuture" placeholder="Future Data Plans" value={form.FAQ_OtherDataInFuture || ''} onChange={handleChange} />
        {renderSelect("How was the data processed?", "FAQ_DataProcessed", dataProcessedEnum)}
        <label>Data Converter?</label><input type="text" name="FAQ_DataConverter" placeholder="Data Converter" value={form.FAQ_DataConverter || ''} onChange={handleChange} />
        <label>Limitations?</label><input type="text" name="FAQ_LimitationsOfDataset" placeholder="Limitations" value={form.FAQ_LimitationsOfDataset || ''} onChange={handleChange} />
        {renderSelect("Nature of Data", "FAQ_NatureOfData", natureOfDataEnum)}
        <label>More than one version?</label><input type="text" name="FAQ_MoreThanOneVersion" placeholder="Multiple Versions?" value={form.FAQ_MoreThanOneVersion || ''} onChange={handleChange} />
        {renderSelect("Compliance Level or Degree", "FAQ_ComplianceLevelOrDegree", complianceLevelEnum)}
        <label>Stakeholders?</label><input type="text" name="FAQ_Stakeholders" placeholder="Stakeholders" value={form.FAQ_Stakeholders || ''} onChange={handleChange} />
      </div>

      <button className='insert_data' type="submit">Update Paper</button>
    </form>
  );
};

export default PaperUpdate;
