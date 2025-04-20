"use client";

import { useTodayExpenses } from "@/components/expenses/Expenses.action";
import { getTodayDate } from "@/helper/function";
import { IExpense } from "@/section/expenses/Expenses.types";
import { Form, Formik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import { FormField } from "../FormField";
import { Button } from "../ui/button";

const ExpenseCreateOrEditForm = ({
  year,
  month,
  item,
  closeRef,
}: {
  year: number;
  month: number;
  item?: IExpense;
  closeRef?: React.RefObject<HTMLButtonElement>;
}) => {
  const { addExpense } = useTodayExpenses();

  return (
    <>
      <Formik
        initialValues={{
          year: year,
          month: month,
          title: item?.title ?? "",
          description: item?.description ?? "",
          amount: item?.amount ?? 0,
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("Title is required!"),
          description: Yup.string(),
          amount: Yup.number().min(0, "Price must be 0 or greater"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if (item?._id) {
            } else {
              await addExpense({
                year,
                month,
                expense: {
                  title: values.title,
                  description: values.description,
                  amount: values.amount,
                  date: getTodayDate(),
                },
              });
            }
            toast.success("Expense added successfully");
            closeRef?.current?.click();
            resetForm();
            setSubmitting(false);
          } catch (error: any) {
            toast.success(error.message);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <FormField name="title" label="Title" placeholder="Enter expense" />

            <FormField
              name="description"
              label="Description"
              as="textarea"
              placeholder="Enter meal description"
            />

            <FormField
              name="amount"
              label="Amount"
              type="number"
              placeholder="Enter amount"
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ExpenseCreateOrEditForm;
