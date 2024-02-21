import React from "react";
import { useForm } from "react-hook-form";

const defaultValues: FormValues = {
  username: "test-username",
};

const ContextConsumingForm = (): React.JSX.Element => {
  const form = useForm<FormValues>({ defaultValues });
	const { register, formState } = form;
	const { errors } = formState;
  return (
    <form>
      <h1>Context consuming form</h1>
      <label htmlFor="username"></label>
      <div>
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
 * - [ ] Consume context and interact with form  (This component)
 * - [ ] Add yup validation 
 * - [ ] Add more fields (Similar to YouTubeForm.tsx)
 */
