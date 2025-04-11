// Konkrete Kommunikation zwischen Backend und Database

// importiere Schema, um mit der Paper Tabelle zu interagieren (create, update, ...)
const Paper = require('../models/paperModel')
// mongoose für ID checks
const mongoose = require('mongoose')

// GET all papers
const getPapers = async (req, res) => {
    // find all and sort by descening order
    const papers = await Paper.find({}).sort({createdAt: -1})

    res.status(200).json(papers)
}

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

    try {
        const paper = await Paper.create({
            year,
            title,
            numberOfCitations,
            abstract,
            doi: cleanedDOI,
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
        });

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