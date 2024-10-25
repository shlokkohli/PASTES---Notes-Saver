import {configureStore} from '@reduxjs/toolkit'
import pastereducer from '../features/paste/pasteSlice'

export const store = configureStore({
    reducer: pastereducer
})