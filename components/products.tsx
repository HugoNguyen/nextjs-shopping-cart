import React, { useEffect, useState } from 'react';
import formatCurrency from '../util';
import Link from 'next/link';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart as addToCartAction } from '../actions/cart.action';
import { fetchProducts } from '../actions/product.action';


const Products = () => {
    const dispatch = useDispatch();
    
    const products = useSelector((state: any) => state.products.filteredItems );

    const [selectedProduct, setSelectedProduct] = useState<any>();

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
    }

    const closeModal = () => {
        setSelectedProduct(null);
    }

    return (<>
        <Fade bottom cascade>
            {
                !products 
                    ? <div>Loading...</div>
                    : <ul className="products">
                            {products?.map(product => (
                                <li key={product._id}>
                                    <div className="product">
                                        <a href="#" onClick={() => openModal(product)}>
                                            <img src={product.image} alt={product.title}></img>
                                            <p>
                                                {product.title}
                                            </p>
                                        </a>
                                        
                                        <div className="product-price">
                                            <div>
                                                {formatCurrency(product.price)}
                                            </div>
                                            <button
                                                onClick={() => dispatch(addToCartAction(product))}
                                                className="button primary">
                                                Add To Cart
                                    </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
            }

        </Fade>
        {selectedProduct && <Modal isOpen={true}>
            <Zoom>
                <button className="close-modal" onClick={closeModal}>x</button>
                <div className="product-details">
                    <img src={selectedProduct.image} alt={selectedProduct.title}></img>
                    <div className="product-details-description">
                        <p><strong>{selectedProduct.title}</strong></p>
                        <p>{selectedProduct.description}</p>
                        <p>
                            Available Sizes: {" "}
                            {selectedProduct.availableSizes.map(x => (
                                <span key={x}>{" "} <button className="button">{x}</button></span>
                            ))}
                        </p>
                        <div className="product-price">
                            <div>
                                {formatCurrency(selectedProduct.price)}
                            </div>
                            <button
                                onClick={() => {
                                    dispatch(addToCartAction(selectedProduct))
                                    closeModal();
                                }}
                                className="button primary">
                                Add To Cart
                            </button>
                            <Link href={"/products/" + selectedProduct._id}>
                                <button className="button">Go to detail</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </Zoom>
        </Modal>}
    </>);
}

export default Products;