import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../templates/MainLayout';
import Heading from '../atoms/Heading';
import Button from '../atoms/Button';
import Formulario from '../molecules/Formulario';
import Text from '../atoms/Text';
import { AuthContext } from '../../context/AuthContext';
// Agregamos deleteProduct a las importaciones
import { getUsers, deleteUser, addUser, getProducts, addProduct, deleteProduct } from '../../api/db';

const AdminPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const [users, setUsers] = useState([]);
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [userError, setUserError] = useState('');


    const [products, setProducts] = useState([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductImage, setNewProductImage] = useState('');
    const [newProductDesc, setNewProductDesc] = useState('');
    const [productError, setProductError] = useState('');

    useEffect(() => {

        if (!user || user.role !== 'admin') {
            navigate('/login');
            return;
        }


        getUsers().then(setUsers);
        getProducts().then(setProducts);

    }, [user, navigate]);


    const handleDeleteUser = async (userId) => {
        if (userId === user.id) {
            alert('No puedes eliminarte a ti mismo.');
            return;
        }
        const updatedUsers = await deleteUser(userId);
        setUsers(updatedUsers);
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        setUserError('');
        try {
            const updatedUsers = await addUser({ email: newUserEmail, password: newUserPassword });
            setUsers(updatedUsers);
            setNewUserEmail('');
            setNewUserPassword('');
        } catch (err) {
            setUserError(err);
        }
    };

    // --- Función nueva para eliminar productos ---
    const handleDeleteProduct = async (productId) => {
        if(!window.confirm("¿Estás seguro de eliminar este producto?")) return;

        try {
            await deleteProduct(productId);
            // Recargamos la lista de productos desde el servidor
            const updatedProducts = await getProducts();
            setProducts(updatedProducts);
        } catch (err) {
            alert("Error al eliminar: " + err);
        }
    };


    const handleAddProduct = async (e) => {
        e.preventDefault();
        setProductError('');

        if (!newProductName || !newProductPrice || !newProductImage || !newProductDesc) {
            setProductError('Todos los campos son obligatorios.');
            return;
        }

        try {
            const productData = {
                name: newProductName,
                price: newProductPrice,
                image: newProductImage,
                description: newProductDesc
            };
            await addProduct(productData);
            
            // Recargamos la lista actualizada
            const updatedProducts = await getProducts();
            setProducts(updatedProducts);


            setNewProductName('');
            setNewProductPrice('');
            setNewProductImage('');
            setNewProductDesc('');

        } catch (err) {
            setProductError('Hubo un error al agregar el producto.');
        }
    };


    return (
        <MainLayout>
            <Heading level={1} style={{ textAlign: 'center' }}>Panel de Administración</Heading>


            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                <Heading level={2}>Administrar Productos</Heading>
                

                <form onSubmit={handleAddProduct} style={{ marginBottom: '20px' }}>
                    <Heading level={3}>Agregar Nuevo Producto</Heading>
                    <Formulario label="Nombre del Producto" type="text" value={newProductName} onChange={e => setNewProductName(e.target.value)} />
                    <Formulario label="Precio" type="number" value={newProductPrice} onChange={e => setNewProductPrice(e.target.value)} />
                    <Formulario label="URL de la Imagen" type="text" value={newProductImage} onChange={e => setNewProductImage(e.target.value)} />
                    <Formulario label="Descripción" type="textarea" value={newProductDesc} onChange={e => setNewProductDesc(e.target.value)} />
                    {productError && <Text style={{ color: 'red' }}>{productError}</Text>}
                    <Button type="submit">Agregar Producto</Button>
                </form>


                <Heading level={3}>Lista de Productos</Heading>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {products.map(p => (
                        <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '5px' }}>
                            {/* Mostramos nombre y precio */}
                            <span>{p.name} - ${p.price}</span>
                            {/* Botón para eliminar el producto */}
                            <Button onClick={() => handleDeleteProduct(p.id)} variant="danger">Eliminar</Button>
                        </li>
                    ))}
                </ul>
            </div>



            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                <Heading level={2}>Administrar Usuarios</Heading>
                <form onSubmit={handleAddUser} style={{ marginBottom: '20px' }}>
                    <Heading level={3}>Agregar Nuevo Usuario</Heading>
                    <Formulario label="Email" type="email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} />
                    <Formulario label="Contraseña" type="password" value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} />
                    {userError && <Text style={{ color: 'red' }}>{userError}</Text>}
                    <Button type="submit">Agregar Usuario</Button>
                </form>

                <Heading level={3}>Lista de Usuarios</Heading>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {users.map(u => (
                        <li key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '5px' }}>
                            <span>{u.email} ({u.role})</span>
                            <Button onClick={() => handleDeleteUser(u.id)} variant="danger">Eliminar</Button>
                        </li>
                    ))}
                </ul>
            </div>

        </MainLayout>
    );
};

export default AdminPage;