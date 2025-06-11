import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppContextType, Product, CartItem, User, Order, RegisterData } from '../types';
import { products as initialProducts } from '../data/products';

interface AppState {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  orders: Order[];
}

type AppAction =
  | { type: 'ADD_TO_CART'; product: Product; quantity: number }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_CART_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_USER'; user: User | null }
  | { type: 'ADD_ORDER'; order: Order }
  | { type: 'LOAD_STATE'; state: Partial<AppState> };

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.product.id === action.product.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + action.quantity }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.product, quantity: action.quantity }]
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.productId)
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_USER':
      return { ...state, user: action.user };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.order] };
    case 'LOAD_STATE':
      return { ...state, ...action.state };
    default:
      return state;
  }
};

const initialState: AppState = {
  products: initialProducts,
  cart: [],
  user: null,
  orders: []
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopUniverse_cart');
    const savedUser = localStorage.getItem('shopUniverse_user');
    const savedOrders = localStorage.getItem('shopUniverse_orders');

    const loadState: Partial<AppState> = {};
    if (savedCart) loadState.cart = JSON.parse(savedCart);
    if (savedUser) loadState.user = JSON.parse(savedUser);
    if (savedOrders) loadState.orders = JSON.parse(savedOrders);

    if (Object.keys(loadState).length > 0) {
      dispatch({ type: 'LOAD_STATE', state: loadState });
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('shopUniverse_cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('shopUniverse_user', JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem('shopUniverse_orders', JSON.stringify(state.orders));
  }, [state.orders]);

  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', product, quantity });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', productId, quantity });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in localStorage
    const savedUsers = localStorage.getItem('shopUniverse_users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      dispatch({ type: 'SET_USER', user: userWithoutPassword });
      return true;
    }
    
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const savedUsers = localStorage.getItem('shopUniverse_users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    // Check if user already exists
    if (users.find((u: any) => u.email === userData.email)) {
      return false;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdAt: new Date().toISOString()
    };
    
    // Save user with password for login
    users.push({ ...newUser, password: userData.password });
    localStorage.setItem('shopUniverse_users', JSON.stringify(users));
    
    dispatch({ type: 'SET_USER', user: newUser });
    return true;
  };

  const logout = () => {
    dispatch({ type: 'SET_USER', user: null });
  };

  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const order: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_ORDER', order });
    dispatch({ type: 'CLEAR_CART' });
    
    return order.id;
  };

  const contextValue: AppContextType = {
    products: state.products,
    cart: state.cart,
    user: state.user,
    orders: state.orders,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    login,
    register,
    logout,
    createOrder
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};