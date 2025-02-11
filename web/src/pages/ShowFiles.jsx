import React,{useEffect,useState} from 'react'
import axios from 'axios'


const ShowFiles = () => {
    const [table,setTable]=useState([])
    const fetchData=async()=>{
        try {
          const response=await axios.get("http://localhost:5000/")
          console.log(response.data)
          setTable(response.data.files)
      } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
    useEffect(() => {
        fetchData()
      },[setTable])

        const handleDelete=async(id)=>{
            try {
            const response=await axios.delete(`http://localhost:5000/delete/${id}`)
            console.log(response.data)
            setTable(response.data.files)
        } catch (error) {
            console.error("Error fetching data:", error)
            }
        }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {table && table.map((file) => (
            <tr key={file._id}>
              <td>{file.filename}</td>
              <td><button type='button' className='bg-red-500 w-full h-full rounded-xl' onClick={()=>{handleDelete(file._id)}}>delete</button></td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ShowFiles
