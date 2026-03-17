import { useProducts } from '../hooks/useProducts';
import ProductList from './ProductList';

const ProductListContainer = () => {
  const { products, loading, error, refetch } = useProducts();

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  return <ProductList products={products} loading={loading} />;
};

export default ProductListContainer;