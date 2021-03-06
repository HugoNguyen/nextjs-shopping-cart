import React, { useEffect, useState } from 'react'
import formatCurrency from '../util';
import Modal from 'react-modal';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder as createOrderAction, clearOrder as clearOrderAction } from '../actions/order.action';
import { removeFromCart as removeFromCartAction } from '../actions/cart.action';


type Order = {
    _id?: string,
    email: string,
    name: string,
    address: string,
    showCheckout: boolean,
    createdAt: Date,
    total: number,
    cartItems: any[],
}

type OrderInfo = {
    email: string,
    name: string,
    address: string,
    showCheckout: boolean,
}

export const Cart = () => {

    const dispatch = useDispatch();

    const order = useSelector((state: any) => state.order.order);

    const cartItems = useSelector((state: any) => state.cart.cartItems) || [];

    const [orderInfo, setOrderInfo] = useState<OrderInfo>({
        email: "",
        name: "",
        address: "",
        showCheckout: false,
    });

    const handleInput = (e) => {
        setOrderInfo(c => ({ ...c, [e.target.name]: e.target.value }));
    }

    const createOrder = (e) => {
        e.preventDefault();
        const newOrder: any = {
            ...orderInfo,
            total: cartItems.reduce((a, c) => (a + c.price * c.count), 0),
        }
        dispatch(createOrderAction(newOrder));
    }

    const closeModal = () => {
        dispatch(clearOrderAction());
    };

    return (
        <div>
            {cartItems.length === 0
                ? <div className="cart cart-header">Cart is empty</div>
                : <div className="cart cart-header">You have {cartItems.length} in the cart{" "}</div>
            }

            {
                order && <Modal isOpen={true} onRequestClose={closeModal} ariaHideApp={false}>
                    <Zoom>
                        <button className="close-modal" onClick={closeModal}>x</button>
                        <div className="order-details">
                            <h3 className="success-message">Your order has been placed</h3>
                            <h2>Order {order._id}</h2>
                            <ul>
                                <li>
                                    <div>Name:</div>
                                    <div>{order.name}</div>
                                </li>
                                <li>
                                    <div>Email:</div>
                                    <div>{order.email}</div>
                                </li>
                                <li>
                                    <div>Address:</div>
                                    <div>{order.address}</div>
                                </li>
                                <li>
                                    <div>Date:</div>
                                    <div>{order.createdAt}</div>
                                </li>
                                <li>
                                    <div>Total:</div>
                                    <div>{formatCurrency(order.total || 0)}</div>
                                </li>
                                <li>
                                    <div>Cart Items:</div>
                                    <div>
                                        {order.cartItems?.map((x) => (
                                            <div>
                                                {x.count} {" x "} {x.title}
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Zoom>
                </Modal>
            }

            <div>
                <div className="cart">
                    <Fade left cascade>
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title}></img>
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} x {item.count}{" "}
                                            <button className="button" onClick={() => dispatch(removeFromCartAction(item))}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Fade>
                </div>
            </div>
            {cartItems.length !== 0 && (<div>
                <div className="cart">
                    <div className="total">
                        <div>
                            Total:{" "}
                            {formatCurrency(cartItems.reduce((a, c) => a + (c.price * c.count), 0))}
                        </div>
                        <button
                            onClick={() => setOrderInfo(c => ({ ...c, showCheckout: true}))}
                            className="button primary">
                            Proceed
                            </button>
                    </div>
                </div>
                {orderInfo.showCheckout && (
                    <Fade right cascade>
                        <div className="cart">
                            <form onSubmit={createOrder}>
                                <ul className="form-container">
                                    <li>
                                        <label>Email:</label>
                                        <input name="email" type="email" required onChange={handleInput} />
                                    </li>
                                    <li>
                                        <label>Name:</label>
                                        <input name="name" type="text" required onChange={handleInput} />
                                    </li>
                                    <li>
                                        <label>Address:</label>
                                        <input name="address" type="text" required onChange={handleInput} />
                                    </li>
                                    <li>
                                        <button className="button primary" type="submit">Checkout</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </Fade>
                )}
            </div>)}

        </div>
    )
}

export default Cart;