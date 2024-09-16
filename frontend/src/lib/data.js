import useSWR from "swr";
import api from "./api";

const fetcher = url => api.get(url).then(res => res.data.data);
const fetcher2 = url => api.get(url).then(res => res.data);

const useSWRWithParams = (url, fetcher, options = {}) => {
  return useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    ...options,
  });
};

export const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/categories", fetcher);
  return { categories: data, error, isLoading, mutate };
};

export const useBrands = (queryParams = {}) => {
  const params = new URLSearchParams();
  if (queryParams.query) params.set("name", queryParams.query);
  if (queryParams.categoryId) params.set("categoryId", queryParams.categoryId);
  const url = `/brands${params.toString() ? `?${params.toString()}` : ""}`;
  const { data, error, isLoading, mutate } = useSWRWithParams(url, fetcher);
  return { brands: data, error, isLoading, mutate };
};

export const useCategory = categoryId => {
  const { data, error, isLoading, mutate } = useSWRWithParams(`/categories/${categoryId}`, fetcher);
  return { category: data, error, isLoading, mutate };
};

export const useBrand = brandId => {
  const { data, error, isLoading, mutate } = useSWRWithParams(`/brands/${brandId}`, fetcher);
  return { brand: data, error, isLoading, mutate };
};

export const useBaseProducts = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/products", fetcher);
  return { products: data, error, isLoading, mutate };
};

export const useBaseProduct = id => {
  const { data, error, isLoading, mutate } = useSWRWithParams(`/products/${id}`, fetcher);
  return { product: data, error, isLoading, mutate };
};

export const useProduct = id => {
  const { data, error, isLoading, mutate } = useSWRWithParams(`/products/${id}`, fetcher);
  return { product: data, error, isLoading, mutate };
};

export const useCart = (isAuthenticated = true) => {
  const { data, error, isLoading, mutate } = useSWRWithParams(
    isAuthenticated ? "/cart" : null,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );
  return { cartItems: data, error, isLoading, mutate };
};

export const useWishlist = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/wishlist", fetcher);
  return { wishlistItems: data, error, isLoading, mutate };
};

export const useUsers = (queryParams = {}) => {
  const params = new URLSearchParams();
  if (queryParams.query) params.set("name", queryParams.query);
  const url = `/users${params.toString() ? `?${params.toString()}` : ""}`;
  const { data, error, isLoading, mutate } = useSWRWithParams(url, fetcher);
  return { users: data, error, isLoading, mutate };
};

export const useAddresses = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/addresses", fetcher);
  return { addresses: data, error, isLoading, mutate };
};

export const useMyAddresses = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/my-addresses", fetcher);
  return { addresses: data, error, isLoading, mutate };
};

export const useAddress = addressId => {
  const { data, error, isLoading, mutate } = useSWRWithParams(`/addresses/${addressId}`, fetcher);
  return { address: data, error, isLoading, mutate };
};

export const useUser = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/auth/me", fetcher);
  return { user: data, error, isLoading, mutate };
};

export const useReviews = productId => {
  const { data, error, isLoading, mutate } = useSWRWithParams(
    `/reviews/product/${productId}`,
    fetcher
  );
  return { reviews: data, error, isLoading, mutate };
};

export const useMyOrders = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/my/orders", fetcher);
  return { orders: data, error, isLoading, mutate };
};

export const useAllOrders = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/orders", fetcher);
  return { orders: data, error, isLoading, mutate };
};

export const useOrder = orderId => {
  const { data, error, isLoading, mutate } = useSWRWithParams(`/orders/${orderId}`, fetcher);
  return { order: data, error, isLoading, mutate };
};

export const useMyVendorOrders = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/my-vendor-orders", fetcher);
  return { order: data, error, isLoading, mutate };
};

export const useVendors = (queryParams = {}) => {
  const filter = v => !queryParams.apvStatus || v.apvStatus === queryParams.apvStatus;
  const { data, error, isLoading, mutate } = useSWRWithParams("/vendors", fetcher);
  const vendors = data ? data.filter(filter) : [];
  return { vendors, error, isLoading, mutate };
};

export const useVendor = id => {
  const { data, error, isLoading, mutate } = useSWRWithParams(`/vendors/${id}`, fetcher);
  return { vendor: data, error, isLoading, mutate };
};

export const useVendorOrders = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/my-vendor-orders", fetcher);
  return { orders: data, error, isLoading, mutate };
};

export const useShipments = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/shipments", fetcher);
  return { shipments: data, error, isLoading, mutate };
};

export const useVendorShipments = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/my-vendor-shipments", fetcher);
  return { shipments: data, error, isLoading, mutate };
};

export const useCustomers = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/users?role=user", fetcher);
  return { customers: data, error, isLoading, mutate };
};

export const useVendorRefunds = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/my-vendor-refunds", fetcher);
  return { refunds: data, error, isLoading, mutate };
};

export const useRefunds = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/refunds", fetcher);
  return { refunds: data, error, isLoading, mutate };
};

export const useVendorCoupons = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/my-vendor-coupons", fetcher);
  return { coupons: data, error, isLoading, mutate };
};

export const useCoupons = () => {
  const { data, error, isLoading, mutate } = useSWRWithParams("/coupons", fetcher);
  return { coupons: data, error, isLoading, mutate };
};

export const useProducts = (queryParams = {}) => {
  const {
    search = "",
    minPrice,
    maxPrice,
    categoryId,
    minDiscount,
    minRating,
    productId,
    sortBy,
    active,
    limit = 9,
    page = 1,
    apvStatus = "approved",
    featured,
  } = queryParams;

  const { data = {}, error, isLoading, mutate } = useSWRWithParams("/products", fetcher2);
  const totalPages = data?.totalPages || 1;
  let products = data?.data || [];

  const sortProducts = () => {
    if (sortBy === "price-low-to-high") products.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high-to-low") products.sort((a, b) => b.price - a.price);
    if (sortBy === "discount") products.sort((a, b) => b.discount - a.discount);
    if (sortBy === "latest") products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const filterProducts = products => {
    return products
      .filter(product => {
        if (minPrice && product.price < minPrice) return false;
        if (maxPrice && product.price > maxPrice) return false;
        if (categoryId && !product.categories.map(c => c._id).includes(categoryId)) return false;
        if (minDiscount && product.discount < minDiscount) return false;
        if (minRating && product.rating < minRating) return false;
        if (search) {
          const searchLower = search.toLowerCase();
          const productName = product.name.toLowerCase();
          const productKeywords = (product.keywords || "").toLowerCase();
          if (!productName.includes(searchLower) && !productKeywords.includes(searchLower))
            return false;
        }
        if (apvStatus && product.apvStatus !== apvStatus) return false;
        if (productId && product.productId !== productId) return false;
        if (active && !product.active) return false;
        if (featured && !product.featured) return false;
        return true;
      })
      .slice(limit * (page - 1), limit * page);
  };

  sortProducts();
  const filteredProducts = filterProducts(products);

  return { products: filteredProducts, error, isLoading, mutate, totalPages };
};
