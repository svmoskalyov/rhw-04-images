import { Formik, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  Header,
  Forma,
  Input,
  SearchButton,
  SearchLabel,
} from './Searchbar.styled';

const initialValues = {
  search: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = async (values, actions) => {
    if (values.search.trim() === '') {
      toast.warning('Please input name for search.');
      return;
    }

    await onSubmit(values.search.trim());
    actions.resetForm();
  };

  return (
    <Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Forma>
          <SearchButton type="submit">
            <SearchLabel />
          </SearchButton>

          <Input
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage name="search" />
        </Forma>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
