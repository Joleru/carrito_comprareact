import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react";
import "./App.css";


// Productos de ejemplo
const productos = [
  { id: 1, nombre: "Smartphone", precio: 599, imagen: "📱" },
  { id: 2, nombre: "Laptop", precio: 1299, imagen: "💻" },
  { id: 3, nombre: "Audífonos", precio: 199, imagen: "🎧" },
  { id: 4, nombre: "Tablet", precio: 399, imagen: "📱" },
  { id: 5, nombre: "Smartwatch", precio: 249, imagen: "⌚" },
  { id: 6, nombre: "Cámara", precio: 799, imagen: "📷" },
  { id: 7, nombre: "Tv", precio: 999, imagen: "📺" },
];

function App() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [valor, setInput] = useState('')

  console.log(valor);

  //agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.id === producto.id
      );
      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...carritoActual, { ...producto, cantidad: 1 }];
      }
    });
  };

  //eliminar Producto del carrito
  function eliminarDelCarrito(id) {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    );
  }

  //actualizar cantidad del producto
  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad === 0) {
      eliminarDelCarrito(id);
      return;
    }

    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  //vacial carrito completo
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  //calcular total del carrito
  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  };

  //obtener cantidad total de productos
  const obtenerCantidadTotal = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  return (
    <>
       <input  onChange={(e)=>setInput(e.target.value)}/>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">TechStore</h1>

            {/* Botón del carrito */}
            <button
              onClick={() => setMostrarCarrito(true)}
              className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              <span>Carrito</span>
              {obtenerCantidadTotal() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {obtenerCantidadTotal()}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Productos */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Productos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="text-6xl mb-4 text-center">
                    {producto.imagen}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {producto.nombre}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    ${producto.precio}
                  </p>

                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Modal del carrito */}
        {mostrarCarrito && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
              {/* Header del modal */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-800">
                  Carrito de Compras
                </h2>
                <button
                  onClick={() => setMostrarCarrito(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Contenido del carrito */}
              <div className="p-6 overflow-y-auto max-h-96">
                {carrito.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart
                      size={64}
                      className="mx-auto text-gray-300 mb-4"
                    />
                    <p className="text-gray-500 text-lg">
                      Tu carrito está vacío
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {carrito.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 border rounded-lg"
                      >
                        <div className="text-3xl">{item.imagen}</div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">
                            {item.nombre}
                          </h3>
                          <p className="text-blue-600 font-bold">
                            ${item.precio}
                          </p>
                        </div>

                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              actualizarCantidad(item.id, item.cantidad - 1)
                            }
                            className="bg-gray-200 hover:bg-gray-300 rounded-full p-1"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="mx-2 font-semibold min-w-[2rem] text-center">
                            {item.cantidad}
                          </span>

                          <button
                            onClick={() =>
                              actualizarCantidad(item.id, item.cantidad + 1)
                            }
                            className="bg-gray-200 hover:bg-gray-300 rounded-full p-1"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            ${item.precio * item.cantidad}
                          </p>
                        </div>

                        {/* Botón eliminar */}
                        <button
                          onClick={() => eliminarDelCarrito(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer del modal */}
              {carrito.length > 0 && (
                <div className="border-t p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">
                      Total: ${calcularTotal()}
                    </span>
                    <span className="text-gray-600">
                      ({obtenerCantidadTotal()} productos)
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={vaciarCarrito}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Vaciar carrito
                    </button>

                    <button
                      onClick={() => {
                        alert(`¡Compra realizada! Total: $${calcularTotal()}`);
                        vaciarCarrito();
                        setMostrarCarrito(false);
                      }}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Comprar ahora
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
