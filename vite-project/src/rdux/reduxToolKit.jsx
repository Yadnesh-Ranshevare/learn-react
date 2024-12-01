import React from 'react'
import Add from './Add'
import Todos from './Todos'
import { Provider } from 'react-redux'
import {Store} from './Store'

export default function ReduxToolKit() {
  return (
    <Provider store={ Store}>
      <Add/>
      <Todos/>
      
    </Provider>
  )
}
