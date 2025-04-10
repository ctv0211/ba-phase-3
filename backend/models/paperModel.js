const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Enums deklarieren
const focusEnum = [
    "Main Focus",
    "Secondary Focus",
    "Mentioned in Future Work",
    "Not Mentioned",
    "Mentioned but not Elaborated"
];

const dataProcessedEnum = ["automatic", "semi-automatic", "manual"];
const natureOfDataEnum = ["synthetic", "real-world"];
const complianceLevelEnum = ["Compliance Level", "Compliance Degree", "Both"];

// Felder die in der DB gespeichert werden
const paperSchema = new Schema({
    year: { type: Number },
    title: { type: String },
    numberOfCitations: { type: Number },
    abstract: { type: String },
    doi: { type: String },
    typeOfPaper: { type: String },
    dataAccessible: { type: Boolean },

    BPC_Task_ComplianceElicitation_Modeling: { type: String, enum: focusEnum },
    BPC_Task_ComplianceElicitation_Extraction: { type: String, enum: focusEnum },
    BPC_Task_ComplianceChecking_Verification: { type: String, enum: focusEnum },
    BPC_Task_ComplianceChecking_EnforcementMonitoring: { type: String, enum: focusEnum },
    BPC_Task_ComplianceChecking_Audit: { type: String, enum: focusEnum },
    BPC_Task_ComplianceAnalysis_Reporting: { type: String, enum: focusEnum },
    BPC_Task_ComplianceAnalysis_Explanation: { type: String, enum: focusEnum },
    BPC_Task_ComplianceEnhancement_Recovery: { type: String, enum: focusEnum },
    BPC_Task_ComplianceEnhancement_Resolution: { type: String, enum: focusEnum },
    BPC_Task_Others: { type: String },

    TypeOfData_RegulatoryDocuments: { type: String },
    TypeOfData_PureTextRequirements: { type: String },
    TypeOfData_InternalPolicies: { type: String },
    TypeOfData_BPModels: { type: String },
    TypeOfData_BPDescription: { type: String },
    TypeOfData_EventLogs: { type: String },
    TypeOfData_FormalizedConstraints: { type: String },
    TypeOfData_SemiformalizedConstraints: { type: String },
    TypeOfData_Others: { type: String },

    FAQ_OtherDataInFuture: { type: String },
    FAQ_DataProcessed: { type: String, enum: dataProcessedEnum },
    FAQ_DataConverter: { type: String },
    FAQ_LimitationsOfDataset: { type: String },
    FAQ_NatureOfData: { type: String, enum: natureOfDataEnum },
    FAQ_MoreThanOneVersion: { type: String },
    FAQ_ComplianceLevelOrDegree: { type: String, enum: complianceLevelEnum },
    FAQ_Stakeholders: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Paper', paperSchema);
