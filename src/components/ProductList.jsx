import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import './ProductList.css';

const ProductList = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="product-list">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;