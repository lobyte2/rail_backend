import { useState, useEffect } from 'react';
import MainLayout from '../templates/MainLayout';
import Heading from '../atoms/Heading';
import Catalogo from '../organisms/Catalogo';
import { getProducts } from '../../api/db';

const ProductoPage = () => {

  const [products, setProducts] = useState([]);
  

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);


  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <Heading level={1} style={{ textAlign: 'center', marginBottom: '30px' }}>
        Nuestro Catálogo
      </Heading>


      <input
        type="text"
        placeholder="Buscar en el catálogo..."
        className="input-field" 
        style={{ width: '100%', maxWidth: '600px', margin: '0 auto 30px', display: 'block' }}
        onChange={e => setSearchTerm(e.target.value)} 
      />
      

      <Catalogo products={filteredProducts} />
    </MainLayout>
  );
};

export default ProductoPage;