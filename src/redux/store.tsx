import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slice'
import {poSlice} from './po/poslicer'
import {prSlice} from './pr/prslicer'
import {grnSlice} from './grn/grnslicer'
import {shfSlice} from './shf/shfslicer'
import {irnSlice} from './irn/irnslicer'


export const store = configureStore({
  reducer: {
     counter: counterSlice.reducer,
     poslicer:poSlice.reducer,
     prslicer : prSlice.reducer,
     grnslice : grnSlice.reducer,
     shfSlice: shfSlice.reducer,
     irnSlice: irnSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch