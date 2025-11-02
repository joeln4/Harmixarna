import React from "react";
import "./Steps.css";
import "./Step3.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TreatmentInterface } from "../../types/treatment.types";
import { formatDateToSE } from "../../lib/date";
import { TotalTreatmentPrice } from "../../utils/totalPrice";

type Props = {
  onPrev: () => void;
  onSubmitCustomer: (data: FormFields) => void;
  treatments: TreatmentInterface[];
  date: Date | null;
  time: string | null;
};

const schema = z.object({
  name: z
    .string()
    .min(1, "Namn är obligatoriskt")
    .min(2, "Namnet måste vara minst 2 tecken")
    .max(150, "Namnet får max vara 150 tecken"),
  email: z
    .string()
    .min(1, "E-post är obligatoriskt")
    .email({ message: "Ogiltig e-post" }),
  phone: z.string().max(20, "Telefonnumret är för långt").optional(),
  message: z
    .string()
    .max(500, "Meddelandet för max vara 500 tecken")
    .optional(),
});

export type FormFields = z.infer<typeof schema>;

const Step3CustomerInfo = ({
  onPrev,
  onSubmitCustomer,
  treatments,
  date,
  time,
}: Props) => {
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
      <div className="summary-container">
        <dl className="summary-grid">
          <dt>Datum</dt>
          <dd>{formatDateToSE(date)}</dd>

          <dt>Tid</dt>
          <dd>{time}</dd>

          <dt>Pris</dt>
          <dd>{TotalTreatmentPrice(treatments)} kr</dd>

          <dt>Behandlingar</dt>
          <dd>
            <ul>
              {treatments.map((t) => (
                <li key={t.id}>{t.type}</li>
              ))}
            </ul>
          </dd>
        </dl>
      </div>
      <div className="form-container">
        <form
          noValidate
          className="customer-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-input">
            <label className="form-label" htmlFor="form-name">Namn</label>
            <input {...register("name")} type="text" placeholder="Namn" id="form-name" autoComplete="name" className="form-field"/>
            {errors.name && (
              <div className="error-message">{errors.name.message}</div>
            )}
          </div>
          <div className="form-input">
            <label className="form-label" htmlFor="form-email">E-post</label>
            <input {...register("email")} type="email" placeholder="E-post" id="form-email" autoComplete="email" className="form-field"/>
            {errors.email && (
              <div className="error-message">{errors.email.message}</div>
            )}
          </div>
          <div className="form-input">
            <label className="form-label" htmlFor="form-phone">Telefonnummer <span className="form-optional">(valfritt)</span></label>
            <input
              {...register("phone")}
              type="text"
              placeholder="Telefonnummer"
              id="form-phone"
              autoComplete="tel"
              className="form-field"
            />
            {errors.phone && (
              <div className="error-message">{errors.phone.message}</div>
            )}
          </div>
          <div className="form-input-message">
            <label className="form-label" htmlFor="form-message">Meddelande <span className="form-optional">(valfritt)</span></label>
            <textarea
              {...register("message")}
              placeholder="Meddelande"
              id="form-message"
              className="form-field"
              cols={0}
            />
            {errors.message && (
              <div className="error-message">{errors.message.message}</div>
            )}
          </div>
        </form>
      </div>

      <div className="step-btn-container">
        <button className="btn-prev" onClick={onPrev}>
          Tillbaka
        </button>
        <button
          className="btn-next"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Laddar..." : "Boka"}
        </button>
      </div>
    </div>
  );
};

export default Step3CustomerInfo;
