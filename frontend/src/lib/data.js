import useSWR from "swr";
import api from "./api";

const fetcher = url => api.get(url).then(res => res.data.data);
const fetcher2 = url => api.get(url).then(res => res.data);

export const useCategories = (queryParams = {}) => {
  const params = new URLSearchParams();
  let url = "/categories";

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return { categories: data, error, isLoading, mutate };
};

export const useBrands = (queryParams = {}) => {
  const params = new URLSearchParams();

  if (queryParams.query) params.set("name", queryParams.query);
  if (queryParams.categoryId) params.set("categoryId", queryParams.categoryId);
  let url = "/brands";

  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return { brands: data, error, isLoading, mutate };
};

export const useCategory = categoryId => {
  const url = `/categories/${categoryId}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return { category: data, error, isLoading, mutate };
};

export const useBrand = brandId => {
  const url = `/brands/${brandId}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { brand: data, error, isLoading, mutate };
};


export const useBaseProducts = (queryParams = {}) => {
  let { data, error, isLoading, mutate } = useSWR("/products", fetcher);
  return { products: data, error, isLoading, mutate };
};

export const useBaseProduct = id => {
  let url = `/products/${id}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { product: data, error, isLoading, mutate };
};

export const useProduct = id => {
  let url = `/products/${id}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { product: data, error, isLoading, mutate };
};

export const useCart = () => {
  const { data, error, isLoading, mutate } = useSWR("/cart", fetcher);
  return { cartItems: data, error, isLoading, mutate };
};

export const useWishlist = () => {
  const { data, error, isLoading, mutate } = useSWR("/wishlist", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return { wishlistItems: data, error, isLoading, mutate };
};

export const useUsers = (queryParams = {}) => {
  const params = new URLSearchParams();
  if (queryParams.query) params.set("name", queryParams.query);
  let url = "/users";

  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { users: data, error, isLoading, mutate };
};

export const useAddresses = () => {
  const { data, error, isLoading, mutate } = useSWR("/addresses", fetcher);
  return { addresses: data, error, isLoading, mutate };
};

export const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/auth/me", fetcher);
  return { user: data, error, isLoading, mutate };
};

export const useReviews = productId => {
  const { data, error, isLoading, mutate } = useSWR(`/reviews/product/${productId}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return { reviews: data, error, isLoading, mutate };
};

export const useMyOrders = () => {
  const { data, error, isLoading, mutate } = useSWR("/my/orders", fetcher);
  return { orders: data, error, isLoading, mutate };
};

export const useAllOrders = () => {
  const { data, error, isLoading, mutate } = useSWR("/orders", fetcher);
  return { orders: data, error, isLoading, mutate };
};

export const useOrder = orderId => {
  const { data, error, isLoading, mutate } = useSWR(`/orders/${orderId}`, fetcher);
  return { order: data, error, isLoading, mutate };
};

export const useMyVendorOrders = () => {
  const { data, error, isLoading, mutate } = useSWR(`/vendor/my/orders`, fetcher);
  return { order: data, error, isLoading, mutate };
};

export const useVendors = (queryParams = {}) => {
  const filter = v => {
    if (queryParams.apvStatus && v.apvStatus !== queryParams.apvStatus) return false;
    return true;
  };

  const { data, error, isLoading, mutate } = useSWR("/vendors", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  const vendors = data ? data.filter(filter) : [];
  return { vendors, error, isLoading, mutate };
};

export const useVendor = id => {
  const { data, error, isLoading, mutate } = useSWR(`/vendors/${id}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  return { vendor: data, error, isLoading, mutate };
};

export const useVendorOrders = () => {
  const url = `/vendor/my/orders`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { orders: data, error, isLoading, mutate };
};

export const useVendorShipments = () => {
  const url = `/vendor/my/shipments`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { shipments: data, error, isLoading, mutate };
};

export const useCustomers = () => {
  const { data, error, isLoading, mutate } = useSWR("/users?role=user", fetcher);
  return { customers: data, error, isLoading, mutate };
};

export const useProducts = (queryParams = {}) => {
  const {
    search,
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
  let { data = {}, error, isLoading, mutate } = useSWR("/products", fetcher2, {});
  const totalPages = data?.totalPages || 1;
  data = data?.data || [];

  const filterProducts = products => {
    return products
      .filter(product => {
        if (minPrice && product.price < minPrice) return false;
        if (maxPrice && product.price > maxPrice) return false;
        if (categoryId && !product.categories.map(c => c._id).includes(categoryId)) return false;
        if (minDiscount && product.discount < minDiscount) return false;
        if (minRating && product.rating < minRating) return false;
        if (search && !product.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (apvStatus && product.apvStatus != apvStatus) return false;
        if (productId && product.productId != productId) return false;
        if (active && !product.active) return false;
        if (featured && !product.featured) return false;
        return true;
      })
      .slice(limit * page - limit, limit * page);
  };

  if (sortBy == "price-low-to-high") data.sort((a, b) => a.price - b.price);
  if (sortBy == "price-high-to-low") data.sort((a, b) => b.price - a.price);
  if (sortBy == "discount") data.sort((a, b) => b.discount - a.discount);
  if (sortBy == "latest") data.sort((a, b) => b.createdAt - a.createdAt);

  const filteredProducts = filterProducts(data);

  return { products: filteredProducts, error, isLoading, mutate, totalPages };
};