import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, updateProfile } from "firebase/auth";
import { signOut } from "firebase/auth";
import {auth,app,storage} from "./Config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const signup=async ({name,email,password,image})=>{
    try {
       const user= await createUserWithEmailAndPassword(auth, email, password)
       await updateProfile(user.user,{displayName:name})
      console.log("log at sign",image);
      

       const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}/${image.name}`);
       await uploadBytes(storageRef, image);
       const downloadURL = await getDownloadURL(storageRef);
       await updateProfile(user.user, { photoURL: downloadURL });
      console.log(user);
      
       return user
      } catch (error) {
        const err=error
        console.log(error)
        return err.code

      }
}

const signin=async ({email,password})=>{
    try {
       const user= await signInWithEmailAndPassword(auth, email, password) 
          return user   
      } catch (error) {
        const err=error
        return err
      }
}
const logout=async()=>{
  try {
    localStorage.clear("user");
    await signOut(auth);
    return true
  } catch (error) {
    console.error("Error logging out: ", error);
    return false
  }
}

const getCurrentUser = async()=>{
    const auth= await getAuth(app)
    console.log("at service ",auth.currentUser);
    return auth.currentUser

}



export {signin,signup,logout,getCurrentUser}