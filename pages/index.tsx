//import styles from '../styles/Home.module.css';
import Products from '../components/products';
import Filter from '../components/filter';
import Cart from '../components/cart';
import data from '../data.json';

export default function Home() {
  return (
    <div className="content">
      <div className="main">
        <Filter
          count={data.products.length}
          sort={""} 
          size={""} filterProducts={(e) => console.log(e.target.value)} sortProducts={(e) => console.log(e.target.value)} />
        <Products products={data.products} />
      </div>
      <div className="sidebar">
        <Cart
          cartItems={[]}
          removeFromCart={(item) => console.log(`remove item ${item._id}`)}
        />
      </div>
    </div>
  )
}
