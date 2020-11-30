//import styles from '../styles/Home.module.css';
import Products from '../components/products';
import Filter from '../components/filter';
import Cart from '../components/cart';
import { DefaultLayout } from '../_layouts/default';

function Home() {
  return (
    <DefaultLayout title={"Home"}>
      <div className="content">
        <div className="main">
          <Filter />
          <Products />
        </div>
        <div className="sidebar">
          <Cart />
        </div>
      </div>
    </DefaultLayout>
    
  )
}

export default Home;