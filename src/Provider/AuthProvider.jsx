import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[loading , setLoading] = useState(true);

  const provider = new GoogleAuthProvider();

  // console.log(user)

  

 const createUser = (email,password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password);
 }

 const createGoogleUser = () =>{
    setLoading(true)
    return signInWithPopup(auth,provider);
 }

 const UserLogIn = (email ,password) =>{
    setLoading(true)

    return signInWithEmailAndPassword( auth , email ,password);

 }
 const userLogOut = () => {
    return signOut(auth);
  }


  const updateUserProfile = (updateData) =>{
    return updateProfile(auth.currentUser , updateData);
  }

  const resetPass = (email) => {

    return sendPasswordResetEmail(auth,email);

  }

  const authInfo = { 
    user,
    setUser,
    createUser,
    userLogOut,
    UserLogIn,
    createGoogleUser,
    loading,
    updateUserProfile,
    resetPass

  };

  

  useEffect(() =>{
    const unSubscribe = onAuthStateChanged( auth, currentUser =>{
        setUser(currentUser);
        setLoading(false)
    })

    return () =>{
        unSubscribe();
    }
  },[])

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
