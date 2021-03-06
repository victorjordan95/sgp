import cep from 'cep-promise';
import { toast } from 'react-toastify';

import stateValues from './brStatesValues';

const fetchZipCode = async zipcode => {
  let zip = {};
  try {
    zip = await cep(zipcode);
    if (zip) {
      zip = {
        zip: zip.cep,
        city: zip.city,
        state: stateValues.filter(state => state.value === zip?.state),
        neighborhood: zip.neighborhood,
        street: zip.street,
      };
    }
  } catch (error) {
    toast.error(error);
    return false;
  }
  return zip;
};

export default fetchZipCode;
