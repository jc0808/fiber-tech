import "./HomeScreen.css";
import ProductCard from "../ProductCard";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { loadProducts, selectProducts } from "../features/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadOrders } from "../features/ordersSlice";



const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState(0);
    const [orders, setOrders] = useState([]);
    const user = useSelector(selectUser);
    const productsStore = useSelector(selectProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {

            const colRef = collection(db, "products");
            const docSnap = await getDocs(colRef);
            const products = [];

            docSnap.forEach(doc => {
                products.push({
                    productId: doc.id,
                    product: doc.data(),
                });

                getDocs(collection(doc.ref, "prices"))
                    .then(r => r)
                    .then(doc => setProducts(products => products.map(product => {

                        const found = doc.docs.filter(p => p.data().product === product?.productId)[0]

                        if (found) {
                            return {
                                ...product,
                                price: {
                                    priceId: found?.id,
                                    price: found?.data().unit_amount
                                }
                            }
                        }

                        return {
                            ...product
                        }

                    })));
            });

            setProducts(products)
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (products.length > 0) {
            dispatch(loadProducts(products));
        }

        if (orders.length > 0) {
            dispatch(loadOrders(orders))
        }
    }, [products, orders, dispatch])


    useEffect(() => {
        if (user?.uid) {
            const getOrders = async () => {
                const colRef = collection(db, `customers/${user.uid}/payments`);

                const docSnap = await getDocs(colRef);

                const orders_data = []

                docSnap.forEach(async item => {
                    if (item.data().status === "succeeded") {
                        orders_data.push({
                            orderId: item.id,
                            created: item.data().created,
                            line_items: item.data().items,
                        })
                    }
                })

                setOrders(orders_data);
            };

            getOrders();
        }
    }, [user, productsStore])

    const displayProducts = () => {

        switch (filter) {
            case 1:
                return products.filter(product => product.product.metadata.type === "computer").map(product => {
                    return (
                        <ProductCard key={product.productId} id={product.productId} name={product.product.name} images={product.product.images} price={product.price?.price} priceId={product.price?.priceId} metadata={product.product.metadata} />
                    )
                });
            case 2:
                return products.filter(product => product.product.metadata.type === "cellphone").map(product => {
                    return (
                        <ProductCard key={product.productId} id={product.productId} name={product.product.name} images={product.product.images} price={product.price?.price} priceId={product.price?.priceId} metadata={product.product.metadata} />
                    )
                });
            case 3:
                return products.filter(product => product.product.metadata.type === "tablet").map(product => {
                    return (
                        <ProductCard key={product.productId} id={product.productId} name={product.product.name} images={product.product.images} price={product.price?.price} priceId={product.price?.priceId} metadata={product.product.metadata} />
                    )
                });
            case 4:
                return products.filter(product => product.product.metadata.type === "accesories").map(product => {
                    return (
                        <ProductCard key={product.productId} id={product.productId} name={product.product.name} images={product.product.images} price={product.price?.price} priceId={product.price?.priceId} metadata={product.product.metadata} />
                    )
                });

            default:
                return products.map(product => {
                    return (
                        <ProductCard key={product.productId} id={product.productId} name={product.product.name} images={product.product.images} price={product.price?.price} priceId={product.price?.priceId} metadata={product.product.metadata} />
                    )
                });

        }
    };


    return (
        <div className="homeScreen">



            <div className="homeScreen_filters">
                <h2 className={filter === 0 ? "select" : null} onClick={() => setFilter(0)}>All</h2>
                <h2 className={filter === 1 ? "select" : null} onClick={() => setFilter(1)}>Computers</h2>
                <h2 className={filter === 2 ? "select" : null} onClick={() => setFilter(2)}>CellPhones</h2>
                <h2 className={filter === 3 ? "select" : null} onClick={() => setFilter(3)}>Tablets</h2>
                <h2 className={filter === 4 ? "select" : null} onClick={() => setFilter(4)}>Accesories</h2>
            </div>


            <div className="homeScreen_container">
                {/* <div className="HomeScreen_brand_filters">
                    <h3>Apple</h3>
                    <h3>Samsung</h3>
                    <h3>LG</h3>
                    <h3>Google</h3>
                </div> */}

                <div className="homeScreen_products_container">
                    {displayProducts()}
                </div>
            </div>
        </div>
    )
};

export default HomeScreen;