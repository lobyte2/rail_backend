import { useContext } from 'react';
import MainLayout from '../templates/MainLayout';
import { CartContext } from '../../context/CartContext';
import Heading from '../atoms/Heading';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import Image from '../atoms/Image';
import { Link } from 'react-router-dom';
import { money } from '../../utils/formatPrice';

const CarritoPage = () => {
    // IMPORTANTE: Agregamos 'pagar' aquí ▼
    const { cart, removeFromCart, pagar } = useContext(CartContext);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <MainLayout>
            <Heading level={1}>Tu Carrito</Heading>
            {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Text>Tu carrito está vacío.</Text>
                    <Link to="/products">
                        <Button>Ver productos</Button>
                    </Link>
                </div>
            ) : (
                <div style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
                    {cart.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '15px 0' }}>
                            <Image src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}/>
                            <Heading level={4}>{item.name}</Heading>
                            <Text>Cantidad: {item.quantity}</Text>
                            <Text>{money(item.price * item.quantity)}</Text>
                            <Button variant="secondary" onClick={() => removeFromCart(item.id)}>Eliminar</Button>
                        </div>
                    ))}
                    
                    <div style={{ textAlign: 'right', marginTop: '30px' }}>
                        <Heading level={2}>Total: {money(total)}</Heading>
                        
                        <Button onClick={pagar} style={{ marginTop: '10px', padding: '15px 30px', fontSize: '1.2em' }}>
                            Finalizar Compra
                        </Button>
                    </div>
                </div>
            )}
        </MainLayout>
    );
};

export default CarritoPage;