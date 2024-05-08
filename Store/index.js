
import { createContext, useContext, useMemo, useReducer, useState } from 'react'
import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../Database/FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
const MyContext = createContext();
MyContext.displayName = "MyStore";

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, userLogin: action.value }
        case "LOGOUT":
            return { ...state, userLogin: null }
        default: {
            throw new Error("Action not valid");
        }
    }
}

const MyContextControllerProvider = ({ children }) => {
    const initializeState = {
        userLogin: null,
        jobs: []
    }

    const [controller, dispatch] = useReducer(reducer, initializeState);
    const value = useMemo(() => [controller, dispatch], [controller, dispatch])
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}

const useMycontextProvider = () => {
    const context = useContext(MyContext)
    if (!context) {
        return new Error("useMycontextProvider must put in MyContextControllerProvider")
    }
    return context;
}

const USERS = collection(db, "USERS")
const Todos = collection(db, "TODOS")

const CreateAccount = (email, password, fullname) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Create with user and password success");
            var USERDoc = doc(db, "USERS", email);
            setDoc(USERDoc, {
                email,
                password,
                fullname
            }).then(() => console.log("add new document"))
                .catch((e) => console.log(e))

        })
        .catch((e) => console.log(e))
}

const LoginAccount = (dispatch, email, password, fullname) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(
            () => {
                var USERDoc = doc(db, "USERS", email);
                onSnapshot(USERDoc, (
                    user => {
                        if (user.exists) {
                            console.log("Dang Nhap Thanh Cong");
                            dispatch({ type: "USER_LOGIN", value: user.data() })
                        }
                    }
                ))
            }
        )
        .catch((e) => console.log(e))
}

const AddTodo = (name, isDone) => {
    return new Promise((resolve, reject) => {
        addDoc(Todos, {
            name: name,
            isDone: isDone
        }).then(() => console.log("Them thanh cong"))
            .catch((error) => reject(error))
    })
}

const UpdateTodo = ({ id, isDone }) => {
    const todoDoc = doc(db, "TODOS", id)
    return new Promise((resolve, reject) => {
        updateDoc(todoDoc, {
            isDone: !isDone
        }, () => resolve()
            , (error) => reject(error))
    })
}

const GetTotoList = () => {
    return new Promise((resolve, reject) => {
        var todoData = [];
        const TodoDocs = collection(db, "TODOS");
        onSnapshot(TodoDocs, (querySnapshot) => {
            todoData = [];
            querySnapshot.forEach((doc) => {
                const { name, isDone } = doc.data();
                todoData.push({
                    id: doc.id,
                    name: name,
                    isDone: isDone
                });
            });
            resolve(todoData)
        }, (error) => {
            reject(error)
        });
    })
}


const Logout = (dispatch) => {
    signOut(auth).then(() => dispatch({ type: "LOGOUT" }))
}

export {
    MyContextControllerProvider,
    useMycontextProvider,
    CreateAccount,
    LoginAccount,
    Logout,
    GetTotoList,
    AddTodo,
    UpdateTodo
}