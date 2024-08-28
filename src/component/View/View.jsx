import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // Import Firebase functions
import { db } from "../../BackendAsService/Config"; // Import your Firebase config
import './View.css'
import { RxAvatar } from "react-icons/rx";

const View = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "employees", id); // Reference to the document
        const docSnap = await getDoc(docRef); // Fetch the document

        if (docSnap.exists()) {
          setData(docSnap.data()); // Set the document data to state
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
    <div className='w-[70vw] h-[70vh] bg-gray-200 rounded-lg mx-auto mt-[10vh]'>
     <div className='flex justify-between mx-20'>
      <RxAvatar className='text-9xl '/>
      <div className='text-center'>
        <label htmlFor="name">Name</label>
        <p className='bg-red-300'>Name1</p>
        <label htmlFor="name">Name</label>
        <p>Name2</p>
        <label htmlFor="name">Name</label>
        <p>Name3</p>
        <label htmlFor="name">Name</label>
        <p>Name4</p>
        <label htmlFor="name">Name</label>
        <p>Name5</p>
        <label htmlFor="name">Name</label>
        <p>Name6</p>
      </div>
     </div>
    </div>
    </>
  );
};

export default View;



// <div className="view-container">
//     <div className="view-header">Viewing Details for ID: {data?.id}</div>
    
//     {data ? (
//       <div className="view-content">
//         <div className="view-content-item">
//           <p>Name: {data.name}</p>
//         </div>
//         <div className="view-content-item">
//           <p>Email: {data.email}</p>
//         </div>
//         <div className="view-content-item">
//           <p>Role: {data.role}</p>
//         </div>
//         <div className="view-content-item">
//           <p>Date: {data.date}</p>
//         </div>
//         <div className="view-content-item">
//           <p>Number: {data.number}</p>
//         </div>
//         {/* Add more fields as necessary */}
//       </div>
//     ) : (
//       <p>Loading data...</p>
//     )}
//   </div>
