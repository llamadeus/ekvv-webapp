import PropTypes from 'prop-types';
import { DAYS } from '../constants/schedule';


export const Day = PropTypes.oneOf(Object.values(DAYS));
