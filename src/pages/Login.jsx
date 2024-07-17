//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useNavigate } from 'react-router-dom';

//import axios
import axios from 'axios';

function Login() {

    //define state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //define state validation
    const [validation, setValidation] = useState([]);

    //define state loading
    const [loading, setLoading] = useState(false);

    //define history
    const history = useNavigate();

    //hook useEffect
    useEffect(() => {

        //check token
        if(localStorage.getItem('token')) {

            //redirect page dashboard
            history('/dashboard');
        }
    }, []);

    //function "loginHanlder"
    const loginHandler = async (e) => {
        e.preventDefault();
        
        //set loading to true
        setLoading(true);

        //initialize formData
        const formData = new FormData();

        //append data to formData
        formData.append('email', email);
        formData.append('password', password);

        //send data to server
        await axios.post('http://localhost:8000/api/auth/login', formData)
        .then((response) => {

            //set token on localStorage
            localStorage.setItem('token', response.data.token);

            //redirect to dashboard
            history('/dashboard');
        })
        .catch((error) => {

            //assign error to state "validation"
            setValidation(error.response.data);
        })
        .finally(() => {

            //set loading to false
            setLoading(false);
        })
    };

    return (
        <div className={`flex items-center justify-center h-screen bg-gray-100 ${loading && 'opacity-75'}`}>
            <div className="w-96">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h4 className="text-black text-2xl font-bold mb-4">HALAMAN LOGIN</h4>
                    <hr/>
                    {
                        validation.message && (
                            <div className="text-red-500 p-2 my-2">
                                {validation.message}
                            </div>
                        )
                    }
                    <form onSubmit={loginHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">ALAMAT EMAIL</label>
                            <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email"/>
                            {
                                validation.email && (
                                    <div className="text-red-500 p-2 my-2">
                                        {validation.email[0]}
                                    </div>
                                )
                            }
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">PASSWORD</label>
                            <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password"/>
                            {
                                validation.password && (
                                    <div className="text-red-500 p-2 my-2">
                                        {validation.password[0]}
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex items-center justify-between">
                            <button type="submit" className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading && 'opacity-50 cursor-not-allowed'}`} disabled={loading}>
                                {loading ? 'LOADING...' : 'LOGIN'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Login;

