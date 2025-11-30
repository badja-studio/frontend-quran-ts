"use client";

import React from "react";
import {
  Card,
  Box,
  Typography,
  Avatar,
  Divider,
  Grid,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useForm, Controller, FieldValues, SubmitHandler } from "react-hook-form";

type FieldValue = string | number;

interface SelectOption {
  label: string;
  value: FieldValue;
}

interface FieldConfig {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: SelectOption[];
  component?: React.ReactElement;
}

interface DynamicProfileFormProps {
  title: string;
  role: string;
  status: string;
  avatar?: string;
  fields: FieldConfig[];
  defaultValues: FieldValues;
  onSubmit: SubmitHandler<FieldValues>;
  onCancel?: () => void;
}

const DynamicProfileForm: React.FC<DynamicProfileFormProps> = ({
  title,
  role,
  status,
  avatar,
  fields,
  defaultValues,
  onSubmit,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const handleCancel = () => {
    reset();
    if (onCancel) {
      onCancel();
    }
  };

  const baseStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      background: "#fafafa",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      background: "#fff",
    },
  };

  return (
    <Card
      sx={{
        p: 5,
        borderRadius: 4,
        width: "100%",
        boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
      }}
    >
      {/* HEADER USER */}
      <Box textAlign="center" mb={3}>
        <Avatar
          src={avatar}
          sx={{
            width: 110,
            height: 110,
            mx: "auto",
            mb: 1,
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            border: "3px solid white",
          }}
        />

        <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: -0.5 }}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {role}
        </Typography>

        <Box
          mt={1.7}
          px={2.2}
          py={0.7}
          borderRadius={2}
          bgcolor="success.main"
          color="white"
          fontSize={12}
          display="inline-block"
          fontWeight={600}
          sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
        >
          {status}
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* FORM FIELDS */}
      <Grid container spacing={3}>
        {fields.map((field) => (
          <Grid item xs={12} md={6} key={field.name}>
            <Controller
              name={field.name}
              control={control}
              rules={{ required: field.required }}
              render={({ field: ctrl }) => {
                if (field.component) return field.component;

                const hasError = !!errors[field.name];
                const errorMessage = errors[field.name]?.message as string | undefined;

                switch (field.type) {
                  case "select":
                    return (
                      <TextField
                        {...ctrl}
                        label={field.label}
                        select
                        fullWidth
                        required={field.required}
                        error={hasError}
                        helperText={errorMessage}
                        sx={baseStyle}
                      >
                        {field.options?.map((opt) => (
                          <MenuItem key={String(opt.value)} value={String(opt.value)}>
                            {opt.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    );

                  case "textarea":
                    return (
                      <TextField
                        {...ctrl}
                        label={field.label}
                        fullWidth
                        multiline
                        minRows={3}
                        required={field.required}
                        error={hasError}
                        helperText={errorMessage}
                        sx={baseStyle}
                      />
                    );

                  default:
                    return (
                      <TextField
                        {...ctrl}
                        label={field.label}
                        type={field.type}
                        fullWidth
                        required={field.required}
                        error={hasError}
                        helperText={errorMessage}
                        sx={baseStyle}
                      />
                    );
                }
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* BUTTON ACTION */}
      <Box
        mt={5}
        display="flex"
        justifyContent="flex-end"
        gap={2}
        sx={{ pt: 3 }}
      >
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Batal
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1,
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
          }}
        >
          Simpan
        </Button>
      </Box>
    </Card>
  );
};

export default DynamicProfileForm;
