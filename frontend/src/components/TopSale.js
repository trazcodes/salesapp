import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TopSale() {
    const [topSale, setTopSale] = useState([]);
    const token = localStorage.getItem('token')
    const getSale = async () => {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_API}/topsale`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }) 
            // STORING DATA IN TOPSALE ARRAY
            setTopSale(resp.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { getSale(); }, []);

    return (
        <div className='container mt-2'>
            <div className="card">
                <div className="card-body ">
                    <h5 className="card-title text-center">TOP 5 SALES</h5>
                </div>
                <div className='container'>
                    <table className='table  table-striped'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Sales Id</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {/* DISPLAYING THE TOP SALE ARRAY */}
                            {topSale.map((sale, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{sale._id}</td>
                                    <td>{sale.Pname}</td>
                                    <td>{sale.quantity}</td>
                                    <td>Rs. {sale.price}</td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TopSale