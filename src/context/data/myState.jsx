import { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";

function myState(props) {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgba(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  const [product, setProduct] = useState([]);

  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("Please fill all fields");
    }
    const productRef = collection(fireDB, "products");
    setLoading(true);

    try {
      await addDoc(productRef, products);
      toast.success("Product Add successfully");
      getProductData();
      // closeModal();
      setLoading(false);

      setTimeout(() => {
        window.location.href = "dashboard";
      }, 800);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];

        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });

        setProduct(productArray);
      });
      setLoading(false);
      return () => data;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  //update product
  const editHandle = (item) => {
    setProducts(item);
  };

  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", products?.id), products);
      getProductData();
      setLoading(false);
      toast.success("Product updated successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
    setProducts("");
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item?.id));
      toast.success("Product deleted successfully");
      setLoading(false);
      await getProductData();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const [order, setOrder] = useState([]);
  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "order"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
    getOrderData();
  }, []);

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        editHandle,
        updateProduct,
        deleteProduct,
        order,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default myState;
