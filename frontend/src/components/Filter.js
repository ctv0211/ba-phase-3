const Filter = ({
    setStartYear,
    setEndYear,
    setModeling,
    setExtraction,
    setVerification,
    setMonitoring,
    setAudit,
    setReporting,
    setExplanation,
    setRecovery,
    setResolution,

    setRegulatoryDocuments,
    setPureTextRequirements,
    setInternalPolicies,
    setBpModels,
    setBpDescriptions,
    setEventLogs,
    setFormalizedConstraints,
    setSemiformalizedConstraints,

    natureOfData,
    setNatureOfData,

    setSearchTerm
  }) => {
    const renderCheckbox = (label, onChangeHandler) => (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          onChange={(e) => onChangeHandler(e.target.checked)}
          className="w-4 h-4"
          id={label}
        />
        <label htmlFor={label} className="font-medium">{label}</label>
      </div>
    );
  
    return (
      <div className="filter_container space-y-4 p-4 bg-gray-100 rounded-xl">

        <div className="filter_search">
          <label className="block font-semibold mb-1"></label>
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by DOI"
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        <hr />

        {/* Year Range */}
        <div className="filter_years">
          <div>
            <label className="block font-semibold">Start Year </label>
            <input
              type="number"
              onChange={(e) => setStartYear(Number(e.target.value))}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <p>-</p>
          <div>
            <label className="block font-semibold">End Year </label>
            <input
              type="number"
              onChange={(e) => setEndYear(Number(e.target.value))}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        </div>

        <hr />
<div className="filter_left_right">
<div className="filter_left">
  
        {/* Boolean Fields as Checkboxes */}
        <div className="filter_bpctask">
          <h3>BPC Task</h3>
          <h4>Compliance Elicitation</h4>
          {renderCheckbox("Modeling", setModeling)}
          {renderCheckbox("Extraction", setExtraction)}
          <h4>Compliance Checking</h4>
          {renderCheckbox("Verification", setVerification)}
          {renderCheckbox("Monitoring", setMonitoring)}
          <h4>Compliance Analysis</h4>
          {renderCheckbox("Audit", setAudit)}
          {renderCheckbox("Reporting", setReporting)}
          {renderCheckbox("Explanation", setExplanation)}
          <h4>Compliance Enhancement</h4>
          {renderCheckbox("Recovery", setRecovery)}
          {renderCheckbox("Resolution", setResolution)}
        </div>
</div>

<div className="filter_right">
        <div className="filter_datatype">
          <h3>Dataset Type</h3>
          {renderCheckbox("Regulatory Documents", setRegulatoryDocuments)}
          {renderCheckbox("Pure Text Requirements", setPureTextRequirements)}
          {renderCheckbox("Internal Policies", setInternalPolicies)}
          {renderCheckbox("Business Process Models", setBpModels)}
          {renderCheckbox("Business Process Description", setBpDescriptions)}
          {renderCheckbox("Event Logs", setEventLogs)}
          {renderCheckbox("Formalized Contraints", setFormalizedConstraints)}
          {renderCheckbox("Semiformalized Constraints", setSemiformalizedConstraints)}
        </div>

        <hr />

        <div>
            <label className="block font-semibold mb-1">Nature of Data </label>
            <select
            value={natureOfData}
            onChange={(e) => setNatureOfData(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            >
            <option value="not relevant">-</option>
            <option value="synthetic">Synthetic</option>
            <option value="real-World">Real World</option>
            <option value="both">Both</option>
            </select>
        </div>

</div>
</div>

        <hr />
      </div>
    );
  };
  
  export default Filter;
  