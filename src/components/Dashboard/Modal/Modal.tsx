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
import { createEntrySchema } from "@/schemas/createEntry";
import { useContext, useState } from "react";
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

interface CreateEntryModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

const CreateEntryModal = ({
  isOpen,
  setIsOpen,
  refetch,
}: CreateEntryModalProps) => {
  // states
  const [date, setDate] = useState<Date>(new Date());
  // hooks
  const [productTypes] = useProductTypes();
  const [transactionTypes] = useTransactionTypes();
  //@ts-ignore
  const { user } = useContext(AuthContext);
  // console.log(user.email);
  const form = useForm<z.infer<typeof createEntrySchema>>({
    resolver: zodResolver(createEntrySchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  async function onSubmit(data: z.infer<typeof createEntrySchema>) {
    console.log(data);
    const entryData = {
      ...data,
      entry_date: date,
      entry_by: user.email,
    };

    try {
      fetch(`${import.meta.env.VITE_API_URL}/entry`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(entryData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            reset();
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "New entry has been saved",
              showConfirmButton: false,
              timer: 1500,
              width: "350px",
            });
            setIsOpen(false);
          }
        });
    } catch (error) {
      // console.log(error, "error");
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <DialogContent className="w-[360px] md:w-[425px]">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
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
                                    className="capitalize"
                                    value={
                                      productType._id ||
                                      `productType-${productType.productType}`
                                    }
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
                  <DatePicker date={date} setDate={setDate} />
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
                                    className="capitalize"
                                    value={
                                      transactionType.transactionType ||
                                      `transactionType-${transactionType.transactionType}`
                                    }
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
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </div>
  );
};

export default CreateEntryModal;
