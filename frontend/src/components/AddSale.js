import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AddSale() {

    const [Pname, setPname] = useState('');
    const [quantity, setQunatity] = useState('');
    const [price, setPrice] = useState('');
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // CHECKING THE INPUT FIELDS ARE EMPTY OR NOT
        if (!Pname || !quantity || !price) {
            alert('Please fill in all fields.');
            return;
        }
        // ==========================================

        // ADDING PRODUCT USING THE TOKEN
        await axios.post(`${process.env.REACT_APP_API}/addproduct`,
            { Pname, quantity, price },
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
            .then(() => {
                // USING TOASTIFY
                toast.success('Product Added Successfully.', {
                    autoClose: 2000,
                    onClose: () => window.location.reload()
                });
            })
            .catch((error) => {
                toast.error('An error occurred. Please try again later.');
            })
    }

    return (
        <div className='container mt-2'>
            <div className="card">
                <div className="card-body ">
                    <h5 className="card-title  text-center">ADD SALE ENTRY</h5>
                    <form onSubmit={handleSubmit}>
                        <label className='card-text '>Product Name</label>
                        <div className="input-group mb-3">
                            <input value={Pname} onChange={(e) => { setPname(e.target.value) }} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <label className='card-text '>Quantity</label>
                        <div className="input-group mb-3">
                            <input value={quantity} onChange={(e) => { setQunatity(e.target.value) }} type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <label className='card-text '>Amount</label>
                        <div className="input-group mb-3">
                            <input value={price} onChange={(e) => { setPrice(e.target.value) }} type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <div className='d-grid'>
                            <button className='btn btn-warning' type='submit'>Submit</button>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>



        </div>
    )
}

export default AddSale;