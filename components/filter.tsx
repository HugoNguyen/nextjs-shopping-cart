import React, { Component } from 'react'

type FilterProps = {
    count: number,
    sortProducts: (e) => void,
    sort: string,
    filterProducts: (e) => void,
    size: string,
}

export default class Filter extends Component<FilterProps> {
    render() {
        return (<div className="filter">
            <div className="filter-result">{this.props.count} Products</div>
            <div className="filter-sort"> Order {" "}
                <select value={this.props.sort} onChange={this.props.sortProducts}>
                    <option>Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </div>
            <div className="filter-size"> Filter {" "}
                <select value={this.props.size} onChange={this.props.filterProducts}>
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
}