import { createSlice, nanoid } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import { json } from 'react-router-dom';

const initialState = {
    pastes: localStorage.getItem("mykey") ? JSON.parse(localStorage.getItem("mykey")) : []
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;

            if(!paste.title || !paste.content){
                alert("Write something")
                return;
            }
            state.pastes.push(paste);
            localStorage.setItem("mykey", JSON.stringify(state.pastes));
            toast.success("Paste Created Successfully")
        },

        updateToPastes: (state, action) => {
            const { _id, title, content } = action.payload;
            
            state.pastes = state.pastes.map(eachVal => 
                String(eachVal._id) === _id ? { ...eachVal, title, content } : eachVal  // Convert to string
            );
            
            localStorage.setItem('mykey', JSON.stringify(state.pastes));
            toast.success("Paste Updated");
        },
        

        resetAllPastes: (state, action) => {
            state.pastes = []; // clear the array
            localStorage.setItem('mykey', JSON.stringify([]));
            toast("All Pastes Reset Successfully")
        },

        removeFromPastes: (state, action) => {
            const id = action.payload;
            state.pastes = state.pastes.filter((eachVal) => eachVal._id !== id); // remove the paste with the matching ID
            localStorage.setItem('mykey', JSON.stringify(state.pastes));
            toast.success("Paste Removed Successfull")
        }
        
    }
})

export const { addToPastes, updateToPastes, restAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer