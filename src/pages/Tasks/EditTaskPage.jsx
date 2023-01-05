import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/http';
import TasksForm from '../../components/Tasks/TasksForm';
import { useNavigate } from 'react-router-dom';
import LoadingSpinier from '../UI/LoadingSpiner/LoadingSpinier';

const EditTaskPage = () => {
  const navigate = useNavigate()
  const {isLoading, sendRequest} = useHttp()
  const {id} = useParams()
  const [loadedData, setLoadedData] = useState({})

  useEffect(() => {
    // navigate('/')
    const url = `${process.env.REACT_APP_FIREBASE_DOMAIN}tasks/${id}.json`;
    const convertData = data => {
      if(!data) {
        navigate('/404')
      }
      setLoadedData({...data})
    }
   sendRequest({url, convertData})
  }, [sendRequest, id, navigate]);

  if(isLoading) {
    return <LoadingSpinier />
  }

  return (
    <TasksForm id={id} isLoading={isLoading} {...loadedData}/>
  )
}

export default EditTaskPage