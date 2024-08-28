import { doc, getDocs, getDoc, updateDoc, deleteDoc, collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { db, auth } from './Config.js';

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

const updateEmployeeById = async ({ id = null, form }) => {
  try {
    if (!id) return { status: 404, data: null, message: "Please Enter a Valid Id" };

    const docRef = doc(db, 'employees', id);
    await updateDoc(docRef, form);
    return { status: 200, data: null, message: "Data Updated Successfully" };
  } catch (error) {
    console.error('Error updating document:', error);
    return { status: 500, data: null, message: error.code };
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

const createUser = async (formData = null) => {
    try {
      if (!formData || !formData.email || !formData.password) {
        return { status: 404, data: null, message: "Please provide all required fields, including email and password." };
      }
  
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
  
      // Optionally update the user's profile (e.g., displayName)
      if (formData.displayName) {
        await updateProfile(user, {
          displayName: formData.displayName,
        });
      }
  
      // Add the employee data to Firestore (excluding sensitive data like password)
      const employeeData = { ...formData };
      delete employeeData.password;
  
      const docRef = await addDoc(collection(db, 'userID'), { uid: user.uid, ...employeeData });
  
      return { status: 200, data: docRef.id, message: "User created successfully." };
  
    } catch (error) {
      console.error('Error creating User:', error);
      return { status: 500, data: null, message: error.message };
    }
  };
  

export { getEmployeeById, updateEmployeeById, deleteEmployeeById, getEmployeeList, createUser };
