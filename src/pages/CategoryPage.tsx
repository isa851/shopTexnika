import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { getProductsByCategory, products } from '../data/products';
import { categories } from '../data/categories';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Avg. Customer Review' },
  { value: 'newest', label: 'Newest Arrivals' },
];

const CategoryPage: React.FC = () => {
  const { categoryId, subcategoryId } = useParams<{ categoryId: string; subcategoryId?: string }>();
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  // Find category and subcategory info
  const category = categories.find(c => c.id === categoryId);
  const subcategory = subcategoryId 
    ? category?.subcategories?.find(s => s.id === subcategoryId)
    : null;
  
  // Extract all available brands for filtering
  const availableBrands = Array.from(
    new Set(products.map(product => product.brand))
  ).sort();
  
  // Filter products based on category and filters
  useEffect(() => {
    // Start with products by category/subcategory
    let filtered = categoryId 
      ? getProductsByCategory(subcategoryId || categoryId)
      : products;
    
    // Apply price filter
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply brand filter if any brands are selected
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, this would sort by date added
        filtered = [...filtered].sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'featured':
      default:
        // For featured, we might prioritize items with discount or high rating
        filtered = [...filtered].sort((a, b) => {
          if (a.discount && !b.discount) return -1;
          if (!a.discount && b.discount) return 1;
          return b.rating - a.rating;
        });
    }
    
    setFilteredProducts(filtered);
  }, [categoryId, subcategoryId, sortBy, priceRange, selectedBrands]);
  
  const toggleBrandFilter = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };
  
  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex text-sm">
          <li>
            <Link to="/" className="text-[#007185] hover:text-[#00596B] hover:underline">
              Home
            </Link>
          </li>
          {category && (
            <>
              <li className="mx-2">/</li>
              <li>
                <Link 
                  to={`/category/${category.id}`} 
                  className={`${subcategoryId ? 'text-[#007185] hover:text-[#00596B] hover:underline' : 'text-gray-500'}`}
                >
                  {category.name}
                </Link>
              </li>
            </>
          )}
          {subcategory && (
            <>
              <li className="mx-2">/</li>
              <li className="text-gray-500">{subcategory.name}</li>
            </>
          )}
        </ol>
      </nav>
      
      {/* Category title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          {subcategory ? subcategory.name : category?.name || 'All Products'}
        </h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar - visible on larger screens, toggleable on mobile */}
        <div className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-medium mb-4">Filters</h2>
            
            {/* Price range filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price</h3>
              <div className="space-y-2">
                <button 
                  className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${priceRange[0] === 0 && priceRange[1] === 25 ? 'bg-gray-100' : ''}`}
                  onClick={() => handlePriceRangeChange(0, 25)}
                >
                  Under $25
                </button>
                <button 
                  className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${priceRange[0] === 25 && priceRange[1] === 50 ? 'bg-gray-100' : ''}`}
                  onClick={() => handlePriceRangeChange(25, 50)}
                >
                  $25 to $50
                </button>
                <button 
                  className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${priceRange[0] === 50 && priceRange[1] === 100 ? 'bg-gray-100' : ''}`}
                  onClick={() => handlePriceRangeChange(50, 100)}
                >
                  $50 to $100
                </button>
                <button 
                  className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${priceRange[0] === 100 && priceRange[1] === 200 ? 'bg-gray-100' : ''}`}
                  onClick={() => handlePriceRangeChange(100, 200)}
                >
                  $100 to $200
                </button>
                <button 
                  className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${priceRange[0] === 200 && priceRange[1] === 1000 ? 'bg-gray-100' : ''}`}
                  onClick={() => handlePriceRangeChange(200, 1000)}
                >
                  $200 & Above
                </button>
              </div>
              
              {/* Custom price range */}
              <div className="mt-3 flex items-center">
                <input 
                  type="number" 
                  placeholder="Min"
                  min="0"
                  className="w-20 p-1 border border-gray-300 rounded text-sm"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                />
                <span className="mx-2">-</span>
                <input 
                  type="number" 
                  placeholder="Max"
                  min="0"
                  className="w-20 p-1 border border-gray-300 rounded text-sm"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                />
                <button 
                  className="ml-2 px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => handlePriceRangeChange(priceRange[0], priceRange[1])}
                >
                  Go
                </button>
              </div>
            </div>
            
            {/* Brand filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Brand</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {availableBrands.map(brand => (
                  <div key={brand} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrandFilter(brand)}
                      className="mr-2"
                    />
                    <label htmlFor={`brand-${brand}`} className="text-sm">{brand}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Prime filter */}
            <div className="mb-6">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="prime-eligible"
                  className="mr-2"
                />
                <label htmlFor="prime-eligible" className="text-sm">Prime Eligible</label>
              </div>
            </div>
            
            {/* Clear filters button */}
            <button 
              className="w-full py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
              onClick={() => {
                setPriceRange([0, 1000]);
                setSelectedBrands([]);
              }}
            >
              Clear filters
            </button>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="flex-grow">
          {/* Mobile filter toggle and sort controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button 
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-sm md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Filters
            </button>
            
            <div className="relative">
              <div className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-sm">
                <ArrowUpDown size={16} className="mr-2" />
                <span>Sort by: </span>
                <select 
                  className="ml-1 bg-transparent border-none focus:outline-none appearance-none pr-8"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mb-4 text-sm text-gray-600">
            {filteredProducts.length} results
          </div>
          
          {/* Products grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h2 className="text-xl mb-2">No products found</h2>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or browse other categories.
              </p>
              <Link to="/" className="text-[#007185] hover:text-[#00596B] hover:underline">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;