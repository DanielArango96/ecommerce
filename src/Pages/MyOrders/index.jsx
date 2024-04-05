import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Layout from "../../Components/Layout"
import OrdersCard from "../../Components/OrdersCard"
import {ShopiCartContext} from '../../Context'

function MyOrders() {
  const context= useContext(ShopiCartContext)
  console.log (context.order)
    return (
        <Layout>
          <div className='flex  item-center justify-center relative w-80'>
            <h1 className='font-medium text-2xl mb-4'>My Orders</h1>
            </div>
          
          {
            context.order.map((order,index)=>
            <Link key={index} to={`/my-orders/${index}`}> 
            <OrdersCard 
            totalPrice={order.totalPrice}
            totalProducts={order.totalProducts}/>
            </Link>
           
            )
          }
          
          </Layout>
    
  
    )
  }
  
  export default MyOrders