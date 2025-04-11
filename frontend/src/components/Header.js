// Diese Component stellt die Header Zeile der Tabelle dar
const Header = () => {
    return (
        <div className="header">
            <div className="header_1">
                <div className="header_title">
                    <p>Title</p>
                </div>
                <div className="header_doi">
                    <p>DOI</p>
                </div>
                <div className="header_year">
                    <p>Year</p>
                </div>
            </div>
            <div className="header_2">
                <div className="header_bpctask">
                    <p>BPC Task</p>
                </div>
                <div className="header_2_category">
                    <div className="header_elicitation">
                        <div className="header_category_top">
                            <p>Compliance Elicitation</p>
                        </div>
                        <div className="header_2_category_bottom">
                            <div className="header_modeling">
                                <p>Modeling</p>
                            </div>
                            <div className="header_extraction">
                                <p>Extraction</p>
                            </div>
                        </div>
                    </div>
                    <div className="header_checking">
                        <div className="header_category_top">
                            <p>Compliance Checking</p>
                        </div>
                        <div className="header_2_category_bottom">
                            <div className="header_verification">
                                <p>Verification</p>
                            </div>
                            <div className="header_monitoring">
                                <p>Monitioring</p>
                            </div>
                            <div className="header_audit">
                                <p>Audit</p>
                            </div>
                        </div>
                    </div>
                    <div className="header_analysis">
                        <div className="header_category_top">
                            <p>Compliance Analysis</p>
                        </div>
                        <div className="header_2_category_bottom">
                            <div className="header_reporting">
                                <p>Reporting</p>
                            </div>
                            <div className="header_explanation">
                                <p>Explanation</p>
                            </div>
                        </div>
                    </div>
                    <div className="header_enhancement">
                        <div className="header_category_top">
                            <p>Compliance Enhancement</p>
                        </div>
                        <div className="header_2_category_bottom">
                            <div className="header_recovery">
                                <p>Recovery</p>
                            </div>
                            <div className="header_resolution">
                                <p>Resolution</p>
                            </div>
                        </div>
                    </div>
                    <div className="header_other">
                        <div className="header_2_category_bottom">
                            <div className="header_other">
                                <p>Other</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header_3">
                <div className="header_typeofdata">
                    <p>Type of Data</p>
                </div>
                <div className="header_3_category">
                    <div className="header_regdocuments">
                        <p>Regulatory Documents</p>
                    </div>
                    <div className="header_puretextreq">
                        <p>Pure Text Requirements</p>
                    </div>
                    <div className="header_internalpolicies">
                        <p>Internal Policies</p>
                    </div>
                    <div className="header_bpmodels">
                        <p>Business Process Models</p>
                    </div>
                    <div className="header_bpdescription">
                        <p>Business Process Description</p>
                    </div>
                    <div className="header_eventlogs">
                        <p>Event Logs</p>
                    </div>
                    <div className="header_formalizedconstraints">
                        <p>Formalized Constraints</p>
                    </div>
                    <div className="header_semiformalizedconstraints">
                        <p>Semi-Formalized Constraints</p>
                    </div>
                    <div className="header_other">
                        <p>Others</p>
                    </div>
                </div>
            </div>
            <div className="header_4">
                <div className="header_4_natureofdata">
                    <p>Nature of Data</p>
                </div>
            </div>
            <div className="header_timestamp">
                <p>Added on</p>
            </div>
        </div>
    )
}

export default Header