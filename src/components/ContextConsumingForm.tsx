import { DevTool } from "@hookform/devtools";
import React from "react";
import { useForm } from "react-hook-form";

const defaultValues: FormValues = {
  username: "test-username",
};

const ContextConsumingForm = (): React.JSX.Element => {
  const form = useForm<FormValues>({ defaultValues });
  const { register, formState, control } = form;
  const { errors } = formState;
  return (
    <form>
      <DevTool control={control} />
      <h1>Context consuming form</h1>
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
    </form>
  );
};

export default ContextConsumingForm;

export interface FormValues {
  username: string;
}

/** TODO
 * - [x] Introduce RHF
 * - [ ] Create context and provide it (App.tsx level)
 * - [ ] Consume context via hook and interact with form (This component)
 * - [ ] Add yup validation
 * - [ ] Add more fields (Similar to YouTubeForm.tsx)
 */
