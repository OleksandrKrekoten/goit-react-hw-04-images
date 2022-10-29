import axios from 'axios';
export const getPhoto = async (searchQuery, page) => {
  return await axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '29744257-c594c594fd182235a7d0b53c9',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page: page,
      },
    })
    .then(res => res.data);
};
