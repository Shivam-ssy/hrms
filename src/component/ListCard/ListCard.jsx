import React from 'react'
import './ListCard.css'

const ListCard = ({object,deleteObject}) => {
  return (
    <>
            <table className="list_table">
           
   <tr key={object.id}>
    <td>{object.name}</td>
    <td>{object.email}</td>
    <td>{object.role}</td>
    <td>{object.number}</td>
    <td>{object.date}</td>
    <td>view<span style={{cursor:'pointer',color:'red'}} onClick={() => deleteObject(object.id)}>delete</span></td>
  </tr>
            </table>
    </>
  )
}

export default ListCard


