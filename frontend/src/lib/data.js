import useSWR from "swr";
import api from "./api";
import { useSearchParams } from "next/navigation";

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
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
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
    vendorId,
    limit = 9,
    page = 1,
  } = queryParams;
  let { data = {}, error, isLoading, mutate } = useSWR("/vendor-products", fetcher2);
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
        if (productId && product.productId != productId) return false;
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

export const useBaseProducts = (queryParams = {}) => {
  let { data, error, isLoading, mutate } = useSWR("/products", fetcher);

  // if(queryParams.id) {
  //   data = data.filter(product => product._id == queryParams.id);
  // }
  return { products: data, error, isLoading, mutate };
};

export const useProduct = id => {
  let url = `/vendor-products/${id}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { product: data, error, isLoading, mutate };
};

export const useCart = () => {
  const { data, error, isLoading, mutate } = useSWR("/cart", fetcher);
  return { cartItems: data, error, isLoading, mutate };
};

export const useWishlist = () => {
  const { data, error, isLoading, mutate } = useSWR("/wishlist", fetcher);
  console.log(data);
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
  const { data, error, isLoading, mutate } = useSWR(`/reviews/product/${productId}`, fetcher);
  return { reviews: data, error, isLoading, mutate };
};

export const useOrders = () => {
  const { data, error, isLoading, mutate } = useSWR("/orders", fetcher);
  return { orders: data, error, isLoading, mutate };
};

export const useOrder = orderId => {
  const { data, error, isLoading, mutate } = useSWR(`/orders/${orderId}`, fetcher);
  return { order: data, error, isLoading, mutate };
};
