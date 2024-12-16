import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import "../styles/users.css"
import { FaPlus } from "react-icons/fa6";
import UserTable from '../components/user-table';
import {toast} from "sonner"
import {allList, deleteUser} from "../api/endpoint"
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationPopup from '../components/delete-popup';


const Home = () => {
    const [data, setData] = useState([])
    const [isDelete, setIsDelete] = useState(null)
    const [loading, setLoading] = useState(false)
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

    const onDelete = async(id)=>{
        setLoading(true)
        try{
            const res = await deleteUser(id);
            if(res.success){
                setIsDelete(null)
                setData(prevData => prevData.filter(user => user._id !== id))
                toast.success("User Deleted Successfully")
            }
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

  return (
    <Layout>
        <div className='user-list'>
            <div className='user-head'>
                <h4 className='main-head'>User Management</h4>
                <button className='primary-btn' onClick={()=>{navigate("/create-new-user")}}><FaPlus/> <span>Create New User</span></button>
            </div>
            <UserTable data={data} setIsDelete={setIsDelete} />
        </div>
        {isDelete && <DeleteConfirmationPopup loading={loading} isOpen={isDelete} onClose={()=>setIsDelete(null)} onConfirm={onDelete}/>}
    </Layout>
  )
}

export default Home