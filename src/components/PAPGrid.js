// src/components/PAPGrid.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const PAPGrid = ({ onSelectPAP }) => {
    const [paps, setPaps] = useState([]);

    useEffect(() => {
        axios.get('/api/paps').then(response => {
            setPaps(response.data); // Expecting an array of PAP names
        });
    }, []);

    return (
        <motion.div
            className="pap-grid"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
        >
            {paps.map((pap, index) => (
                <motion.div
                    key={index}
                    className="pap-item"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectPAP(pap)}
                    style={{
                        backgroundColor: `hsl(${index * 40 % 360}, 70%, 60%)`,
                        cursor: 'pointer',
                        padding: '20px',
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    {pap}
                </motion.div>
            ))}
        </motion.div>
    );
};

export default PAPGrid;
