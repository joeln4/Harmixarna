import React from "react";
import "./Steps.css";
import { SubmitHandler, useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver} from "@hookform/resolvers/zod";

type Props = {
  onPrev: () => void;
  onSubmitCustomer: (data: FormFields) => void;
};

const schema = z.object({
  name: z.string().min(2, "Namn är obligatoriskt"),
  email: z.email({message: "Ogiltig e-postadress"}),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export type FormFields = z.infer<typeof schema>;

const Step3CustomerInfo = ({ onPrev, onSubmitCustomer }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    onSubmitCustomer(data);
  };

  return (
    <div className="step-content">
      <h1>Fyll i uppgifter</h1>
      <div className="form-container">
        <form className="customer-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name")}
            type="text"
            placeholder="Namn"
          />
          {errors.name && (
            <div className="error-message">{errors.name.message}</div>
          )}
          <input
            {...register("email")}
            type="email"
            placeholder="E-post"
          />
          {errors.email && (
            <div className="error-message">{errors.email.message}</div>
          )}
          <input
            {...register("phone")}
            type="text"
            placeholder="Telefonnummer"
          />
          <input
            {...register("message")}
            type="text"
            placeholder="Meddelande"
          />
        </form>
      </div>

      <div className="step-btn-container">
        <button className="btn-prev" onClick={onPrev}>
          Tillbaka
        </button>
        <button className="btn-next" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>{isSubmitting ? "Laddar..." : "Boka"}</button>
      </div>
    </div>
  );
};

export default Step3CustomerInfo;
