import PropTypes from 'prop-types';
import { DAYS } from '../constants/schedule';


export const DayShape = PropTypes.oneOf(Object.values(DAYS));
