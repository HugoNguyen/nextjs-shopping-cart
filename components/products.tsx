import React, { Component } from 'react';
import formatCurrency from '../util';
import Link from 'next/link';

type ProductsProps = {
    products: any[]
}

export default class Products extends Component<ProductsProps> {
    render() {
        return (
            <div>
                <ul className="products">
                    {this.props.products.map(product => (
                        <li key={product._id}>
                            <div className="product">
                                <Link href={"/products/" + product._id}>
                                    <a>
                                        <img src={product.image} alt={product.title}></img>
                                        <p>
                                            {product.title}
                                        </p>
                                    </a>
                                </Link>
                                <div className="product-price">
                                    <div>
                                        {formatCurrency(product.price)}
                                    </div>
                                    <button className="button primary">
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}