//import React, { useEffect, useState } from "react";
//import { fetchActivityLogs, downloadActivityLogs } from "../../services/backendAPI";
//import { Button } from "@mui/material"; // Material-UI Button for styling
//import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

//const AdminActivityLogPage: React.FC = () => {
//    const [logs, setLogs] = useState<string[]>([]);
//    const [loading, setLoading] = useState<boolean>(true);
//    const navigate = useNavigate(); // Initialize the navigate function

//    useEffect(() => {
//        const getLogs = async () => {
//            setLoading(true);
//            const fetchedLogs = await fetchActivityLogs();
//            setLogs(fetchedLogs);
//            setLoading(false);
//        };
//        getLogs();
//    }, []);

//    if (loading) {
//        return <div>Loading logs...</div>;
//    }

//    return (
//        <div>
//            <div
//                style={{
//                    display: "flex",
//                    justifyContent: "space-between",
//                    alignItems: "center",
//                    marginBottom: "20px",
//                    position: "sticky",
//                    top: 0,
//                    backgroundColor: "#121212",
//                    zIndex: 1000,
//                    padding: "10px 0"
//                }}
//            >
//                <Button
//                    variant="outlined"
//                    color="primary"
//                    onClick={() => navigate(-1)} // Navigate to the previous page
//                    style={{ marginLeft: '10px' }} // Ensure slight margin from the edge
//                >
//                    Back
//                </Button>
//                <Button
//                    variant="contained"
//                    color="primary"
//                    onClick={() => {
//                        console.log("Download button clicked");
//                        downloadActivityLogs();
//                    }}
//                    style={{ marginRight: '10px' }} // Ensure slight margin from the edge
//                >
//                    Download Activity Logs
//                </Button>
//            </div>
//            <ul>
//                {logs.map((log, index) => (
//                    <li key={index}>{log}</li>
//                ))}
//            </ul>
//        </div>
//    );
//};

//export default AdminActivityLogPage;

import React, { useEffect, useState } from "react";
import { fetchActivityLogs, downloadActivityLogs } from "../../services/backendAPI";
import { Button } from "@mui/material"; // Material-UI Button for styling
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const AdminActivityLogPage: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        const getLogs = async () => {
            setLoading(true);
            const fetchedLogs = await fetchActivityLogs();
            setLogs(fetchedLogs);
            setLoading(false);
        };
        getLogs();
    }, []);

    if (loading) {
        return <div>Loading logs...</div>;
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#121212",
                    zIndex: 1000,
                    padding: "10px 0"
                }}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(-1)} // Navigate to the previous page
                    style={{ marginLeft: '10px' }} // Ensure slight margin from the edge
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        console.log("Download button clicked");
                        downloadActivityLogs();
                    }}
                    style={{ marginRight: '10px' }} // Ensure slight margin from the edge
                >
                    Download Activity Logs
                </Button>
            </div>
            <ul style={{ textAlign: 'left' }}> {/* Align list items to the left */}
                {logs.map((log, index) => (
                    <li key={index}>{log}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminActivityLogPage;
