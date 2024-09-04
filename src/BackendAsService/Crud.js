import { doc, getDocs, query, where, getDoc, updateDoc, deleteDoc, collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { db, auth } from './Config.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from './Config.js';
const getEmployeeById = async ({ id = null }) => {
  try {
    if (!id) return { status: 404, data: null, message: "Please Enter a Valid Id" };

    const docRef = doc(db, 'employees', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return { status: 200, data: data, message: "Data Fetched Successfully" };
    } else {
      return { status: 404, data: null, message: "Data not Found" };
    }
  } catch (error) {
    return { status: 500, data: null, message: error.code };
  }
};
const getEmployeeData=async({uid=null})=>{
  if (!uid) return { status: 404, data: null, message: "Please Enter a Valid Id" };

  const usersCollection = collection(db, "employees"); 
  const q = query(usersCollection, where("uid", "==", uid));

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];  // Get the first document
      const data=doc.data()
      return { status: 200, data: data, message: "Data Fetched Successfully" };
      // Process the data as needed
    } else {
      return { status: 404, data: null, message: error.code };
    }
  } catch (error) {
    return { status: 500, data: null, message: error.code };
  }
}
const updateEmployeeById = async ({ id = null, form }) => {
  try {
    if (!id) {
      return { status: 404, data: null, message: "Please Enter a Valid Id" };
    }

    console.log("Updating data for ID:", id, "with form data:", form);
    const docRef = doc(db, 'employees', id);
    
    await updateDoc(docRef, form);

    // Optionally fetch the updated document
    const updatedDoc = await getDoc(docRef);

    return { 
      status: 200, 
      data: updatedDoc.data(), 
      message: "Data Updated Successfully" 
    };
  } catch (error) {
    console.error('Error updating document:', error);
    return { 
      status: 500, 
      data: null, 
      message: error.code || 'An error occurred' 
    };
  }
};


const deleteEmployeeById = async ({ id = null }) => {
  try {
    if (!id) return { status: 404, data: null, message: "Please Enter a Valid Id" };

    await deleteDoc(doc(db, "employees", id));
    return { status: 200, data: null, message: "Data Deleted Successfully" };
  } catch (error) {
    console.error("Error removing document: ", error);
    return { status: 500, data: null, message: error.code };
  }
};

const getEmployeeList = async () => {
  try {
    const listRef = collection(db, "employees");
    const listSnapShot = await getDocs(listRef);
    const allList = listSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { status: 200, data: allList, message: "Data Fetched Successfully" };
  } catch (error) {
    console.log("Error while fetching the data", error);
    return { status: 500, data: null, message: error.code };
  }
};

const createUser = async ({formData = null, image = null}) => {
  console.log(formData);

  try {
    if (!formData || !formData.email || !formData.password) {
      return { status: 404, data: null, message: "Please provide all required fields, including email and password." };
    }

    // Create the user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    const user = userCredential.user;

    let downloadURL = null;
    
    // Upload image if provided
    if (image) {
      const storageRef = ref(storage, `profileImages/${user.uid}/${image.name}`);
      await uploadBytes(storageRef, image);
      downloadURL = await getDownloadURL(storageRef);
    }

    // Optionally update the user's profile (e.g., displayName, photoURL)
    if (formData.displayName || downloadURL) {
      await updateProfile(user, {
        displayName: formData.displayName || null,
        photoURL: downloadURL || null,
      });
    }

    // Add the employee data to Firestore (excluding sensitive data like password)
    const employeeData = { ...formData };
    delete employeeData.password;
    
    const docRef = await addDoc(collection(db, 'employees'), { uid: user.uid, ...employeeData });

    return { status: 200, data: docRef.id, message: "User created successfully." };

  } catch (error) {
    console.error('Error creating User:', error);
    return { status: 500, data: null, message: error.code };
  }
};
const createPayroll = async ({formData = null,currentuser}) => {
  console.log(formData);

  try {
    if (!formData ) {
      return { status: 404, data: null, message: "Please provide all required fields" };
    }
    console.log(currentuser);
    
    const userDocRef = doc(db, "employees", currentuser.uid);

    // Add the employee data to Firestore (excluding sensitive data like password)
    const payrollData = { ...formData };
    
    const docRef = await addDoc(collection(db, 'payroll'), {userDocRef,  ...payrollData });

    return { status: 200, data: docRef.id, message:"Payroll  created successfully." };

  } catch (error) {
    console.error('Error creating Payroll:', error);
    return { status: 500, data: null, message: error.message };
  }
};
const getPayrollList = async () => {
  try {
    const listRef = collection(db, "payroll");
    const listSnapShot = await getDocs(listRef);
    const allList = listSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { status: 200, data: allList, message: "Data Fetched Successfully" };
  } catch (error) {
    console.log("Error while fetching the data", error);
    return { status: 500, data: null, message: error.code };
  }
};
 

const deletePayrollById = async ({ id = null }) => {
  try {
    if (!id) return { status: 404, data: null, message: "Please Enter a Valid Id" };

    await deleteDoc(doc(db, "payroll", id));
    return { status: 200, data: null, message: "Data Deleted Successfully" };
  } catch (error) {
    console.error("Error removing document: ", error);
    return { status: 500, data: null, message: error.code };
  }
};


export { getEmployeeById, updateEmployeeById, deleteEmployeeById, getEmployeeList, createUser,createPayroll,getPayrollList,deletePayrollById,getEmployeeData };
