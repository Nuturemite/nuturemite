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
  console.log(queryParams);
  let { data = {}, error, isLoading, mutate } = useSWR("/vendor-products", fetcher2);
  const totalPages = data?.totalPages || 1;
  data = data?.data || [];

  const { limit = 12, page = 1 } = queryParams;
  const filterProducts = products => {
    return products
      .filter(product => {
        if (queryParams.minprice && product.price < queryParams.minprice) return false;
        if (queryParams.maxprice && product.price > queryParams.maxprice) return false;
        if (
          queryParams.categoryId &&
          !product.categories.map(c => c._id).includes(queryParams.categoryId)
        )
          return false;
        if (queryParams.mindiscount && product.discount < queryParams.mindiscount) return false;
        if (queryParams.minrating && product.rating < queryParams.minrating) return false;
        if (queryParams.query && !product.name.includes(queryParams.query)) return false;
        return true;
      })
      .slice(limit * page - limit, limit * page);
  };

  if (queryParams.sortBy == "price-low-to-high") data.sort((a, b) => a.price - b.price);
  if (queryParams.sortBy == "price-high-to-low") data.sort((a, b) => b.price - a.price);
  if (queryParams.sortBy == "discount") data.sort((a, b) => b.discount - a.discount);
  if (queryParams.sortBy == "latest") data.sort((a, b) => b.createdAt - a.createdAt);

  const filteredProducts = filterProducts(data);

  return { products: filteredProducts, error, isLoading, mutate, totalPages };
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
  return { wishlist: data, error, isLoading, mutate };
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

export const useProfile = () => {
  const { data, error, isLoading, mutate } = useSWR("/users/profile", fetcher);
  return { profile: data, error, isLoading, mutate };
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
