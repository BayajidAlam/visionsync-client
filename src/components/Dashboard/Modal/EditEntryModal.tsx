import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "../DatePicker/DatePicker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateEntrySchema } from "@/schemas/createEntry";
import { useContext, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Swal from "sweetalert2";
import useProductTypes from "@/hooks/useProductTypes";
import useTransactionTypes from "@/hooks/useTransactionTypes";
import { AuthContext } from "@/providers/AuthProvider";
import { ProductType } from "@/Types/productTypes";
import { Dialog } from "@radix-ui/react-dialog";
import Loading from "@/components/Loading/Loading";
import useEntryData from "@/hooks/useSelectedItem";

interface EditEntryModalProps {
  selectedId: string | null | number;
  refetch: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface EntryData {
  amount: string;
  entry_by: string;
  entry_date: string;
  prodType_id: string;
  productType: string;
  remarks: string;
  transactionType: string;
  _id: string;
}
const EditEntryModal = ({
  selectedId,
  refetch,
  isOpen,
  setIsOpen,
}: EditEntryModalProps) => {
  //states
  const [date, setDate] = useState<Date>(new Date());
  const [entryData, setEntryData] = useState<EntryData | null>(null);

  //hooks
  const [productTypes, productTypesLoading] = useProductTypes();
  const [transactionTypes, transactionTypesLoading] = useTransactionTypes();

  //load single item data
  const [data, entryDataLoading, error, entryRefetch] =
    //@ts-ignore
    useEntryData(selectedId);

  //@ts-ignore
  const { user, loading } = useContext(AuthContext);

  const form = useForm<z.infer<typeof updateEntrySchema>>({
    resolver: zodResolver(updateEntrySchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    if (!entryDataLoading && !error) {
      setEntryData(data);
      form.setValue("amount", data.amount);
      form.setValue("remarks", data.remarks);
    }
  }, [selectedId, data]);

  async function onSubmit(data: z.infer<typeof updateEntrySchema>) {
    const editedData = {
      ...data,
      entry_date: date,
      entry_by: user.email,
    };
    try {
      fetch(`${import.meta.env.VITE_API_URL}/entry/${selectedId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(editedData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data.modifiedCount > 0) {
            reset();
            refetch();
            entryRefetch();
            setIsOpen(false);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Entry has been updated",
              showConfirmButton: false,
              timer: 1000,
              width: "350px",
            });
          }
        });
    } catch (error) {
      // console.log(error, "error");
    }
  }

  if (!isOpen) {
    return null;
  }

  if (
    loading ||
    productTypesLoading ||
    transactionTypesLoading ||
    entryDataLoading
  )
    return <Loading />;
  console.log(entryData, "entry data");
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[360px] md:w-[425px]">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Edit Expense</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col  items-start gap-4">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="productType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product type</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              const selectedProductType = productTypes.find(
                                (productType: ProductType) =>
                                  productType._id === value
                              );
                              field.onChange(selectedProductType.productType);
                              form.setValue(
                                "prodType_id",
                                selectedProductType._id
                              );
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select product type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                {productTypes.map(
                                  (productType: {
                                    _id: string;
                                    productType: string;
                                  }) => (
                                    <SelectItem
                                      key={productType._id}
                                      className="capitalize"
                                      value={productType._id}
                                      defaultValue={entryData?.prodType_id}
                                    >
                                      {productType.productType}
                                    </SelectItem>
                                  )
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col  items-start gap-4">
                  <Label htmlFor="username" className="text-right">
                    Date
                  </Label>
                  <div className="w-full">
                    <DatePicker
                      //@ts-ignore
                      date={entryData?.entry_date}
                      setDate={setDate}
                    />
                  </div>
                </div>

                <div className="flex flex-col  items-start gap-4">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="transactionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transaction type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select product type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                {transactionTypes.map(
                                  (transactionType: {
                                    transactionType: string;
                                  }) => (
                                    <SelectItem
                                      defaultValue={entryData?.transactionType}
                                      className="capitalize"
                                      value={`${transactionType.transactionType}`}
                                    >
                                      {transactionType.transactionType}
                                    </SelectItem>
                                  )
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col  items-start gap-4">
                <Label htmlFor="username" className="text-right">
                  Amount
                </Label>
                <Input
                  defaultValue={entryData?.amount}
                  id="name"
                  placeholder="$ 0000"
                  className="col-span-3"
                  {...register("amount")}
                />
                {errors.amount && (
                  <p className="text-red-500">{errors.amount.message}</p>
                )}
              </div>

              <div className="flex flex-col  items-start gap-4">
                <Label htmlFor="username" className="text-right">
                  Remarks
                </Label>
                <Textarea
                  defaultValue={entryData?.remarks}
                  id="message"
                  placeholder="Type your message here."
                  {...register("remarks")}
                />
                {errors.remarks && (
                  <p className="text-red-500">{errors.remarks.message}</p>
                )}
              </div>

              <DialogFooter>
                <Button className="mt-4" type="submit">
                  Update
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditEntryModal;
