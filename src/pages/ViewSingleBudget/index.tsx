import { useEffect, useState } from "react";
import {  AiOutlinePlus } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import EditItem from "../../components/EditItem";
import AddItem from "../../components/AddItem";
import LoadingIndicator from "../../LoadingIndicator";
import { toast } from "react-toastify";

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

type Props = {
  items: Budget[];
  validatingUser:boolean
  DeleteSingleBudgetItem: (id: number, itemId: number) => void;
  EditSingleBudgetItem: (
    id: number,
    itemId: number,
    name: string,
    amount: number,
    status: string
  ) => void;
  AddSingleBudgetItem: (
    id: number,
    itemId: number,
    name: string,
    amount: number,
    status: string
  ) => void;
  isPending: boolean
};

function ViewSingleBudget({
  items,
  DeleteSingleBudgetItem,
  EditSingleBudgetItem,
  AddSingleBudgetItem,
  isPending,
  validatingUser
}: Props) {
  const { id } = useParams();
  const item = items?.find((item: any) => item.id === Number(id));
  const [editModal, setEditModal] = useState<string | undefined>();
  const [addModal, setAddModal] = useState<string | undefined>();
  const [editItemId, setEditItemId] = useState<number | undefined>();
  const [editName, setEditName] = useState<string>();
  const [editAmount, setEditAmount] = useState<number | undefined>();
  const [editStatus, setEditStatus] = useState<string>();

//  functions to calculate and display key metrics 
//  a function that reduces the amount of eact item in the items array and returns a single value;total
  const total = item?.items.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue.amount,
    0
  );

  // A function that finds the difference between the total Budgeted Amount and the Total Amount Expense from each item
  const outstandingBalance = () => {
    const value = item?.totalBudgetAmount! - total;
    return value;
  };

  // Varaible that calcualtes the last item in the array and adds a new id based on the last item in the items array
  const lastElement = item?.items[item?.items.length - 1]?.id;
  const itemId = Boolean(lastElement) ? Number(lastElement) + 1 : 1;
  const EditItemId = (
    itemId: number,
    itemName: string,
    itemAmount: number,
    itemStatus: string
  ) => {
    setEditItemId(itemId);
    setEditStatus(itemStatus);
    setEditName(itemName);
    setEditStatus(itemStatus);
    setEditAmount(itemAmount);
  };
  const props = { editModal, setEditModal, addModal, setAddModal };

  useEffect(() => {
    outstandingBalance();
  }, [items]);

  if (isPending) {
    return (
      // Loading Spinner
     <LoadingIndicator/>
    );
  }

  return (
    <>
      <EditItem
        editModal={editModal}
        setEditModal={setEditModal}
        EditSingleBudgetItem={EditSingleBudgetItem}
        id={item?.id!}
        itemId={editItemId}
        editName={editName}
        editAmount={editAmount}
        editStatus={editStatus}
      />
      <AddItem
        addModal={addModal}
        setAddModal={setAddModal}
        AddSingleBudgetItem={AddSingleBudgetItem}
        id={item?.id!}
        itemId={itemId}
      />
      <section className="flex  px-6  lg:px-14 flex-col ">
        <div className=" text-base md:text-xl text-center flex items-center xl:w-[50%] md:w-[76%] md:mx-auto md:my-0">
          <p>Name: {item?.name}</p>
          <button
            onClick={() => props.setAddModal("form-elements")}
            className="md:flex gap-2  px-5 bg-[#3F5BF6] items-center rounded-lg h-fit py-3 justify-between hidden w-fit ml-auto"
          >
            <AiOutlinePlus className="text-white" />
            <p className="text-white font-workSans font-semibold text-sm">
              Add New Item
            </p>
          </button>
        </div>
        <section className="py-2 text-xl md:flex flex-col items-start md:w-[76%] xl:w-[50%] md:mx-auto md:my-0">
          <div className="md:flex justify-between w-full gap-y-2 pb-2 ">
            <p className="text-base md:text-xl">Total Budget Amount: ₦{item?.totalBudgetAmount}</p>
            <p className="text-base md:text-xl">Status: {item?.status}</p>
          </div>
          <div className="md:flex  justify-between w-full gap-y-2">
            <p className="text-base md:text-xl">Total Expense Amount: ₦{total}</p>
            <p className="text-base md:text-xl">Outstanding Balance: ₦{outstandingBalance()}</p>
          </div>
        </section>
        <section className="flex justify-center items-center  w-full">
          <table className="border-collapse hidden md:block">
            <thead className="w-full text-left">
              <tr>
                <th className=" pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  Id
                </th>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  Name
                </th>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  Amount
                </th>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  Status
                </th>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  {" "}
                </th>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  {" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {item?.items.map((item: any, index: number) => (
               index%2 ? 
               <tr key={item?.id} className="hover:bg-[#ddd]">
                  <td className="border solid border-[#ddd] p-8">
                    <p>{item?.id}</p>
                  </td>
                  <td className="border solid border-[#ddd] p-8">
                    <p>{item?.name}</p>
                  </td>

                  <td className="border solid border-[#ddd] p-8">
                    <p>₦ {item?.amount}</p>
                  </td>

                  <td className="border solid border-[#ddd] p-8">
                    <p>{item?.status}</p>
                  </td>

                  <td className="border solid border-[#ddd] p-8 cursor-pointer">
                    <button
                    className="flex items-center px-4 p-2 cursor-pointer rounded-lg text-white bg-[#3F5BF6]"
                      onClick={() => {
                        EditItemId(
                          item.id,
                          item.name,
                          item.amount,
                          item.status
                        );
                        props.setEditModal("form-elements");
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border solid border-[#ddd] p-8 cursor-pointer">
                    <button
                    className="flex px-4 p-2 cursor-pointer bg-red-600 rounded-lg text-white"
                      onClick={() =>
                        {DeleteSingleBudgetItem(Number(id), item.id);
                         toast.success(`Item ${item.id} deleted successfully`)}
                       }
                    >
                      Delete
                    </button>
                  </td>
                </tr> : <tr key={item?.id} className="hover:bg-[#ddd] bg-[#f2f2f2]">
                  <td className="border solid border-[#ddd] p-8">
                    <p>{item?.id}</p>
                  </td>
                  <td className="border solid border-[#ddd] p-8">
                    <p>{item?.name}</p>
                  </td>

                  <td className="border solid border-[#ddd] p-8">
                    <p>₦ {item?.amount}</p>
                  </td>

                  <td className="border solid border-[#ddd] p-8">
                    <p>{item?.status}</p>
                  </td>

                  <td className="border solid border-[#ddd] p-8 cursor-pointer">
                    <button
                    className="flex items-center px-4 p-2 cursor-pointer rounded-lg text-white bg-[#3F5BF6]"
                      onClick={() => {
                        EditItemId(
                          item.id,
                          item.name,
                          item.amount,
                          item.status
                        );
                        props.setEditModal("form-elements");
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border solid border-[#ddd] p-8 cursor-pointer">
                    <button
                    className="flex px-4 p-2 cursor-pointer bg-red-600 rounded-lg text-white"
                      onClick={() =>
                        {DeleteSingleBudgetItem(Number(id), item.id);
                         toast.success(`Item ${item.id} deleted successfully`)}
                       }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className=" md:hidden w-full flex justify-between  py-4   flex-col gap-10 ">
          {item?.items.map((item, index) => (
                <div key={item?.id} className="flex flex-col bg-[#F9FAFB] border-[#EAECF0] solid border-b">
                  <div className="border solid border-[#ddd] p-8 flex justify-between w-full">
                    <h2 className="text-lg font-medium">Id</h2>
                    <p className="text-base">{item?.id}</p>
                  </div>

                  <div className="border solid border-[#ddd] p-8 flex justify-between w-full">
                    <h2 className="text-lg font-medium">Name</h2>
                    <p>{item?.name}</p>
                  </div>

                  <div className="border solid border-[#ddd] p-8 flex justify-between w-full">
                    <h2 className="text-lg font-medium">   Total Amount</h2>
                    <p>₦{item?.amount}</p>
                  </div>

                  <div className="border solid border-[#ddd] p-8 flex justify-between w-full">
                    <h2 className="text-lg font-medium"> Status</h2>
                    <p>{item?.status}</p>
                  </div>

                  <div className="flex px-4 py-4 justify-between w-full">
                  <div className="border solid border-[#ddd] px-6 p-4 cursor-pointer rounded-lg text-white bg-[#3F5BF6]">
                    <button
                      onClick={() => {
                        EditItemId(
                          item.id,
                          item.name,
                          item.amount!,
                          item.status
                        );
                        props.setEditModal("form-elements");
                      }}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="border solid border-[#ddd]  px-6 p-4 cursor-pointer bg-red-600 rounded-lg text-white">
                    <button
                      onClick={() =>
                       {DeleteSingleBudgetItem(Number(id), item.id);
                        toast.success(`Item ${item.id} deleted successfully`)}
                      }
                    >
                      Delete
                    </button>
                  </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </section>
    </>
  );
}

export default ViewSingleBudget;
