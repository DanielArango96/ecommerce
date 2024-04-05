import { createContext, useState,useEffect } from 'react'

export const ShopiCartContext = createContext ()


export const ShopiCartProvider = ({children}) =>{
    const [count, setCount] = useState(0)

     //Product deatil open close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = ()=> setIsProductDetailOpen(true)
    const closeProductDetail = ()=> setIsProductDetailOpen(false)

    //Product deatil show product
    const [productToShow, setProductToShow] = useState({})
    
    // add products to cart
    const [cartProducts, setCartProducts] = useState([])


    //Checkout Side Menu open close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu= ()=> setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = ()=> setIsCheckoutSideMenuOpen(false)


    //shoping cart order
    const [order, setOrder] = useState([])

    // get products
    const [items, setItems] = useState(null)
    //filtered
    const [filtereditems, setFiltereditems] = useState(null)

    //get products by title
    const [searchByTitle, setSearchByTitle] = useState(null)


    //get products by category
    const [searchByCategory, setSearchByCategory] = useState(null)
    

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(data => setItems (data))
    }, [])

    const filtereditemsByTitle = (items,searchByTitle) =>{
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))

    }
    // const filtereditemsByCategory = (items,searchByCategory) =>{
    //     return items?.filter(item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    const filtereditemsByCategory = (items, searchByCategory) => {
      
        return items?.filter(item => {
            // Verifica si item.category es null antes de acceder a item.category.name
            if (item.category && item.category.name) {
                // Convierte tanto el nombre de la categoría como la búsqueda a minúsculas para hacer coincidir sin distinción entre mayúsculas y minúsculas
                return item.category.name.toLowerCase().includes(searchByCategory.toLowerCase());
            }
            // Si item.category es null o item.category.name es null, devuelve false para excluir este elemento
            return false;
        });
    }

    const filterBy=(searchType,items,searchByTitle,searchByCategory)=>{
        if (searchType==='BY_TITLE'){
           return filtereditemsByTitle(items,searchByTitle)
        }
        if (searchType==='BY_CATEGORY'){
          return  filtereditemsByCategory(items,searchByCategory)
        }

        if (searchType==='BY_TITLE_AND_CATEGORY'){
           return filtereditemsByCategory(items,searchByCategory).filter(item=>item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
        if (!searchType){
            return items
          }

    }
    
    useEffect(() => {
        if(searchByTitle && searchByCategory) setFiltereditems(filterBy('BY_TITLE_AND_CATEGORY ',items,searchByTitle,searchByCategory))
        if(searchByTitle && !searchByCategory) setFiltereditems(filterBy('BY_TITLE',items,searchByTitle,searchByCategory))
        if(!searchByTitle && searchByCategory) setFiltereditems(filterBy('BY_CATEGORY',items,searchByTitle,searchByCategory))
        if(!searchByTitle && !searchByCategory) setFiltereditems(filterBy(null,items,searchByTitle,searchByCategory))
        if(searchByCategory) setFiltereditems(filterBy(items,searchByCategory))
        }, [items,searchByTitle,searchByCategory])
        
        
        // console.log ('searchByTitle' , searchByTitle)
        // console.log ('searchByCategory' , searchByCategory)
        // console.log ('filtereditems' , filtereditems)



    
    return (
        <ShopiCartContext.Provider value={{
            count,
            setCount, 
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow, 
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order, 
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filtereditems,
            searchByCategory,
            setSearchByCategory
        }}> 
            {children}
        </ShopiCartContext.Provider>
        )
       
}