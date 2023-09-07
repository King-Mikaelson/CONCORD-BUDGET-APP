import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

type ModalProps = {
  addModal: string | undefined;
  setAddModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  AddSingleBudgetItem: (
    id: number,
    itemId: number,
    name: string,
    amount: number,
    status: string
  ) => void;
  id: number;
  itemId: number;
};

export default function AddItem({
  addModal,
  setAddModal,
  AddSingleBudgetItem,
  id,
  itemId,
}: ModalProps) {
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const props = { addModal, setAddModal, name, setName };

  const handleAddSingleItem = () => {
    if (status && name && amount) {
      AddSingleBudgetItem(id, itemId, name, amount, status);
    } else {
      alert("Fields must not be empty");
      return;
    }
    setName("");
    setAmount(0);
    setStatus("");
    setAddModal(undefined);
  };

  return (
    <>
      <Modal
        show={props.addModal === "form-elements"}
        size="md"
        popup
        onClose={() => setAddModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add New Item
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Item Name" />
              </div>
              <TextInput
                id="name"
                placeholder="Shoes"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="amount" value="Item Amount" />
              </div>
              <TextInput
                id="amount"
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="status"
                  value="Item Status eg:Pending or Done"
                />
              </div>
              <TextInput
                id="status"
                type="string"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <div
                onClick={() => setAddModal(undefined)}
                className=" hover:underline"
              >
                <Button>Cancel</Button>
              </div>
              <div onClick={handleAddSingleItem} className="flex ">
                <Button>Add Item</Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
