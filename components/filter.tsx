import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortProducts, filterProducts } from '../actions/product.action';

const Filter = () => {
    const dispatch = useDispatch();
    const filteredProducts = useSelector((state: any) => state.products.filteredItems);
    const size = useSelector((state: any) => state.products.size);
    const sort = useSelector((state: any) => state.products.sort);
    const products = useSelector((state: any) => state.products.items);

    return (
        !filteredProducts
            ? (<div>Loading...</div>)
            : <div className="filter">
                <div className="filter-result">{filteredProducts.length} Products</div>
                <div className="filter-sort"> Order {" "}
                    <select value={sort} onChange={(e) => dispatch(sortProducts(filteredProducts, e.target.value))}>
                        <option value="latest">Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select>
                </div>
                <div className="filter-size"> Filter {" "}
                    <select value={size} onChange={(e) => dispatch(filterProducts(products, e.target.value))}>
                        <option value="">ALL</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
            </div>
    )
}

export default Filter;