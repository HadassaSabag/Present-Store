import { createBrowserRouter } from "react-router-dom";
import HomePage from './components/HomePage';
import ContactUs from './components/ContactUs';
import NotFound from './components/NotFound';
import Layout from "./components/Layout";
import OurStory from "./components/OurStory";
import Store from "./components/Store";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Payment from './components/Payment'
import AfterPayment from "./components/AfterPayment";


const router = createBrowserRouter([
    {element: <Layout/>, children:[
        {path: "/", element: <HomePage/>},
        {path: "/ourStory", element: <OurStory/>},
        {path: "/contact", element: <ContactUs/>},
        {path: "/Payment", element: <Payment/>},
        {path: "/AfterPayment", element: <AfterPayment/>},

        {path: "/store", 
        children:[ 
            { index: true, element: <Store/>},
            { path: ":name", element: <Product/>}
        ]},
        {path: "/cart", element: <Cart/>},
        {path: "*", element: <NotFound/>},
    ]}
]);

export default router