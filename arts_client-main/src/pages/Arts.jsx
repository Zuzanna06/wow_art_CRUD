import React, {useEffect, useState} from "react"
import axios from "axios";
import {Link} from "react-router-dom";

import Logo from '../components/Logo';

const Arts = () => {
    const [arts, setArts] = useState([])

    useEffect(() => {
        const fetchAllArts = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/arts`)
                
                setArts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllArts()
    }, []);

    const handleDelete = async (id) => {
        try{
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/arts/${id}`)
            window.location.reload()
        } catch (err){
            console.log(err)
        }
    }

    return (
        
        <div>
            <div>
            <Logo />
            </div>

            <h1 className="titre">- Arts gallery - Cabinet de Curiosités -</h1>
            <h2>Galerie de Vente de produits authentiques! </h2>
            <h3>Editions limitées, de collections tendances ou délirantes en mouvement perpétuel. <br />Simplement Chic !!! 
            <Link className="addBtn" to="/add"> Add new Art into wow-arts</Link>
        </h3>
            
            <div className="arts">
                {arts.map(art => (
                    <div className="art" key={art.id}>
                        {art.cover && <img src={art.cover} alt=""/>}
                        <h2 className="">{art.title}</h2>
                        <p className="pDesriptif">{art.desc}</p>
                        <span className="">{art.price}&nbsp;{process.env.REACT_APP_CURRENCY}</span>
                        <div className="link-container">
                        <Link className="delete" to="" onClick={() => handleDelete(art.id)}>Delete</Link>
                        <Link className="update" to={`/update/${art.id}`}>Update</Link>
                        </div>
                    </div>
                ))}
            </div>
            <Link className="addBtn" to="/add">Add new Art into wow-arts</Link>
        </div>
    )
}

export default Arts