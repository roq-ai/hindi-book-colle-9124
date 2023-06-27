import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createLiterature } from 'apiSdk/literature';
import { Error } from 'components/error';
import { literatureValidationSchema } from 'validationSchema/literature';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ContributorInterface } from 'interfaces/contributor';
import { getContributors } from 'apiSdk/contributors';
import { LiteratureInterface } from 'interfaces/literature';

function LiteratureCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: LiteratureInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createLiterature(values);
      resetForm();
      router.push('/literature');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<LiteratureInterface>({
    initialValues: {
      title: '',
      author: '',
      content: '',
      tags: '',
      categories: '',
      contributor_id: (router.query.contributor_id as string) ?? null,
    },
    validationSchema: literatureValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Literature
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="title" mb="4" isInvalid={!!formik.errors?.title}>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" value={formik.values?.title} onChange={formik.handleChange} />
            {formik.errors.title && <FormErrorMessage>{formik.errors?.title}</FormErrorMessage>}
          </FormControl>
          <FormControl id="author" mb="4" isInvalid={!!formik.errors?.author}>
            <FormLabel>Author</FormLabel>
            <Input type="text" name="author" value={formik.values?.author} onChange={formik.handleChange} />
            {formik.errors.author && <FormErrorMessage>{formik.errors?.author}</FormErrorMessage>}
          </FormControl>
          <FormControl id="content" mb="4" isInvalid={!!formik.errors?.content}>
            <FormLabel>Content</FormLabel>
            <Input type="text" name="content" value={formik.values?.content} onChange={formik.handleChange} />
            {formik.errors.content && <FormErrorMessage>{formik.errors?.content}</FormErrorMessage>}
          </FormControl>
          <FormControl id="tags" mb="4" isInvalid={!!formik.errors?.tags}>
            <FormLabel>Tags</FormLabel>
            <Input type="text" name="tags" value={formik.values?.tags} onChange={formik.handleChange} />
            {formik.errors.tags && <FormErrorMessage>{formik.errors?.tags}</FormErrorMessage>}
          </FormControl>
          <FormControl id="categories" mb="4" isInvalid={!!formik.errors?.categories}>
            <FormLabel>Categories</FormLabel>
            <Input type="text" name="categories" value={formik.values?.categories} onChange={formik.handleChange} />
            {formik.errors.categories && <FormErrorMessage>{formik.errors?.categories}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<ContributorInterface>
            formik={formik}
            name={'contributor_id'}
            label={'Select Contributor'}
            placeholder={'Select Contributor'}
            fetcher={getContributors}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'literature',
  operation: AccessOperationEnum.CREATE,
})(LiteratureCreatePage);
