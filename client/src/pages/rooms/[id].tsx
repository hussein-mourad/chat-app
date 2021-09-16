import  { ReactElement } from 'react'
import {MainLayout} from "../../components"

interface Props {
  
}

export default function Room({}: Props): ReactElement {
  return (
    <div>
      <MainLayout title={"Front-end development"}>
      </MainLayout>  
    </div>
  )
}
