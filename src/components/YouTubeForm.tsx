import React, { useEffect } from "react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};
let renderCount = 0;
export const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "test",
      email: "test@test.com",
      channel: "test",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset
  } = form;
  // getValues doesn't trigger re-renders or subscribe to input values when getting value data
  // setValue doesn't effect touched, dirty, validate state by default

  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;
  console.log("isSubmitting", isSubmitting)
  // console.log("isSubmitted", isSubmitted)
  // console.log("isSubmitSuccessful", isSubmitSuccessful)
  // console.log("submitCount", submitCount)
  // console.log("touchedFields", touchedFields);
  // console.log("dirtyFields", dirtyFields); // dirty shows when something has changed from its original state
  // console.log("isDirty", isDirty);
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("submitted", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("errors", errors);
  };

  const handleGetValues = () => {
    console.log("Get values", getValues());
  };

  const handleSetValue = () => {
    setValue("username", "foo", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])
  // const watchForm = watch(); adds a rerender

  renderCount++;
  return (
    <div>
      <h1>YouTube Form {renderCount / 2}</h1>
      {/* <h2>Watched value: {JSON.stringify(watchForm)}</h2> */}
      {/* <h2>Watched value: {JSON.stringify(getValues())}</h2> Interestingly this doesn't consistently trigger rerender */}
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@exmaple.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported."
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: { value: true, message: "CHannel is required" },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="twitter">twitter</label>
          <input
            type="text"
            id="channel"
            {...register("social.twitter", {
              disabled: watch("channel") === "",
              required: "Enter twitter profile", // no validation triggered when disabled
            })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="facebook">facebook</label>
          <input type="text" id="channel" {...register("social.facebook")} />
        </div>
        <div className="form-control">
          <label htmlFor="primary-phone">primary phone number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="secondary-phone">secondary phone number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="secondary-phone">List of phone numbers</label>
          <div>
            {fields.map((field, index) => (
              <div key={field.id} className="form-control">
                <input
                  type="text"
                  {...register(`phNumbers.${index}.number` as const)}
                />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="dob">dob</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: { value: true, message: "dob is required" },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>
        <button type="button" onClick={handleGetValues}>
          Get values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set value
        </button>
        { isDirty ? <button type="button" onClick={() => reset()}>
          Reset
        </button> : <></> }
        {isDirty && isValid && !isSubmitting ? <button disabled={isSubmitting}>Submit</button> : <></>}
      </form>
      <DevTool control={control} />
    </div>
  );
};
