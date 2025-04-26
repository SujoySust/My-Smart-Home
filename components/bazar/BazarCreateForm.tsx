"use client";
import { useDailyBazar } from "@/section/bazar/Bazar.action";
import { Form, Formik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import { FormField } from "../FormField";
import { Button } from "../ui/button";

const BazarCreateForm = ({
  closeRef,
}: {
  closeRef?: React.RefObject<HTMLButtonElement>;
}) => {
  const { addBazar } = useDailyBazar();
  return (
    <>
      <Formik
        initialValues={{
          title: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("Title is required!"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await addBazar({
              title: values.title,
              date: new Date(),
            });
            toast.success("Bazar added successfully");
            closeRef?.current?.click();
            resetForm();
            setSubmitting(false);
          } catch (error: any) {
            toast.error(error.message);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <FormField
              name="title"
              label="Title"
              placeholder="Enter bazar item"
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

export default BazarCreateForm;
