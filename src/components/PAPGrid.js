import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchPAPs } from '../api/api';

const PAPGrid = ({ onSelectPAP }) => {
    const [paps, setPaps] = useState([]);

    useEffect(() => {
        fetchPAPs().then(response => {
            setPaps(response.data);
        }).catch(error => {
            console.error("Error fetching PAPS:", error);
        });
    }, []);

    return (
        <motion.div className="pap-grid" initial="hidden" animate="visible">
            {paps.map((pap, index) => (
                <motion.div
                    key={index}
                    className="pap-item"
                    whileHover={{ scale: 1.1 }}
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