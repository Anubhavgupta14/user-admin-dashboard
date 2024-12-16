import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import "../styles/users.css"
import { FaPlus } from "react-icons/fa6";
import UserTable from '../components/user-table';
import {allList} from "../api/endpoint"
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate();

    const fetchData = async()=>{
        try{
            const res = await allList();
            setData(res);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])
  return (
    <Layout>
        <div className='user-list'>
            <div className='user-head'>
                <h4 className='main-head'>User Management</h4>
                <button className='primary-btn' onClick={()=>{navigate("/create-new-user")}}><FaPlus/> <span>Create New User</span></button>
            </div>
            <UserTable data={data}/>
        </div>
    </Layout>
  )
}

export default Home