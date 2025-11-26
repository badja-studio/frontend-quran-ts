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
import { useForm, Controller } from "react-hook-form";

interface FieldConfig {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: { label: string; value: any }[];
  component?: React.ReactElement;
}

interface Props {
  title: string;
  role: string;
  status: string;
  avatar?: string;
  fields: FieldConfig[];
  defaultValues: Record<string, any>;
  onSubmit: (values: any) => void;
}

const DynamicProfileForm: React.FC<Props> = ({
  title,
  role,
  status,
  avatar,
  fields,
  defaultValues,
  onSubmit,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const renderField = (field: FieldConfig, ctrl: any): React.ReactElement => {
    // custom component override
    if (field.component) return field.component as React.ReactElement;

    switch (field.type) {
      case "select":
        return (
          <TextField
            {...ctrl}
            label={field.label}
            select
            fullWidth
            required={field.required}
          >
            {field.options?.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
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
          />
        );

      default:
        // fallback ke textfield normal
        return (
          <TextField
            {...ctrl}
            label={field.label}
            type={field.type}
            fullWidth
            required={field.required}
          />
        );
    }
  };

  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Box textAlign="center" mb={3}>
        <Avatar src={avatar} sx={{ width: 100, height: 100, mx: "auto" }} />
        <Typography variant="h6" mt={1} fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ({role})
        </Typography>

        <Box
          mt={1.5}
          px={2}
          py={0.5}
          borderRadius={2}
          bgcolor="primary.main"
          color="white"
          fontSize={12}
          display="inline-block"
        >
          {status}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        {fields.map((field) => (
          <Grid item xs={12} md={6} key={field.name}>
            <Controller
              name={field.name}
              control={control}
              render={({ field: ctrl }) => renderField(field, ctrl)}
            />
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined">BATAL</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          SIMPAN
        </Button>
      </Box>
    </Card>
  );
};

export default DynamicProfileForm;
