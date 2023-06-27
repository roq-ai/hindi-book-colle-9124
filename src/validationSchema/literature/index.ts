import * as yup from 'yup';

export const literatureValidationSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  content: yup.string().required(),
  tags: yup.string(),
  categories: yup.string(),
  contributor_id: yup.string().nullable(),
});
