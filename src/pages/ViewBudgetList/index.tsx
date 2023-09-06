import { Link } from "react-router-dom";

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
  isPending: boolean
};

export default function ViewBudgetList({ items,isPending }: Props) {

  if (isPending) {
    return (
      <div className="flex justify-center items-center">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="w-full  flex  px-6  lg:px-14 flex-col md:items-center">
        <section className="py-5 text-2xl">
          <h1>Budget List</h1>
        </section>
        <section className="flex ">
          <table className="w-full border-collapse hidden md:block">
            <thead className="w-full text-left">
              <tr>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  Id
                </th>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  Name
                </th>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  Total Amount
                </th>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  Status
                </th>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  {" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={item?.id}>
                  <td className="border solid border-[#ddd] p-8">
                    <p>{item?.id}</p>
                  </td>

                  <td className="border solid border-[#ddd] p-8">
                    <p>{item?.name}</p>
                  </td>

                  <td className="border solid border-[#ddd] p-8">
                    <p>₦{item?.totalBudgetAmount}</p>
                  </td>

                  <td className="border solid border-[#ddd] p-8">
                    <p>{item?.status}</p>
                  </td>

                  <td className="border solid border-[#ddd] p-8">
                    <Link to={`/view/budget/${item.id}`}>
                      <button>View full details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="md:hidden w-full flex justify-between  py-4   flex-col gap-10 ">
          {items?.map((item, index) => (
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
                    <p>₦{item?.totalBudgetAmount}</p>
                  </div>

                  <div className="border solid border-[#ddd] p-8 flex justify-between w-full">
                    <h2 className="text-lg font-medium"> Status</h2>
                    <p>{item?.status}</p>
                  </div>

                  <div className="border solid border-[#ddd] p-4 flex justify-center">
                    <Link to={`/view/budget/${item.id}`} className="px-5 py-5 bg-[#3F5BF6] items-center rounded-lg text-white">
                      <button>View full details</button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </section>
    </div>
  );
}
