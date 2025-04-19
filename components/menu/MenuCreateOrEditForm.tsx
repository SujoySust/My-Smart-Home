"use client";

import { MealItem } from "@/helper/types";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormField } from "../FormField";
import { Button } from "../ui/button";
import { useWeeklyMealPlanAction } from "@/section/weekly-plan/WeeklyPlan.action";

const MenuCreateOrEditForm = ({
  day,
  mealTime,
  item,
  closeRef,
}: {
  day?: string;
  mealTime?: string;
  item?: MealItem;
  closeRef?: React.RefObject<HTMLButtonElement>;
}) => {
  const { addMealItem, updateMealItem } = useWeeklyMealPlanAction();
  return (
    <>
      <Formik
        initialValues={{
          day: day ?? "",
          mealTime: mealTime ?? "",
          name: item?.name ?? "",
          description: item?.description ?? "",
          ingredients: item?.ingredients ? item?.ingredients?.join(",") : "",
          unit: item?.unit ?? "",
          quantity: item?.quantity ?? 0,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("Name is required!"),
          description: Yup.string(),
          day: Yup.string().required("Day is required!"),
          mealTime: Yup.string().required("Meal time is required!"),
          ingredients: Yup.string(),
          quantity: Yup.number().min(0, "Quantity must be 0 or greater"),
          unit: Yup.string(),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (item?._id) {
            await updateMealItem({
              day: values.day,
              mealTime: values.mealTime,
              item: {
                _id: item?._id,
                name: values.name,
                description: values.description,
                ingredients: values?.ingredients?.split(","),
                quantity: values.quantity,
                unit: values.unit,
              },
            });
          } else {
            await addMealItem({
              day: values.day,
              mealTime: values.mealTime,
              item: {
                name: values.name,
                description: values.description,
                ingredients: values?.ingredients?.split(","),
                quantity: values.quantity,
                unit: values.unit,
              },
            });
          }

          closeRef?.current?.click();
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <FormField
              name="day"
              disabled={day ? true : false}
              label="Day of the Week"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              as="select"
              options={[
                { value: "sunday", label: "Sunday" },
                { value: "monday", label: "Monday" },
                { value: "tuesday", label: "Tuesday" },
                { value: "wednesday", label: "Wednesday" },
                { value: "thursday", label: "Thursday" },
                { value: "friday", label: "Friday" },
                { value: "saturday", label: "Saturday" },
              ]}
            />

            <FormField
              name="mealTime"
              label="Meal Time"
              disabled={mealTime ? true : false}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              as="select"
              options={[
                { value: "breakfast", label: "Breakfast" },
                { value: "lunch", label: "Lunch" },
                { value: "dinner", label: "Dinner" },
                { value: "snacks", label: "Snacks" },
              ]}
            />

            <FormField
              name="name"
              label="Meal Name"
              placeholder="Enter meal name"
            />

            <FormField
              name="ingredients"
              label="Ingredients"
              as="textarea"
              placeholder="Enter ingredients (one per line)"
            />

            <FormField
              name="description"
              label="Description"
              as="textarea"
              placeholder="Enter meal description"
            />

            <FormField
              name="unit"
              label="Unit"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              as="select"
              options={[
                { value: "serving", label: "Serving" },
                { value: "piece", label: "Piece" },
                { value: "gram", label: "Gram" },
                { value: "ml", label: "ML" },
              ]}
            />

            <FormField
              name="quantity"
              label="Quantity"
              type="number"
              placeholder="Enter quantity"
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

export default MenuCreateOrEditForm;
