import MainLayout from '../templates/MainLayout';
import Heading from '../atoms/Heading';
import Text from '../atoms/Text';

const BlogPage = () => {
    const sectionStyle = {
        marginBottom: '40px',
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '8px',
        background: '#fff'
    };

    const imageStyle = {
        maxWidth: '400px',
        width: '100%',
        display: 'block',
        margin: '20px auto',
        borderRadius: '8px'
    };

    return (
        <MainLayout>
            <div style={{ maxWidth: '800px', margin: '40px auto' }}>
                <Heading level={1} style={{ textAlign: 'center', marginBottom: '40px' }}>Blog</Heading>


                <div style={sectionStyle}>
                    <Heading level={2}>Novedades de la tienda</Heading>
                    <Text>
                        El SSD M.2 980 PRO de Samsung ofrece un rendimiento excepcional para gamers y profesionales. Puede alcanzar hasta velocidades de lectura hasta 7.000 MB/s y ofrece un almacenamiento de 2TB.
                    </Text>
                    <img 
                        src="https://bestmart.cl/cdn/shop/files/tarjeta-ssd-samsung-500gb-980-pro-pcie-40-x4-m2-9509012_800x.jpg?v=1758551364" 
                        alt="SSD M.2 980 PRO" 
                        style={imageStyle} 
                    />
                </div>


                <div style={sectionStyle}>
                    <Heading level={2}>Datos curiosos</Heading>
                    
                    <Text>
                        El Glorious Model O Inalámbrico puede alcanzar hasta 25.000 DPI y una carga de batería al 100% puede durar aproximadamente 71 horas con el RGB apagado.
                    </Text>
                    <img 
                        src="https://hardwaremarket.net/wp-content/uploads/2021/03/1_white.jpg" 
                        alt="Mouse Glorious Model O" 
                        style={imageStyle} 
                    />

                    <hr style={{ margin: '40px 0', border: '1px solid #eee' }} />

                    <Text>
                        El teclado HyperX Alloy Core RGB puede resistir hasta 120 ml de líquido, lo cual lo hace muy resistente.
                    </Text>
                    <img 
                        src="https://media.spdigital.cl/thumbnails/products/rv969_qx_0c03c07b_thumbnail_4096.jpg" 
                        alt="Teclado HyperX Alloy Core RGB" 
                        style={imageStyle} 
                    />
                </div>
            </div>
        </MainLayout>
    );
};

export default BlogPage;