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
    setNatureOfData
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
        {/* Year Range */}
        <div>
          <label className="block font-semibold">Start Year</label>
          <input
            type="number"
            onChange={(e) => setStartYear(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">End Year</label>
          <input
            type="number"
            onChange={(e) => setEndYear(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        <div>
            <label className="block font-semibold mb-1">Nature of Data</label>
            <select
            value={natureOfData}
            onChange={(e) => setNatureOfData(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            >
            <option value="">-</option>
            <option value="Synthetic">Synthetic</option>
            <option value="Real-World">Real World</option>
            </select>
        </div>
  
        {/* Boolean Fields as Checkboxes */}
        <div className="space-y-2">
          {renderCheckbox("Modeling", setModeling)}
          {renderCheckbox("Extraction", setExtraction)}
          {renderCheckbox("Verification", setVerification)}
          {renderCheckbox("Monitoring", setMonitoring)}
          {renderCheckbox("Audit", setAudit)}
          {renderCheckbox("Reporting", setReporting)}
          {renderCheckbox("Explanation", setExplanation)}
          {renderCheckbox("Recovery", setRecovery)}
          {renderCheckbox("Resolution", setResolution)}

          {renderCheckbox("Regulatory Documents", setRegulatoryDocuments)}
          {renderCheckbox("Pure Text Requirements", setPureTextRequirements)}
          {renderCheckbox("Internal Policies", setInternalPolicies)}
          {renderCheckbox("Business Process Models", setBpModels)}
          {renderCheckbox("Business Process Description", setBpDescriptions)}
          {renderCheckbox("Event Logs", setEventLogs)}
          {renderCheckbox("Formalized Contraints", setFormalizedConstraints)}
          {renderCheckbox("Semiformalized Constraints", setSemiformalizedConstraints)}
        </div>
      </div>
    );
  };
  
  export default Filter;
  