// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart';
import { motion } from 'framer-motion';

const Dashboard = ({ selectedPAP }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (selectedPAP) {
            axios.get(`/api/data/${selectedPAP}`).then(response => {
                setData(response.data);
            });
        }
    }, [selectedPAP]);

    return (
        <motion.div
            className="dashboard"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {data ? (
                <div>
                    <h2>Data for {selectedPAP}</h2>
                    <Chart data={data} />
                </div>
            ) : (
                <p>Please select a PAP to view data</p>
            )}
        </motion.div>
    );
};

export default Dashboard;
