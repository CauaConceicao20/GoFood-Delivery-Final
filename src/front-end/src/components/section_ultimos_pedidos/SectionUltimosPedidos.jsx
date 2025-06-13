import Botao from '../botao/Botao.jsx';
import CardUltimoPedido from '../card_utlimo_pedido/CardUltimoPedido.jsx';
import './sectionUltimosPedidos.css';

function SectionUltimosPedidos() {
    // Para começar, dados estáticos. Depois pode vir de props ou API.
    const pedidos = [
        "Marmita fit - Restaurante Bom Sabor",
        "Marmita fit - Restaurante Bom Sabor"
    ];

    const onRepetir = () => {
        console.log("Repetir pedido clicado");
    };

    function repetirPedido(pedido) {
        console.log(`Repetindo pedido: ${pedido}`);
    }

    return (
        <section className="section-ultimos-pedidos">
            <div className="section-ultimos-pedidos-conteudo">
                <div className="titulo-secao-utlimos-pedidos">
                    <h1>Seus ultimos pedidos</h1>
                    <span>Repetir Pedido</span>
                </div>
                <div className="area-ultimos-pedidos">
                    {pedidos.map((pedido, idx) => (
                        <CardUltimoPedido
                            key={idx}
                            titulo={pedido}
                            onRepetir={() => repetirPedido(pedido)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SectionUltimosPedidos;