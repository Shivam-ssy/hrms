import React, { useCallback } from "react";
import { collection, getDocs,deleteDoc,doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from '../../BackendAsService/Config.js';
import { Link } from "react-router-dom";
import ViewModal from "../ViewModal";
import ListCard from "../ListCard/ListCard";
import Modal from "../Modal/Modal";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlinePreview } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { RiNotification4Fill } from "react-icons/ri";
import { data } from "./data.js";
import View from "../View/View";

const EmployList = () => {
  const [list, setList] = useState(data);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen,setOpen] =useState(false) //add
  const [modalOpen, setModalOpen] = useState(false);//view
  const [check,setCheck] = useState([])
  const [selectedRole, setSelectedRole] = useState('allroles');

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = list.map((object) => object.id);
      setCheck(allIds);
    } else {
      setCheck([]);
    }
  };
  const handleCheckboxChange = (id) => {
    setCheck((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  
    const handleRoleChange = (event) => {
      // setSelectedRole(event.target.value);

      const selectedValue = event.target.value.toLowerCase(); // Normalize to lowercase
    setSelectedRole(selectedValue);
    };
  



  const onOpen =() =>{
    setOpen(true);
  }
  const onClose =() =>{
    setOpen(false)
  }
  const viewOpen =() =>{
    setModalOpen(true);
  }
  const viewClose =() =>{
    setModalOpen(false)
    setSelectedId(null);
  }

  
  const deleteObject = async (id) => {
    try {
      await deleteDoc(doc(db, "employees", id));
      alert("Removed Member Successfully");
      const updatedObjects = list.filter((object) => object.id !== id);
      setList(updatedObjects);
    } catch (error) {
      console.error("Error removing document: ", error);
      alert("Failed to remove member. Please try again.");
    }
  };

  const openEditModal = (id) => {
    const url = `/edit/${id}`;
    window.open(url, '_blank');
  };


  const handleView = async (id) => {
    try {
      const docSnapshot = await getDoc(doc(db, "employees", id));
      if (docSnapshot.exists()) {
        const viewObject = list.find((object) => object.id === id);
        setSelectedId(viewObject);
        setModalOpen(true); // Open the modal
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
      alert("Error fetching document");
    }
  };


  

  useCallback(() => {
    const getList = async () => {
      try {
        const listRef = collection(db, "employees");
        const listSnapShot = await getDocs(listRef);
        const allList = listSnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setList(allList)
        // console.log(list);
      } catch (error) {
        console.log(error);
        
      }
    };
    getList();
  }, [list]);

  return (
    <>
    <Link to='/'/>
    <div className="flex justify-between mx-5 my-7 border-b-2 ">
      <div>
      <input type="text" className="p-2 border border-gray-500 rounded-md my-2" placeholder="Search"/>
      <select className="border border-gray-500 rounded-md p-2 ml-8" onChange={handleRoleChange} value={selectedRole}>
         <option value="allroles">All Roles</option> {/*//value="allroles" */}
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="Full Stack Developer">Full Stack Developer</option>
      </select>
      </div>
      <div className="flex text-3xl gap-2 mt-5">
      < RiNotification4Fill />
       <RxAvatar/> 
      </div>
    </div>
    <div className="flex justify-between mx-5">
    <h1 className="text-2xl mb-2">Employees</h1>
    <button className="bg-blue-400 text-white p-2 rounded-md font-semibold mb-4 hover:bg-blue-600" onClick={onOpen}>Add Member</button>
    </div>
  <div className="p-5 h-auto bg-gray-100">

    <div className="overflow-auto rounded-lg shadow  md:block">
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
        <tr>
          <th className="w-20 "><input type="checkbox" onChange={handleSelectAll} checked={check.length === list.length} className="mt-2"/></th>
          <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">Sr. No.</th>
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">Name</th>
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">Email</th>
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">Role</th>
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">Number</th>
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">Date</th>
          <th className="w-32 p-3 text-sm font-semibold tracking-wide text-center">Action</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-center">
        {list.filter((item) =>
              selectedRole === 'allroles' ? true : item.role.toLowerCase() === selectedRole
            )
        .map((object,index) => (
        <tr key={object.id} className="bg-white w-full">
          <td className="w-20"><input type="checkbox" checked={check.includes(object.id)} onChange={() => handleCheckboxChange(object.id)} className="mt-2"/></td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
            <a href="#" className="font-bold text-blue-500 hover:underline">{index + 1}</a>
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          {object.name}
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
          <span
            className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{object.email}</span>
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{object.role}</td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{object.number}</td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{object.date}</td>
          <td className="flex justify-center gap-3 mt-3"><MdOutlinePreview onClick={() => handleView(object.id)} className="text-green-400 cursor-pointer"/><FiEdit2 className="text-indigo-400 cursor-pointer" onClick={() => openEditModal(object.id)}/><MdDeleteOutline className="text-red-400 cursor-pointer" onClick={() => deleteObject(object.id)}/></td>
          {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap"><button onClick={() => handleView(object.id)} style={{ background:'lightgreen'}}><FiEdit2 /></button>
            {selectedId === object.id && <View id={selectedId} />}
            <button><MdOutlinePreview/></button>
            <button onClick={() => deleteObject(object.id)} style={{ background:'red'}}><MdDeleteOutline /></button></td> */}

        </tr>
         ))}       
        </tbody>
      </table>
    </div>
  </div>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
        <div className="mr-8 text-balance border pt-1 px-3 rounded-md border-gray-200">
      <label htmlFor="entriesPerPage">Entries per page:</label>
      <select>
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='20'>20</option>
        <option value='50'>50</option>
      </select>
      
    </div>
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <FaAngleLeft aria-hidden="true" className="h-5 w-5" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 focus:z-20 focus:outline-offset-0"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 focus:z-20 focus:outline-offset-0"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <FaAngleRight aria-hidden="true" className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
     {modalOpen && (
        <ViewModal data={selectedId} viewClose={viewClose} />
      )}
    <Modal isOpen={isOpen} onClose={onClose}/> 


    </>
  )
};

export default EmployList;


