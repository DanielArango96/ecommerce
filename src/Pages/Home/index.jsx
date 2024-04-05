import { useContext } from 'react'
import Layout from "../../Components/Layout"
import Card from "../../Components/Card"
import ProductDetail from "../../Components/ProductDetail"
import {ShopiCartContext} from '../../Context'

function Home() {
  const context= useContext(ShopiCartContext)

  const renderView=()=>{
          if (context.filtereditems?.length>0){
        return (
          context.filtereditems?.map((item)=> (
            <Card key={item.id} data={item}/>
        ))
        )
 } else{
        return(
          <div>we don't have anything</div>
        )

 }} 
  

    

    return (
    <Layout>
        <div className='flex  item-center justify-center relative w-80'>
            <h1 className='font-medium text-2xl mb-4'>Exclusive Products</h1>
        </div>
        <input 
        type="text" 
        placeholder='Search a product'
        className='rounded-lg border border-black  w-80 p-4 mb-8'
        value={context.searchByTitle}
        onChange={(event)=> context.setSearchByTitle (event.target.value) } />
        <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'> 
        {renderView()}
        </div>

      
    <ProductDetail/>
    </Layout>
    )
  }


  
  export default Home