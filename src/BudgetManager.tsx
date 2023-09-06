import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import ViewBudgetList from "./pages/ViewBudgetList";
import ViewSingleBudget from "./pages/ViewSingleBudget";
import { useEffect, useState } from "react";
import Login from "./pages/login";
import Layout from "./layout";
import SignUp from "./pages/signup";
import { onAuthStateChanged} from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import 'react-toastify/dist/ReactToastify.css';



type BudgetItem = {
  id: number;
  name: string;
  status: string;
  amount?: number;
};

type Budget = {
  id: number;
  name: string;
  status: string;
  totalBudgetAmount: number;
  items: BudgetItem[];
};
function BudgetManager() {
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const saved = JSON.parse(localStorage.getItem("items")!);
  const [data, setData] = useState<Budget[] | []>([]);
  const [user, setUser] = useState<any>(null);
  const [validatingUser, setValidatingUser] = useState(true);


  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(user)
      } else {
        // User is signed out
        // ...
        setUser({})
      }
      setValidatingUser(false)

    });
  },[])

  

  function DeleteSingleBudgetItem(id: number, itemId: number) {
    const newTexts = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          items: item.items.filter((subItem) => {
            const result = subItem.id !== itemId;
            return result;
          }),
        };
      }
      return item;
    });
    setData(newTexts);
  }

  // Edit Single Item from Items List
  function EditSingleBudgetItem(
    id: number,
    itemId: number,
    name: string,
    amount: number,
    status: string
  ) {
    const newBudgetItem = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          items: item.items.map((subItem) => {
            if (subItem.id === itemId) {
              return {
                ...subItem,
                name: name,
                amount: amount,
                status: status,
              };
            }
            return subItem;
          }),
        };
      }
      return item;
    });
    setData(newBudgetItem);
  }

  // Add Single Item from Items List
  function AddSingleBudgetItem(
    id: number,
    itemId: number,
    name: string,
    amount: number,
    status: string
  ) {
    const newBudgetItem = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          items: [
            ...item.items,
            {
              id: itemId,
              name,
              status,
              amount,
            },
          ],
        };
      }
      return item;
    });
    setData(newBudgetItem);
  }

  // Save item to local Storage on state  chnage
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(data));
  }, [data]);

  const url = "https://json-server-data-consord.onrender.com/api/data";

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Error fetching users data");
        }
        return res.json();
      })
      .then((data) => {
        if (!(saved && saved.length > 0)) {
          setData(data);
        } else {
          setData(saved);
        }
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, []);


  const isAuthenticated = () => user

  useEffect(() => {
    isAuthenticated()
  },
   [user])

  return (
    <div className="BudgetManager">
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Login
          user={user}
          setUser={setUser}
          setValidatingUser={setValidatingUser}
          validatingUser={validatingUser}
        />}></Route>
        <Route path="/signup" element={<SignUp
          user={user}
          setUser={setUser}
          setValidatingUser={setValidatingUser}
          validatingUser={validatingUser}
        />}></Route>
        <Route path="/view" element={<Layout setUser={setUser}/>}>
        <Route path="/view/budget"  element={ <ViewBudgetList items={data} />} />
        <Route
          path="/view/budget/:id"
          element={
            <ViewSingleBudget
              items={data}
              DeleteSingleBudgetItem={DeleteSingleBudgetItem}
              EditSingleBudgetItem={EditSingleBudgetItem}
              AddSingleBudgetItem={AddSingleBudgetItem}
            />
          }
        />
        </Route>
      </Routes>
    </div>
  );
}

export default BudgetManager;
