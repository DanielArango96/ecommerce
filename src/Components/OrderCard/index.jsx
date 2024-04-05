import {XMarkIcon } from '@heroicons/react/24/solid'


const OrderCard = props => { 
    const {id,title,imageUrl, price, handleDelete } =props

    let renderXMarckIcon
    if (handleDelete) {
      renderXMarckIcon=<XMarkIcon onClick={()=>handleDelete(id)} className='h-6 w-6 text-black cursor-pointer'></XMarkIcon>
    }
return (
    <div className="flex justify-between items-center mb-20">
        <div className='flex items-center gap-2'>
            <figure className='w-20 h-20'>
                <img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title}/>
                <p className='text-sm font-light'>{title}</p>
            </figure>
        </div>
        <div className='flex items-center gap-2 mb-20'>
            <p  className='text-lg font-medium'>${price}</p>
            {renderXMarckIcon}
        </div>

    </div>
)
}

export default OrderCard