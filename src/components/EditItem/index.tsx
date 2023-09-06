import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

type ModalProps = {
  editModal: string | undefined;
  setEditModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  EditSingleBudgetItem: (
    id: number,
    itemId: number,
    name: string,
    amount: number,
    status: string
  ) => void;
  id: number;
  itemId: number | undefined;
  editName: string | undefined;
  editAmount: number | undefined;
  editStatus: string | undefined;
};

export default function EditItem({
  editModal,
  setEditModal,
  EditSingleBudgetItem,
  id,
  itemId,
  editName,
  editAmount,
  editStatus,
}: ModalProps) {
  const [name, setName] = useState<string | undefined>("");
  const [status, setStatus] = useState<string | undefined>("");
  const [amount, setAmount] = useState<number | undefined>(0);
  const props = { editModal, setEditModal, name, setName };

  const handleEditSingleItem = () => {
    EditSingleBudgetItem(id, itemId!, name!, amount!, status!);
    setEditModal(undefined);
  };
  //At initial mounting of the component we are setting the edit states to its previous item values until we edit them
  useEffect(() => {
    setName(editName);
    setStatus(editStatus);
    setAmount(editAmount);
  }, [editName, editStatus, editAmount]);

  return (
    <>
      <Modal
        show={props.editModal === "form-elements"}
        size="md"
        popup
        onClose={() => setEditModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit Item
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
                onClick={() => setEditModal(undefined)}
                className="text-cyan-700 hover:underline dark:text-cyan-500"
              >
                <Button>Cancel</Button>
              </div>
              <div onClick={handleEditSingleItem} className="flex ">
                <Button>Add Item</Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
