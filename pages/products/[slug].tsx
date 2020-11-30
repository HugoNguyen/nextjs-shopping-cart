import React from 'react';
import formatCurrency from '../../util';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useDispatch } from 'react-redux';
import { addToCart as addToCartAction } from '../../actions/cart.action';
import Cart from '../../components/cart';
import data  from '../../data.json';
import { DefaultLayout } from '../../_layouts/default';

type ProductDetailProps = {
    product: any,
}

const ProductDetail = ({ product }: ProductDetailProps) => {
    const dispatch = useDispatch();

    const detail = (
        <div className="product-details">
            <img src={product.image} alt={product.title}></img>
            <div className="product-details-description">
                <p><strong>{product.title}</strong></p>
                <p>{product.description}</p>
                <p>
                    Available Sizes: {" "}
                    {product.availableSizes.map(x => (
                        <span key={x}>{" "} <button className="button">{x}</button></span>
                    ))}
                </p>
                <div className="product-price">
                    <div>
                        {formatCurrency(product.price)}
                    </div>
                    <button
                        onClick={() => {
                            dispatch(addToCartAction(product));
                        }}
                        className="button primary">
                        Add To Cart
                    </button>
                </div>
            </div>

        </div>
    );

    return (
        <DefaultLayout title={product.title} description={product.description}>
            <div className="content">
                <div className="main">
                    {detail}
                </div>
                <div className="sidebar">
                    <Cart />
                </div>
            </div>
        </DefaultLayout>
        
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: data.products.map(p => ({ params: { slug: p._id }})),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const params = context.params;
    const product = data.products.find(p => p._id === params.slug);

    return {
        props: {
            product,
        }
    }
}

export default ProductDetail;