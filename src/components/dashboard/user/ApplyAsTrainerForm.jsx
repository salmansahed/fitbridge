"use client";

import { FloppyDisk } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import { toast } from "react-toastify";

const ApplyAsTrainerForm = ({ userId }) => {
  const categories = [
    { value: "yoga", label: "Yoga" },
    { value: "pilates", label: "Pilates" },
    { value: "stretching", label: "Stretching" },
    { value: "cardio", label: "Cardio" },
    { value: "dance", label: "Dance" },
    { value: "strength", label: "Strength Training" },
    { value: "fitness", label: "Fitness" },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/apply-as-trainer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, userId }),
      },
    );
    const result = await res.json();
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-4">
      <Form
        className=" w-full bg-white dark:bg-neutral-900 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] dark:border dark:border-neutral-800 p-8 rounded-3xl"
        onSubmit={onSubmit}
      >
        <Fieldset>
          <Fieldset.Legend className="text-3xl sm:text-4xl dark:text-white">
            Apply as Trainer
          </Fieldset.Legend>
          <Description className="text-base dark:text-neutral-400">
            Fill out the form to apply as a trainer.
          </Description>
          <FieldGroup>
            {/* Years Of Experience */}
            <TextField isRequired name="yearsOfExperience">
              <Label>Years of Experience</Label>
              <Input
                type="number"
                placeholder="e.g., 3"
                className="border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white shadow-sm"
              />
              <FieldError />
            </TextField>
            {/* Specialty */}
            <Select placeholder="Select one" name="specialty" isRequired>
              <Label>Specialty</Label>
              <Select.Trigger className="border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white shadow-sm">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {categories.map((category, index) => (
                    <ListBox.Item
                      key={index}
                      id={category.value}
                      textValue={category.label}
                    >
                      {category.label}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
            {/* Bio */}
            <TextField
              isRequired
              name="bio"
              validate={(value) => {
                if (value.length < 100) {
                  return "Bio must be at least 100 characters";
                }

                return null;
              }}
            >
              <Label>Bio</Label>
              <TextArea
                placeholder="Tell us about yourself..."
                className="min-h-40 border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white shadow-sm"
              />
              <Description>Minimum 100 characters</Description>
              <FieldError />
            </TextField>
          </FieldGroup>
          <Fieldset.Actions>
            <Button
              type="submit"
              className="rounded-md hover:rounded-3xl transition-all duration-300 bg-linear-to-r from-green-600 to-blue-600 text-white"
            >
              Submit Application
            </Button>
            <Button
              type="reset"
              variant="danger-soft"
              className="rounded-md hover:rounded-3xl transition-all duration-300"
            >
              Cancel
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
};

export default ApplyAsTrainerForm;
