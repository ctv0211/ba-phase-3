// Konkrete Kommunikation zwischen Backend und Database

// importiere Schema, um mit der Paper Tabelle zu interagieren (create, update, ...)
const Paper = require('../models/paperModel')
// mongoose für ID checks
const mongoose = require('mongoose')

// GET all papers
const getPapers = async (req, res) => {
    try {
      const papers = await Paper.find({}).sort({ year: -1, title: 1 });
      res.status(200).json(papers);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch papers' });
    }
  };

// GET paper by id
const getPaperById = async (req, res) => {
    // id feld von Parametern ("/:id in Adresszeile/Pfad) extrahieren
    const {id} = req.params

    // Check ob die ID valide ist (sagt nicht aus, ob ein Objekt mit dieser Id existiert, sorgt nur dafür, dass der Server nicht crasht)
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Paper found!"})
    }

    // find correct paper by id
    const paper = await Paper.findById(id)

    if (!paper) {
        return res.status(404).json({error: "No such Paper found!"})
    }

    res.status(200).json(paper)
}

// POST (create) new paper
const createPaper = async (req, res) => {
    // Extract all attributes from the request body
    const {
        year,
        title,
        numberOfCitations,
        abstract,
        doi,
        typeOfPaper,
        dataAccessible,
        BPC_Task_ComplianceElicitation_Modeling,
        BPC_Task_ComplianceElicitation_Extraction,
        BPC_Task_ComplianceChecking_Verification,
        BPC_Task_ComplianceChecking_EnforcementMonitoring,
        BPC_Task_ComplianceChecking_Audit,
        BPC_Task_ComplianceAnalysis_Reporting,
        BPC_Task_ComplianceAnalysis_Explanation,
        BPC_Task_ComplianceEnhancement_Recovery,
        BPC_Task_ComplianceEnhancement_Resolution,
        BPC_Task_Others,
        TypeOfData_RegulatoryDocuments,
        TypeOfData_PureTextRequirements,
        TypeOfData_InternalPolicies,
        TypeOfData_BPModels,
        TypeOfData_BPDescription,
        TypeOfData_EventLogs,
        TypeOfData_FormalizedConstraints,
        TypeOfData_SemiformalizedConstraints,
        TypeOfData_Others,
        FAQ_OtherDataInFuture,
        FAQ_DataProcessed,
        FAQ_DataConverter,
        FAQ_LimitationsOfDataset,
        FAQ_NatureOfData,
        FAQ_MoreThanOneVersion,
        FAQ_ComplianceLevelOrDegree,
        FAQ_Stakeholders
    } = req.body;

    // omit "https://doi.org/" from doi
    let cleanedDOI = doi
    if (doi?.trim().toLowerCase().startsWith("https://doi.org/")) {
        cleanedDOI = doi.replace(/^https:\/\/doi\.org\//i, "");
    }

    if (!cleanedDOI) {
        cleanedDOI = "[no DOI found]"
      }

    // prüfe ob doi bereits vorkommt
    const existing = await Paper.findOne({ doi: cleanedDOI });
    console.log("existing", existing)
    if (existing) {
        res.status(400).json({ error: `Paper with DOI '${cleanedDOI}' already exists.` });
        // da die doi bereits vorkommt (kann auch leer sein) prüfe ob Titel bereits vorkommt
        const existingTitle = await Paper.findOne({ title: title });
        console.log("existingTitle", existingTitle)
        if (existingTitle) {
            return res.status(400).json({ error: `Paper with Title '${title}' already exists.` });
        }
    }

    // Hilfsfunktion zur Normalisierung
  const normalize = (val) => typeof val === 'string' ? val.trim().toLowerCase() : val;
  const removeQuotesAndNormalize = (val) => {
    if (typeof val !== 'string') return val;
  
    const cleaned = val.replace(/^"(.*)"$/, '$1').trim().toLowerCase();
  
    if (cleaned === 'true') return true;
    if (cleaned === 'false') return false;
  
    return cleaned;
  };

  // Paper-Objekt mit normalisierten Enum-Werten
  const processedEntry = {
    year,
    title,
    numberOfCitations,
    abstract,
    doi: cleanedDOI,
    typeOfPaper,
    dataAccessible: removeQuotesAndNormalize(dataAccessible),
    BPC_Task_ComplianceElicitation_Modeling: normalize(BPC_Task_ComplianceElicitation_Modeling),
    BPC_Task_ComplianceElicitation_Extraction: normalize(BPC_Task_ComplianceElicitation_Extraction),
    BPC_Task_ComplianceChecking_Verification: normalize(BPC_Task_ComplianceChecking_Verification),
    BPC_Task_ComplianceChecking_EnforcementMonitoring: normalize(BPC_Task_ComplianceChecking_EnforcementMonitoring),
    BPC_Task_ComplianceChecking_Audit: normalize(BPC_Task_ComplianceChecking_Audit),
    BPC_Task_ComplianceAnalysis_Reporting: normalize(BPC_Task_ComplianceAnalysis_Reporting),
    BPC_Task_ComplianceAnalysis_Explanation: normalize(BPC_Task_ComplianceAnalysis_Explanation),
    BPC_Task_ComplianceEnhancement_Recovery: normalize(BPC_Task_ComplianceEnhancement_Recovery),
    BPC_Task_ComplianceEnhancement_Resolution: normalize(BPC_Task_ComplianceEnhancement_Resolution),
    BPC_Task_Others,
    TypeOfData_RegulatoryDocuments,
    TypeOfData_PureTextRequirements,
    TypeOfData_InternalPolicies,
    TypeOfData_BPModels,
    TypeOfData_BPDescription,
    TypeOfData_EventLogs,
    TypeOfData_FormalizedConstraints,
    TypeOfData_SemiformalizedConstraints,
    TypeOfData_Others,
    FAQ_OtherDataInFuture,
    FAQ_DataProcessed: normalize(FAQ_DataProcessed),
    FAQ_DataConverter,
    FAQ_LimitationsOfDataset,
    FAQ_NatureOfData: normalize(FAQ_NatureOfData),
    FAQ_MoreThanOneVersion,
    FAQ_ComplianceLevelOrDegree: normalize(FAQ_ComplianceLevelOrDegree),
    FAQ_Stakeholders
  };

    try {
        const paper = await Paper.create(processedEntry);
        res.status(200).json(paper);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE paper by id
const deletePaperById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Paper found!"})
    }

    const paper = await Paper.findOneAndDelete({_id: id})

    if (!paper) {
        return res.status(404).json({error: "No such Paper found!"})
    }

    res.status(200).json(paper)
}

// DELETE all papers
const deleteAllPapers = async (req, res) => {
    try {
        const result = await Paper.deleteMany({});
        res.status(200).json({ message: "All papers deleted", deletedCount: result.deletedCount });
    } catch (error) {
        console.error("Error deleting all papers:", error);
        res.status(500).json({ error: "Failed to delete all papers" });
    }
};

// UPDATE paper by id
const updatePaperById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Paper found!"})
    }

    // ... ist Array/Object Destrucutring: [a, b, c]
    const paper = await Paper.findOneAndUpdate({_id: id}, {
        ...req.body   //alles was im request body steht wird geupdatet (wenn id übereinstimmt)
    })

    if (!paper) {
        return res.status(404).json({error: "No such Paper found!"})
    }

    res.status(200).json(paper)
}

module.exports = {
    getPapers,
    getPaperById,
    createPaper,
    deletePaperById,
    deleteAllPapers,
    updatePaperById
}