import { useState, useCallback } from 'react';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
}

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
  });

  const handleChange = useCallback(
    (name: string, value: any) => {
      setFormState((prev) => {
        const path = String(name).split('.');
        if (path.length === 1) {
          return {
            ...prev,
            values: {
              ...prev.values,
              [name]: value,
            },
            touched: {
              ...prev.touched,
              [name]: true,
            },
          };
        }

        const [section, ...rest] = path;
        const sectionKey = section as keyof T;
        const sectionValue = prev.values[sectionKey] as Record<string, any>;
        let newValue = value;

        if (rest.length > 0) {
          let current = sectionValue;
          for (let i = 0; i < rest.length - 1; i++) {
            current = current[rest[i]];
          }
          current[rest[rest.length - 1]] = value;
          newValue = sectionValue;
        }

        return {
          ...prev,
          values: {
            ...prev.values,
            [sectionKey]: newValue,
          },
          touched: {
            ...prev.touched,
            [sectionKey]: true,
          },
        };
      });
    },
    []
  );

  const handleBlur = useCallback(
    (name: keyof T) => {
      setFormState((prev) => ({
        ...prev,
        touched: {
          ...prev.touched,
          [name]: true,
        },
      }));

      if (validate) {
        const errors = validate(formState.values);
        setFormState((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            [name]: errors[name],
          },
        }));
      }
    },
    [validate, formState.values]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (validate) {
        const errors = validate(formState.values);
        setFormState((prev) => ({
          ...prev,
          errors,
          touched: Object.keys(formState.values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
          ),
        }));

        if (Object.keys(errors).length > 0) {
          return;
        }
      }

      try {
        await onSubmit(formState.values);
      } catch (error) {
        // Handle submission error
        console.error('Form submission error:', error);
      }
    },
    [formState.values, validate, onSubmit]
  );

  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
    });
  }, [initialValues]);

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
} 