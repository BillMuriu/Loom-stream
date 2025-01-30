"use client";

import FormGenerator from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";
import React, { useEffect } from "react";

type Props = {};

const WorkspaceForm = (props: Props) => {
  const { errors, isPending, onFormSubmit, register } = useCreateWorkspace();

  useEffect(() => {
    console.log("🔄 isPending state changed:", isPending);
  }, [isPending]);

  useEffect(() => {
    console.log("⚠️ Validation errors updated:", errors);
  }, [errors]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const submittedData = Object.fromEntries(formData);
        console.log("📝 Form submitted with data:", submittedData);
        onFormSubmit(e);
      }}
      className="flex flex-col gap-y-3"
    >
      <FormGenerator
        register={register}
        name="name"
        placeholder={"Workspace Name"}
        label="Name"
        errors={errors}
        inputType="input"
        type="text"
      />
      <Button
        className="text-sm w-full mt-2"
        type="submit"
        disabled={isPending}
      >
        <Loader state={isPending}>Create Workspace</Loader>
      </Button>
    </form>
  );
};

export default WorkspaceForm;
