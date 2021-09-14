import React, { ReactElement } from 'react'

interface Props {
  
}

export default function MessagesWrapper({}: Props): ReactElement {
  return (
    <div className="flex flex-col w-full">
    <div className="grid h-20 card bg-base-300 rounded-box place-items-center">content</div> 
    <div className="divider">August 25</div> 
    <div className="grid h-20 card bg-base-300 rounded-box place-items-center">content</div>
  </div>
  
  )
}
