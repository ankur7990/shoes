// components/profile/EditProfileForm.jsx

import React from "react";
import Input from "../ui/Input";
import Dropdown from "../ui/Dropdown";
import DateInput from "../ui/DateInput";
import Button from "../ui/Button";

const EditProfileForm = ({ register, handleSubmit, onSubmit, errors }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        name="name"
        placeholder="Full Name"
        register={register}
        rules={{
          required: "Name is required",
        }}
        error={errors.name}
      />

      <Input
        name="username"
        placeholder="Username"
        register={register}
        rules={{
          required: "Username required",
        }}
        error={errors.username}
      />

      <Input
        name="mobile"
        placeholder="Mobile Number"
        register={register}
        rules={{
          required: "Mobile required",
          pattern: {
            value: /^[6-9]\d{9}$/,
            message: "Invalid mobile number",
          },
        }}
        error={errors.mobile}
      />

      <Dropdown
        name="gender"
        register={register}
        options={[
          {
            label: "Male",
            value: "male",
          },
          {
            label: "Female",
            value: "female",
          },
          {
            label: "Other",
            value: "other",
          },
        ]}
        rules={{
          required: "Gender required",
        }}
        error={errors.gender}
      />

      <DateInput
        name="dob"
        register={register}
        rules={{
          required: "DOB required",
        }}
        error={errors.dob}
      />

      <Button type="submit" fullWidth>
        Update Profile
      </Button>
    </form>
  );
};

export default EditProfileForm;
