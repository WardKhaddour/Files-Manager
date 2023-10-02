import { FormProvider, useForm } from 'react-hook-form';
import Select from 'components/Select';

import {
  useGetAllUniversitiesQuery,
  useLazyGetAllFacultiesQuery,
  useLazyGetFacultyInfoQuery,
} from './service/userStudyApi';

import {
  generateObjectsOptions,
  generateTextsOptions,
} from 'utils/generateOptions';
import generateYearsOptions from 'utils/generateYearsOptions';
import { forwardRef, useImperativeHandle } from 'react';
import { Button } from 'components/Button';

const UserStudyForm = forwardRef(
  ({ onSubmit, formClassName, submitBtnClassName, submitBtnText }, ref) => {
    const methods = useForm();
    const { data: universities, isLoading: universitiesIsLoading } =
      useGetAllUniversitiesQuery();

    const [getFaculties, faculties] = useLazyGetAllFacultiesQuery();

    const [getInfo, info] = useLazyGetFacultyInfoQuery();

    useImperativeHandle(ref, () => ({
      getData() {
        const values = Object.entries(methods.getValues()).reduce(
          (acc, [key, value]) => {
            acc[key] = value?.value;
            return acc;
          },
          {}
        );
        return values;
      },
    }));

    const onUniversityChange = () => {
      getFaculties(methods.getValues('university')?.value);
    };

    const onFacultyChange = () => {
      getInfo(methods.getValues('faculty')?.value);
    };

    return (
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={formClassName}
          noValidate
        >
          <Select
            id="university"
            label="University"
            required
            onChange={onUniversityChange}
            options={generateObjectsOptions(universities)}
            loading={universitiesIsLoading}
          />

          <Select
            id="faculty"
            label="Faculty"
            required
            options={generateObjectsOptions(faculties.data)}
            onChange={onFacultyChange}
            loading={faculties.isLoading}
          />

          <Select
            id="year"
            label="Year"
            required
            options={generateYearsOptions(info.data?.yearsNum)}
            loading={info.isLoading}
          />
          <Select
            id="section"
            label="Section"
            required
            options={generateTextsOptions(info.data?.sections)}
            loading={info.isLoading}
          />
          <Button
            className={submitBtnClassName}
            type="submit"
            text={submitBtnText}
          />
        </form>
      </FormProvider>
    );
  }
);

export default UserStudyForm;
