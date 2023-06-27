import * as yup from 'yup';

export const contributorValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  publisher_id: yup.string().nullable(),
});
