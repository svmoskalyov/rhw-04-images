import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImage = async (q = '', page = 1) => {
  const response = await axios.get('', {
    params: {
      key: '31041219-f816f941255d17bdaf0e3f2df',
      image_type: 'photo',
      orientation: 'horizontal',
      q,
      page,
      per_page: 12,
    },
  });
  return response.data;
};
