import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Revenue() {
    // DEFAULT REVENUE TO 0
    const [totalRevenue, setTotalRevenue] = useState(0);
    const token = localStorage.getItem('token');
    const getData = async () => {
        // IF TOKEN FOUND, DISPLAY USER REVENUE BASED ON TOKEN
        if (token != null) {
            const resp = await axios.get('http://localhost:5000/revenue', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setTotalRevenue(resp.data);
        }
    }
    // REFRESHING REVENUE ON EVERY RELOAD
    useEffect(() => { getData(); }, []);

    return (
        <div className='container mt-2'>
            <div className="card">
                <div className="card-body ">
                    <h5 className="card-title text-center">TOTAL REVENUE IS {totalRevenue}</h5>
                </div>
            </div>
        </div>
    )
}

export default Revenue